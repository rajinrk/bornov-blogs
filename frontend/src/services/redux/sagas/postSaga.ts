import { put, takeLatest } from "redux-saga/effects";
import {
  createPostRequest,
  createPostSuccess,
  createPostFailure,
  updatePostRequest,
  updatePostSuccess,
  updatePostFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
  getPostsRequest,
  getPostsSuccess,
  getPostsFailure
} from "../slices/postSlice";
import { createPostAPI, deletePostAPI, getPostsAPI, updatePostAPI } from "../../api";

function* createPost(action: any): Generator<any, void, any> {
  try {
    const response = yield createPostAPI(action.payload);
    
    if (response.data.status === 'success') {
      yield put(createPostSuccess(response.data));
    } else {
      yield put(createPostFailure(response.data));
    }
  } catch (error: any) {
    yield put(createPostFailure(error.response.data));
  }
}

function* updatePost(action: any): Generator<any, void, any> {
  try {
    const response = yield updatePostAPI(action.payload);

    
    
    if (response.data.status === 'success') {
      yield put(updatePostSuccess(response.data));
    } else {
      yield put(updatePostFailure(response.data));
    }
  } catch (error: any) {
    yield put(updatePostFailure(error.response.data));
  }
}

function* deletePost(action: any): Generator<any, void, any> {
  try {
    const response = yield deletePostAPI(action.payload);
    
    if (response.data.status === 'success') {
      yield put(deletePostSuccess(action.payload)); // Pass the post ID for filtering
    } else {
      yield put(deletePostFailure(response.data));
    }
  } catch (error: any) {
    yield put(deletePostFailure(error.response.data));
  }
}

function* getPosts(): Generator<any, void, any> {
  try {
    const response = yield getPostsAPI();
    
    if (response.data.status === 'success') {
      yield put(getPostsSuccess(response.data));
    } else {
      yield put(getPostsFailure(response.data));
    }
  } catch (error: any) {
    yield put(getPostsFailure(error.response.data));
  }
}

export default function* postSaga() {
  yield takeLatest(createPostRequest.type, createPost);
  yield takeLatest(updatePostRequest.type, updatePost);
  yield takeLatest(deletePostRequest.type, deletePost);
  yield takeLatest(getPostsRequest.type, getPosts);
} 