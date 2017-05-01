import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getSpec: ['specUrl'],
  getSpecSuccess: ['specData'],
  getSpecFailure: ['message']
})

export const SpecTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  specData: null,
  message: null,
  fetching: null,
  isSuccess: null
})

export const getSpec = state => state.merge({ fetching: true, specData: null })
export const getSpecSuccess = (state, { specData }) => state.merge({ fetching: false, specData, isSuccess: true })
export const getSpecFailure = (state, { message }) => state.merge({ fetching: false, specData: null, message, isSuccess: false })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SPEC]: getSpec,
  [Types.GET_SPEC_SUCCESS]: getSpecSuccess,
  [Types.GET_SPEC_FAILURE]: getSpecFailure
})
