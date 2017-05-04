import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import win from 'core/window'
import Markdown from 'react-markdown'
import AceEditor from 'react-ace'

import 'brace/mode/json'
import 'brace/mode/xml'
import 'brace/theme/github'
// import * as actions from 'pathToActions';
class ParamBody extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      isEditBox: false
    }
  }

  render () {
    const { isExecute, isXml } = this.props
    let { value, isEditBox } = this.state
    let mode = isXml ? 'xml' : 'json'
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
        {
          isEditBox
            ? <AceEditor
              value={value}
              onChange={this.handleOnChange}
              mode={mode}
              theme='github'
              width='auto'
              height={this.editorPlace ? this.editorPlace.clientHeight : 200}
              fontSize={14}
              useSoftTabs
              tabSize={2}
              lineHeight={2}
              style={styles}
              editorProps={options} />
            : (value &&
              <div ref={editorPlace => { this.editorPlace = editorPlace }} className='editor-place' onClick={this.toggleIsEditBox}>
                <Markdown source={value} />
              </div>)
        }
        <div className='body-param-options'>

          <label htmlFor=''>
            <span>Parameter content type</span>
            <ContentType value={consumesValue} contentTypes={consumes} onChange={onChangeConsumes} className='body-param-content-type' />
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
