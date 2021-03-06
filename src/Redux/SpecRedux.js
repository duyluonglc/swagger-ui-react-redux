import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import { sampleFromSchema, sampleXmlFromSchema } from '../Utils/fn'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getSpec: ['url'],
  getSpecSuccess: ['specData'],
  getSpecFailure: ['message']
})

export const SpecTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  url: null,
  info: null,
  host: null,
  basePath: null,
  tags: null,
  schemas: null,
  paths: null,
  securityDefinitions: null,
  definitions: null,
  externalDocs: null,
  fetching: null,
  isSuccess: null
})

export const getSpec = (state, { url }) => state.merge(INITIAL_STATE).merge({ fetching: true, url })
export const getSpecSuccess = (state, { specData }) => {
  const tags = specData.tags
  const pattern = /^#\/definitions\/([\w]+)$/
  _.forEach(specData.paths, (methods, path) => {
    _.forEach(methods, (operation, method) => {
      operation.path = path
      operation.method = method
      _.forEach(operation.parameters, (param, index) => {
        if (param.in === 'body') {
          if (param.schema && param.schema.$ref) {
            const match = param.schema.$ref.match(pattern)
            const model = match ? match[1] : null
            const schema = specData.definitions[model]
            param.schema = schema
            param.sampleJSON = sampleFromSchema(schema)
            param.sampleXML = sampleXmlFromSchema(schema)
            operation.parameters[index] = param
          }
        }
      })
      const tag = _.find(tags, tag => operation.tags.includes(tag.name))
      if (tag) {
        tag.operations = (tag.operations || [])
        tag.operations.push(operation)
      }
    })
  })

  return state.merge({ fetching: false, isSuccess: true }).merge(specData).merge({tags})
}
export const getSpecFailure = (state, { message }) => state.merge({ fetching: false, specData: null, message, isSuccess: false })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SPEC]: getSpec,
  [Types.GET_SPEC_SUCCESS]: getSpecSuccess,
  [Types.GET_SPEC_FAILURE]: getSpecFailure
})
