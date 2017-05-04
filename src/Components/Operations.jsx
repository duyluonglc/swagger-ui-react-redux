import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import * as actions from 'pathToActions';
import Operation from './Operation'
class Operations extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render () {
    const { tags } = this.props
    return (
      <div className='row'>
        {tags.map(tag => {
          const { description, operations } = tag
          return (
            <div className='opblock-tag-section is-open' key={'operation-' + tag.name}>
              <h4 className={!description ? 'opblock-tag no-desc' : 'opblock-tag'}>
                <span>{tag.name}</span>
                { !description ? null : <small>{description}</small> }
              </h4>

              <div>
                {operations.map(op => {
                  const key = `${tag.name}_${op.method}_${op.path.replace(/[/\-{}]/g, '_')}`
                  return <Operation key={key} operation={op} tag={tag} />
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

Operations.defaultProps = {

}

Operations.propTypes = {

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

export default connect(mapStateToProps, mapDispatchToProps)(Operations)
