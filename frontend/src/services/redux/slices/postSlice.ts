import { createSlice } from '@reduxjs/toolkit';


interface PostState {
  posts: any[];
  currentPost: any ;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: PostState = {
  posts: [],
  currentPost: null,
  isLoading: false,
  error: null,
  successMessage: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
   
    // Create Post
    createPostRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    createPostSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = [...state.posts, action.payload.data];
      state.successMessage = action.payload.status_code;
      state.error = null;
    },
    createPostFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.status_code;
      state.successMessage = null;
    },

    // Get All Posts
    getPostsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getPostsSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.data;
      state.error = null;
    },
    getPostsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.status_code;
    },

    // Update Post
    updatePostRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    updatePostSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.map(post =>
        post._id === action.payload.data._id ? action.payload.data : post
      );
      state.successMessage = action.payload.status_code;
      state.error = null;
    },
    updatePostFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.status_code;
      state.successMessage = null;
    },

    // Delete Post
    deletePostRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    deletePostSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter(post => post._id !== action.payload);
      state.successMessage = action.payload.status_code;
      state.error = null;
    },
    deletePostFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.status_code  ;
      state.successMessage = null;
    },

    // Set Current Post
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },

    // Reset Messages
    resetPostMessages: (state) => {
      state.isLoading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const {
  createPostRequest,
  createPostSuccess,
  createPostFailure,
  getPostsRequest,
  getPostsSuccess,
  getPostsFailure,
  updatePostRequest,
  updatePostSuccess,
  updatePostFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
  setCurrentPost,
  resetPostMessages,
} = postSlice.actions;

export default postSlice.reducer; 