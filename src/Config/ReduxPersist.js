import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'
import localForage from 'localforage'

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1',
  storeConfig: {
    storage: localForage,
    blacklist: [''], // reducer keys that you do NOT want stored to persistence here
    whitelist: ['auth'], // OR put reducer keys that you DO want stored to persistence here (overrides blacklist)
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
