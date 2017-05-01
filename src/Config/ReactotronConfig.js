import { SpecTypes } from '../Redux/SpecRedux'
import Immutable from 'seamless-immutable'
import Reactotron from 'reactotron-react-js'
const apisaucePlugin = require('reactotron-apisauce')
const { reactotronRedux } = require('reactotron-redux')
const sagaPlugin = require('reactotron-redux-saga')
import DebugConfig from './DebugConfig'
if (DebugConfig.useReactotron) {
  Reactotron
    .configure({
      // host: '10.0.3.2' // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
      name: 'React app' // would you like to see your app's name?
    })

    // register apisauce so we can install a monitor later
    .use(apisaucePlugin())

    // setup the redux integration with Reactotron
    .use(reactotronRedux({
      // you can flag some of your actions as important by returning true here
      isActionImportant: action => action.type === SpecTypes.STARTUP,

      // you can flag to exclude certain types too... especially the chatty ones
      // except: ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE'],

      // Fires when Reactotron uploads a new copy of the state tree.  Since our reducers are
      // immutable with `immutable`, we ensure we convert to that format.
      onRestore: state => Immutable(state)
    }))

    // register the redux-saga plugin so we can use the monitor in CreateStore.js
    .use(sagaPlugin())

    // let's connect!
    .connect()

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear()

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron
} else {
  // a mock version should you decide to leave console.tron in your codebase
  console.tron = {
    log: () => false,
    warn: () => false,
    error: () => false,
    display: () => false,
    image: () => false
  }
}
