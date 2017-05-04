import { put, select, call } from 'redux-saga/effects'
import SpecActions from '../Redux/SpecRedux'
import AppConfig from '../Config/AppConfig'
// process STARTUP actions
export function * startup (action) {
  yield put({type: 'GET_SPEC', url: AppConfig.specUrl})
  // yield call(SpecActions.getSpec, 'http://petstore.swagger.io/v2/swagger.json')
}
