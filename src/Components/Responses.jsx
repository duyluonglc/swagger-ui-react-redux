import React, { PropTypes } from 'react'
import { fromJS } from 'immutable'
import { defaultStatusCode } from '../Utils/utils'
import Response from './Response'
import ContentType from './ContentType'
import _ from 'lodash'

export default class Responses extends React.Component {
  onChangeProducesWrapper (val) {
    this.props.specActions.changeProducesValue(this.props.pathMethod, val)
  }

  render () {
    let { responses } = this.props
    let defaultCode = defaultStatusCode(responses)
    // let produces = this.props.produces && this.props.produces.size ? this.props.produces : Responses.defaultProps.produces
    return (
      <div className='responses-wrapper row'>
        <div className='opblock-section-header'>
          <h4>Responses</h4>
          <label>
            <span>Response content type</span>
            {/* <ContentType
              onChange={this.onChangeProducesWrapper}
              className='execute-content-type' /> */}
          </label>
        </div>
        <div className='responses-inner'>

          <table className='responses-table'>
            <tbody>
              {
                _(responses).map((response, code) => {
                  return (
                    <Response key={code}
                      isDefault={defaultCode === code}
                      code={code}
                      response={response}
                    />
                  )
                }).value()
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

Responses.defaultProps = {
  request: null,
  tryItOutResponse: null,
  produces: fromJS(['application/json'])
}
