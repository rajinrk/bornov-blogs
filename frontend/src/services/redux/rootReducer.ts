import { combineReducers } from 'redux';
import { createAction } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';

export const logout = createAction('USER_LOGOUT');

const appReducer = combineReducers({
  auth: authSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action as never);
  }
  return appReducer(state, action as never);
};

export default rootReducer;
