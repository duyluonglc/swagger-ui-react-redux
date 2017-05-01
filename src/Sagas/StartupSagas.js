import { put, select, call } from 'redux-saga/effects'
import SpecActions from '../Redux/SpecRedux'
// process STARTUP actions
export function * startup (action) {
  yield put({type: 'GET_SPEC', specUrl: 'http://petstore.swagger.io/v2/swagger.json'})
  // yield call(SpecActions.getSpec, 'http://petstore.swagger.io/v2/swagger.json')
}
