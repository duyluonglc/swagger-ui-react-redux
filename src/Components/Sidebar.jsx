import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import * as actions from 'pathToActions';
import { Collapse } from 'react-collapse'
import Scroll from 'react-scroll'

const Link = Scroll.Link
const scroll = Scroll.scroller

class Sidebar extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      openTags: []
    }
  }

  toggleCollapse (tagName) {
    const openTags = this.state.openTags
    openTags[tagName] = !openTags[tagName]
    this.setState({
      openTags: openTags
    })
  }

  onSetActive (hash) {
    if (hash && window.location.hash !== '#' + hash) {
      window.location.hash = hash
    }
  }

  render () {
    return (
      <div className='row sidebar'>
        <h5>Security</h5>
        <h5>API Reference</h5>
        <ul>
          {this.props.tags.map(tag => {
            const { operations } = tag
            return (
              <li key={'sibar-tag-' + tag.name}>
                <a href={'#' + tag.name} className='tag-name' onClick={() => this.toggleCollapse(tag.name)}>{tag.name}</a>
                <Collapse isOpened={!!this.state.openTags[tag.name]}>
                  <ul className='sidebar-tag'>
                    {operations.map(operation => {
                      const key = `${tag.name}_${operation.method}_${operation.path.replace(/[/\-{}]/g, '_')}`
                      return (
                        <li key={'sibar-item' + key}><Link href={'#' + key} onSetActive={() => this.onSetActive(key)} to={key} spy smooth duration={500} >{operation.summary}</Link></li>
                      )
                    })}
                  </ul>
                </Collapse>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

Sidebar.defaultProps = {

}

Sidebar.propTypes = {

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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
