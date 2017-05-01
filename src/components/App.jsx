import React from 'react'
import { Provider } from 'react-redux'
import createStore from '../Redux'
import RootComponent from './RootComponent'
import applyConfigSettings from '../Config'
// Apply config overrides
applyConfigSettings()
// create our store
const store = createStore()
import './App.scss'

const App = () => (
  <Provider store={store}>
    <div className='site-wrapper'>
      <RootComponent />
    </div>
  </Provider>
)

export default App
