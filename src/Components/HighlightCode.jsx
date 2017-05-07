import React, { Component } from 'react'
// import { highlight } from "core/utils"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { github } from 'react-syntax-highlighter/dist/styles'

export default class HighlightCode extends Component {
  render () {
    let { source } = this.props
    return <SyntaxHighlighter
      showLineNumbers={false}
      className='response-col_description'
      style={github}>
      {source || ''}
    </SyntaxHighlighter>
  }
}
