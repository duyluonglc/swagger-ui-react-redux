import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Actions from '../Redux/SpecRedux'

class RootComponent extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
    }
  }

  render () {
    return (
      <div>
        {JSON.stringify(this.props.specData, 2)}
      </div>
    )
  }
}

RootComponent.defaultProps = {

}

RootComponent.propTypes = {

}

function mapStateToProps (state, ownProps) {
  return {
    fetching: state.spec.fetching,
    isSuccess: state.spec.isSuccess,
    message: state.spec.message,
    specData: state.spec.specData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getSpec: bindActionCreators(Actions.getSpec, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent)
