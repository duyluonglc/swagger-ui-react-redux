import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SpecActions from '../Redux/SpecRedux'
import Logo from '../assets/logo_small.png'

class Topbar extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      url: props.url || ''
    }

    this.onUrlChange = this.onUrlChange.bind(this)
    this.downloadUrl = this.downloadUrl.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ url: nextProps.url })
  }


  onUrlChange (event) {
    this.setState({url: event.target.value})
  }

  downloadUrl () {
    this.props.getSpec(this.state.url)
  }

  render () {
    return (
      <div className='topbar'>
        <div className='wrapper'>
          <div className='topbar-wrapper'>
            <a href='#' title='Swagger UX'>
              <img height='30' width='30' src={Logo} alt='Swagger UX' />
              <span>swagger</span>
            </a>
            <div className='download-url-wrapper'>
              <input className='download-url-input' type='text' onChange={this.onUrlChange} value={this.state.url} disabled={this.props.isLoading} />
              <button className='download-url-button' onClick={this.downloadUrl}>Explore</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Topbar.defaultProps = {

}

Topbar.propTypes = {

}

function mapStateToProps (state, ownProps) {
  return {
    url: state.spec.url,
    isLoading: state.spec.fetching
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getSpec: bindActionCreators(SpecActions.getSpec, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
