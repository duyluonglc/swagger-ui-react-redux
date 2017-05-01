import { takeLatest } from 'redux-saga'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { SpecTypes } from '../Redux/SpecRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getSpec } from './SpecSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */
export default function * root () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(SpecTypes.GET_SPEC, getSpec, api)

    // auth
    // takeLatest(AuthTypes.GET_LOGIN, login, api),

  ]
}
