import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import OperationActions from '../Redux/OperationRedux'

class ContentType extends Component {
  render () {
    let { operation } = this.props
    if (!operation.consumes || !operation.consumes.length) { return null }
    return (
      <div className='content-type-wrapper'>
        <select className='content-type' value={operation.contentType} onChange={this.onChangeWrapper} >
          {operation.consumes.map((val) => {
            return <option key={val} value={val}>{val}</option>
          })}
        </select>
      </div>
    )
  }
}

ContentType.propTypes = {

}

function mapStateToProps (state, ownProps) {
  return {
    tags: state.spec.tags
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // setContentType: bindActionCreators(OperationActions.setContentType, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentType)
