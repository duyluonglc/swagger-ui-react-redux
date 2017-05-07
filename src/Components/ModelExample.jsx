import React from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import * as actions from 'pathToActions';
import Model from './Model'

class ModelExample extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      activeTab: 'example'
    }

    this.activeTab = this.activeTab.bind(this)
  }

  activeTab (e) {
    let { target: { dataset: { name } } } = e

    this.setState({
      activeTab: name
    })
  }

  render () {
    let { schema, example } = this.props

    return <div>
      <ul className='tab'>
        <li className={'tabitem' + (this.state.activeTab === 'example' ? ' active' : '')}>
          <a className='tablinks' data-name='example' onClick={this.activeTab}>Example Value</a>
        </li>
        <li className={'tabitem' + (this.state.activeTab === 'model' ? ' active' : '')}>
          <a className={'tablinks'} data-name='model' onClick={this.activeTab}>Model</a>
        </li>
      </ul>
      <div>
        {
          (this.state.activeTab === 'example') && example
        }
        {
          this.state.activeTab === 'model' && <Model schema={schema} expandDepth={1} />
        }
      </div>
    </div>
  }
}

ModelExample.defaultProps = {

}

ModelExample.propTypes = {

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

export default connect(mapStateToProps, mapDispatchToProps)(ModelExample)
