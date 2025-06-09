import type { RootState } from '../store';

export const getStatus = (state: RootState) => state?.dashboard?.isLoading;
export const getAuthSuccessCode = (state: RootState) => state?.dashboard?.successCode;
export const getAuthErrorCode = (state: RootState) => state?.dashboard?.errorCode;
export const getIsAuthenticated = (state: RootState) => state?.dashboard?.isAuthenticated;
