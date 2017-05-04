import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import * as actions from 'pathToActions';
import Parameters from './Parameters'
import Markdown from 'react-markdown'
import Scroll from 'react-scroll'

const Element = Scroll.Element
class Operation extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render () {
    const { operation, tag, responses, schemes } = this.props
    const { method, deprecated, path, summary, description, externalDocs, parameters } = operation
    const key = `${tag.name}_${operation.method}_${operation.path.replace(/[/\-{}]/g, '_')}`
    return (
      <Element name={key} className={deprecated ? 'opblock opblock-deprecated' : `opblock opblock-${method} is-open`} >
        <div>
          <div className='row row-eq-height'>
            <div className='col-md-7'>
              <div className={`opblock-summary opblock-summary-${method}`}>
                <h2 className='opblock-summary-description'>
                  {summary}
                </h2>
                <span className='opblock-summary-method-path'>
                  <span className='opblock-summary-method'>{method.toUpperCase()}</span>
                  <span className={deprecated ? 'opblock-summary-path__deprecated' : 'opblock-summary-path'} >
                    <span>{path}</span>
                    {/* <JumpToPath path={jumpToKey} /> */}
                  </span>
                </span>
              </div>

              <div className='opblock-body'>
                {deprecated && <h4 className='opblock-title_normal'> Warning: Deprecated</h4>}
                {description &&
                  <div className='opblock-description-wrapper'>
                    <div className='opblock-description'>
                      <Markdown source={description || ''} />
                    </div>
                  </div>
                }
                {
                  externalDocs && externalDocs.get('url')
                    ? <div className='opblock-external-docs-wrapper'>
                      <h4 className='opblock-title_normal'>Find more details</h4>
                      <div className='opblock-external-docs'>
                        <span className='opblock-external-docs__description'>{externalDocs.get('description')}</span>
                        <a className='opblock-external-docs__link' href={externalDocs.get('url')}>{externalDocs.get('url')}</a>
                      </div>
                    </div> : null
                }
                <Parameters
                  parameters={parameters}
                  pathMethod={[path, method]}
                />

                {schemes && schemes.size ? <div className='opblock-schemes'>
                  <Schemes schemes={schemes}
                    path={path}
                    method={method}
                    specActions={specActions} />
                </div> : null}
                {/*

                <div className={(!tryItOutEnabled || !response || !allowTryItOut) ? 'execute-wrapper' : 'btn-group'}>
                  {!tryItOutEnabled || !allowTryItOut ? null

                    : <Execute
                      getComponent={getComponent}
                      operation={operation}
                      specActions={specActions}
                      specSelectors={specSelectors}
                      path={path}
                      method={method}
                      onExecute={this.onExecute} />
                  }

                  {(!tryItOutEnabled || !response || !allowTryItOut) ? null
                    : <Clear
                      onClick={this.onClearClick}
                      specActions={specActions}
                      path={path}
                      method={method} />
                  }
                </div>

                {this.state.executeInProgress ? <div className='loading-container'><div className='loading' /></div> : null}

                {
                  !response ? null
                    : <div className='opblock-operation-response'>
                      <LiveResponse request={request}
                        response={response}
                        getComponent={getComponent} />
                    </div>
                }

                */}
              </div>

            </div>
            <div className='res-col col-md-5'>
              {!responses ? null
                : <Responses
                  responses={responses}
                  request={request}
                  tryItOutResponse={response}
                  getComponent={getComponent}
                  specSelectors={specSelectors}
                  specActions={specActions}
                  produces={produces}
                  producesValue={operation.get('produces_value')}
                  pathMethod={[path, method]}
                  fn={fn} />
              }
            </div>

          </div>
        </div>
      </Element>
    )
  }
}

Operation.defaultProps = {

}

Operation.propTypes = {

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

export default connect(mapStateToProps, mapDispatchToProps)(Operation)
