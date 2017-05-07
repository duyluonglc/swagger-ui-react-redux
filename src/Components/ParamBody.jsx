import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import win from 'core/window'
import ContentType from './ContentType'
import HighlightCode from './HighlightCode'
import AceEditor from 'react-ace'

import 'brace/mode/json'
import 'brace/mode/xml'
import 'brace/theme/github'
// import * as actions from 'pathToActions';
class ParamBody extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      isEditBox: false,
      value: ''
    }

    this.toggleIsEditBox = this.toggleIsEditBox.bind(this)
  }

  toggleIsEditBox () {
    this.setState({isEditBox: true})
  }

  render () {
    const { parameter, operation } = this.props
    const isXml = parameter.contentType === 'application/xml'
    let { value, isEditBox } = this.state
    let mode = isXml ? 'xml' : 'json'
    const sample = isXml ? parameter.sampleXML : JSON.stringify(parameter.sampleJSON, null, 2)
    let options = {
      autoScrollEditorIntoView: true,
      highlightGutterLine: true,
      lineHeight: 2
    }
    let styles = {
      lineHeight: 1.5
    }
    return (
      <div className='body-param'>
        {isEditBox
          ? <AceEditor
            value={value || sample}
            onChange={this.handleOnChange}
            onBlur={this.onEditorBlur}
            mode={mode}
            theme='github'
            width='auto'
            height={this.editorPlace ? this.editorPlace.clientHeight + 'px' : '200px'}
            fontSize={14}
            useSoftTabs
            tabSize={2}
            lineHeight={2}
            style={styles}
            editorProps={options} />
          : (sample &&
            <div ref={editorPlace => { this.editorPlace = editorPlace }}
              className='editor-place'
              onClick={this.toggleIsEditBox}
            >
              <HighlightCode source={sample} className='body-param__example' />
            </div>)
        }
        <div className='body-param-options'>

          <label htmlFor=''>
            <span>Parameter content type</span>
            <ContentType parameter={parameter} operation={operation} className='body-param-content-type' />
          </label>
        </div>

      </div>
    )
  }
}

ParamBody.defaultProps = {

}

ParamBody.propTypes = {

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

export default connect(mapStateToProps, mapDispatchToProps)(ParamBody)
