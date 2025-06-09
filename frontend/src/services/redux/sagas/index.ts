import { all } from 'redux-saga/effects';

import authSaga from './authSaga';
import postSaga from './postSaga';

const root = function* root() {
  yield all([
    authSaga(),
    postSaga()
  ]);
};

export default root;
