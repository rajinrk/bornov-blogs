import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { 
  createPostRequest, 
  resetPostMessages, 
  updatePostRequest,
  getPostsRequest 
} from '../services/redux/slices/postSlice';
import { 
  getPostsLoading, 
  getPostsSuccessMessage, 
  getPostsError,
  getAllPosts 
} from '../services/redux/selectors';
import type { AppDispatch } from '../services/redux/store';
import Loader from './Loader';
import { useNavigate, useParams } from 'react-router-dom';

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface CreatePostForm {
  title: string;
  content: string;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),
  content: Yup.string()
    .required('Content is required')
    .min(10, 'Content must be at least 10 characters')
});

const CreatePost: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(getPostsLoading);
  const successMessage = useSelector(getPostsSuccessMessage);
  const error = useSelector(getPostsError);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const posts = useSelector(getAllPosts) as Post[];
  const isEditMode = Boolean(id);

  const {
    values, 
    handleChange, 
    handleBlur, 
    handleSubmit, 
    errors, 
    touched, 
    resetForm,
    setValues
  } = useFormik<CreatePostForm>({
    initialValues: {
      title: '',
      content: ''
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values: CreatePostForm) => {
      if (isEditMode && id) {
        dispatch(updatePostRequest({ ...values, id } as any));
      } else {
        dispatch(createPostRequest(values as any));
      }
    }
  });

  // Load post data in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      // If posts are not loaded yet, fetch them
      if (!posts?.length) {
        dispatch(getPostsRequest());
      } else {
        // Find the post to edit
        const postToEdit = posts.find((post: Post) => post._id === id);
        if (postToEdit) {
          setValues({
            title: postToEdit.title,
            content: postToEdit.content 
          });
        } else {
          // If post not found, redirect to posts list
          navigate('/my-posts');
        }
      }
    }
  }, [id, posts, isEditMode]);

  useEffect(() => {
    if (successMessage) {        
      alert(successMessage);
      resetForm();
      navigate('/my-posts');
    }
    if (error) {
      alert(error);
    }
    setTimeout(() => dispatch(resetPostMessages()), 1000);
  }, [successMessage, error]);

  if (isLoading) {
    return <Loader text={isEditMode ? "Updating post..." : "Creating post..."} fullScreen />;
  }

  return (
    <Box className="max-w-2xl mx-auto mt-8 p-6 bg-blue-900 rounded-lg shadow-md">
      <Typography variant="h4" className="mb-6 text-center text-white">
        {isEditMode ? 'Edit Post' : 'Create New Post'}
      </Typography>

      {successMessage && (
        <Alert severity="success" className="mb-4">
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && Boolean(errors.title)}
          helperText={touched.title && errors.title}
          className="rounded"
        />

        <TextField
          fullWidth
          id="content"
          name="content"
          label="Content"
          multiline
          rows={6}
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.content && Boolean(errors.content)}
          helperText={touched.content && errors.content}
          className="rounded"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          className="mt-4"
        >
          {isEditMode ? 'Update Post' : 'Create Post'}
        </Button>
      </form>
    </Box>
  );
};

export default CreatePost; 