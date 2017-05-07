import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import win from 'core/window'
import Markdown from 'react-markdown'
import { fromJS } from 'immutable'
import ParamBody from './ParamBody'
import ModelExample from './ModelExample'
// import * as actions from 'pathToActions';
class ParameterRow extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render () {
    const { parameter, operation } = this.props
    const { required, name, type, itemType, description, schema } = parameter
    const inType = parameter.in
    const isFormData = parameter.in === 'formData'
    const isFormDataSupported = true // 'FormData' in win
    const isExecute = false
    const bodyParam = inType !== 'body' ? null
      : <ParamBody parameter={parameter} operation={operation} />
    return (
      <tr>
        <td className='col parameters-col_name'>
          <div className={required ? 'parameter__name required' : 'parameter__name'}>
            {name}
            {!required ? null : <span style={{ color: 'red' }}>&nbsp;*</span>}
          </div>
          <div className='parаmeter__type'>{type} {itemType && `[${itemType}]`}</div>
          <div className='parameter__in'>({inType})</div>
        </td>

        <td className='col parameters-col_description'>
          {bodyParam && schema
            ? <ModelExample
              isExecute={isExecute}
              schema={fromJS(schema)}
              example={bodyParam} />
            : null
          }

          <Markdown source={description || ''} />
          {(isFormData && !isFormDataSupported) && <div>Error: your browser does not support FormData</div>}

        </td>

      </tr>
    )
  }
}

ParameterRow.defaultProps = {

}

ParameterRow.propTypes = {

}

function mapStateToProps (state, ownProps) {
  return {
    tags: state.spec.tags
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParameterRow)
