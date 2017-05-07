import React, { PropTypes } from 'react'
import { fromJS } from 'immutable'
import { getSampleSchema } from '../Utils/utils'
import { inferSchema } from '../Utils/fn'
import Markdown from 'react-markdown'
import ModelExample from './ModelExample'

const getExampleComponent = (sampleResponse, examples, HighlightCode) => {
  if (examples && examples.size) {
    return examples.entrySeq().map(([key, example]) => {
      let exampleValue
      try {
        exampleValue = example && example.toJS ? example.toJS() : example
        exampleValue = JSON.stringify(exampleValue)
      } catch (e) {
        exampleValue = String(example)
      }
      return (<div key={key}>
        <h5>{key}</h5>
        <HighlightCode className='example' value={exampleValue} />
      </div>)
    }).toArray()
  }

  if (sampleResponse) {
    return <div>
      <HighlightCode className='example' value={sampleResponse} />
    </div>
  }
  return null
}

export default class Response extends React.Component {
  render () {
    let {
      code,
      response
    } = this.props

    let schema = inferSchema(response)
    let example = getSampleSchema(schema)
    let headers = ''
    return (
      <tr className='response'>
        <td className='col response-col_status'>
          <div><span>{code}</span></div>
        </td>
        <td className='col response-col_description'>

          <div className='response-col_description__inner'>
            <Markdown options={{ html: true, typographer: true, linkify: true, linkTarget: '_blank' }} source={response.description} />
          </div>

          {example ? (
            <ModelExample
              schema={fromJS(schema)}
              example={example} />
          ) : null}

          {headers ? (
            <Headers headers={headers} />
          ) : null}

        </td>

      </tr>
    )
  }
}

Response.defaultProps = {
  response: fromJS({})
}
