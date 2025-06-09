import { all } from 'redux-saga/effects';

import authSaga from './authSaga';

const root = function* root() {
  yield all([ authSaga()]);
};

export default root;
