

import { put, takeLatest } from "redux-saga/effects";
import { loginFailure, loginRequest, loginSuccess } from "../slices";
import { loginAPI } from "../../api";

function* login(action: any): Generator<any, void, any> {
  try {
    const response = yield loginAPI(action.payload );
    if (response.data.status === 'success') {
      yield put(loginSuccess(response.data));
    } else {
      yield put(loginFailure(response.data));
    }
  } catch (error: any) {
    yield put(loginFailure(error.response.data));
  }
}

export default function* authSagaSaga() {
  yield takeLatest(loginRequest.type, login);
}
