import type { RootState } from '../store';

export const getPostsLoading = (state: RootState) => state?.post?.isLoading;
export const getPostsSuccessMessage = (state: RootState) => state?.post?.successMessage;
export const getPostsError = (state: RootState) => state?.post?.error;
export const getAllPosts = (state: RootState) => state?.post?.posts; 