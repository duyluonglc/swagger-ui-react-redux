import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import * as actions from 'pathToActions';
import ParameterRow from './ParameterRow'
class Parameters extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render () {
    const { parameters } = this.props
    return (
      <div className='opblock-section'>
        <div className='opblock-section-header'>
          <h4 className='opblock-title'>Parameters</h4>
        </div>
        {!parameters.length
          ? <div className='opblock-description-wrapper'><p>No parameters</p></div>
          : <div className='table-container'>
            <table className='parameters'>
              <tbody>
                {parameters.map(parameter => (
                  <ParameterRow key={parameter.name} parameter={parameter} />
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    )
  }
}

Parameters.defaultProps = {

}

Parameters.propTypes = {

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

export default connect(mapStateToProps, mapDispatchToProps)(Parameters)
