import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Actions from '../Redux/SpecRedux'
import { StickyContainer, Sticky } from 'react-sticky'
import Topbar from './Topbar'
import Errors from './Errors'
import Info from './Info'
import Sidebar from './Sidebar'
import Operations from './Operations'
// import '../Styles/core.min.css'
import '../Styles/main.scss'

class RootComponent extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
    }
  }

  render () {
    const { isLoading, fetching, isSuccess, info } = this.props
    return (
      <StickyContainer className='swagger-ui'>
        <Topbar />
        {
          !isLoading && (
            <div>
              {fetching && <div className='loading-container'><div className='loading' /></div>}
              {!isLoading && !fetching && !isSuccess &&
                <div className='info'>
                  <h4 className='title'>Failed to load spec.</h4>
                </div>
              }
              {!fetching && isSuccess &&
                <div>
                  <Errors />
                  <div className='information-container'>
                    <div className='col-sm-12'>
                      {info && <Info info={info} />}
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-sm-12 col-md-3' >
                      <Sidebar />
                    </div>
                    <div className='col-sm-12 col-md-3' >
                      <Operations />
                    </div>
                  </div>
                </div>
              }
            </div>
          )
        }

      </StickyContainer>
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
    specData: state.spec.specData,
    isLoading: state.startup.isLoading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getSpec: bindActionCreators(Actions.getSpec, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent)
