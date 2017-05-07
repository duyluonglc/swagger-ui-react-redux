import React, { Component, PropTypes } from 'react'

export default class Clear extends Component {
  onClick () {
    let { specActions, path, method } = this.props
    specActions.clearResponse(path, method)
    specActions.clearRequest(path, method)
  }

  render () {
    return (
      <button className='btn btn-clear opblock-control__btn' onClick={this.onClick}>
        Clear
      </button>
    )
  }
}

Clear.propTypes = {
  specActions: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired
}