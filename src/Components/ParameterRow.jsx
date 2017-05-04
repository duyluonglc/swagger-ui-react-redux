import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import win from 'core/window'
import Markdown from 'react-remarkable'
import hljs from 'highlight.js'
// import * as actions from 'pathToActions';
class ParameterRow extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  highlight (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (err) { }
    }

    try {
      return hljs.highlightAuto(str).value
    } catch (err) { }

    return '' // use external default escaping
  }

  render () {
    const { parameter } = this.props
    const { required, name, type, itemType, bodyParam, description } = parameter
    const isFormData = parameter.in === 'formData'
    const isFormDataSupported = true // 'FormData' in win
    const isExecute = false
    return (
      <tr>
        <td className='col parameters-col_name'>
          <div className={required ? 'parameter__name required' : 'parameter__name'}>
            {name}
            {!required ? null : <span style={{ color: 'red' }}>&nbsp;*</span>}
          </div>
          <div className='parаmeter__type'>{type} {itemType && `[${itemType}]`}</div>
          <div className='parameter__in'>({parameter.in})</div>
        </td>

        <td className='col parameters-col_description'>

          {bodyParam || !isExecute ? null
            : <JsonSchemaForm fn={fn}
              value={value}
              required={required}
              description={param.get('description') ? `${param.get('name')} - ${param.get('description')}` : `${param.get('name')}`}
              onChange={this.onChangeWrapper}
              schema={param} />
          }

          {
            bodyParam && schema ? <ModelExample getComponent={getComponent}
              isExecute={isExecute}
              specSelectors={specSelectors}
              schema={schema}
              example={bodyParam} />
              : null
          }

          <Markdown options={{ html: false, typographer: false, linkify: false, linkTarget: '_blank', highlight: this.highlight}}
            source={description} />
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
