import { select, put, call } from 'redux-saga/effects'
import SpecActions from '../Redux/SpecRedux'

// attempts to getSpec
export function * getSpec (api, { url }) {
  // const {token} = yield select(state => state.auth.user)
  // api.setToken(token)
  const response = yield call(api.getSpec, url)

  // success?
  if (response.ok) {
    // dispatch successful getSpec
    yield put(SpecActions.getSpecSuccess(response.data))
  } else {
    // dispatch failure
    yield put(SpecActions.getSpecFailure('error!!!'))
  }
}
