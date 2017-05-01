import { select, put, call } from 'redux-saga/effects'
import SpecActions from '../Redux/SpecRedux'

// attempts to getSpec
export function * getSpec (api, {specUrl}) {
  // const {token} = yield select(state => state.auth.user)
  // api.setToken(token)
  const response = yield call(api.getSpec, specUrl)

  // success?
  if (response.ok) {
    // dispatch successful getSpec
    yield put(SpecActions.getSpecSuccess(response.data))
  } else {
    // dispatch failure
    yield put(SpecActions.getSpecFailure('error!!!'))
  }
}
