import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import * as actions from 'pathToActions';

class Info extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render () {
    return (
      <div className='Info'>Info</div>
    )
  }
}

Info.defaultProps = {

}

Info.propTypes = {

}

function mapStateToProps (state, ownProps) {
  return {

  }
}

function mapDispatchToProps (dispatch) {
  return {
    // actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
