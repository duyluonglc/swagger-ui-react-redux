import React, { PropTypes } from 'react'

export default class Schemes extends React.Component {
  componentWillMount () {
    let { schemes } = this.props

    // fire 'change' event to set default 'value' of select
    // this.setScheme(_.first(schemes))
  }

  onChange (e) {
    this.setScheme(e.target.value)
  }

  setScheme (value) {
    let { path, method, specActions } = this.props

    specActions.setScheme(value, path, method)
  }

  render () {
    let { schemes } = this.props

    return (
      <label htmlFor='schemes'>
        <span className='schemes-title'>Schemes</span>
        <select onChange={this.onChange}>
          {schemes.map(
            (scheme) => <option value={scheme} key={scheme}>{scheme}</option>
          )}
        </select>
      </label>
    )
  }
}
