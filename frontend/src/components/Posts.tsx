import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography, Button, Alert } from '@mui/material';
import { getPostsRequest, deletePostRequest } from '../services/redux/slices/postSlice';
import { getAllPosts, getPostsLoading, getPostsError } from '../services/redux/selectors';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../services/redux/store';
import Loader from './Loader';

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Posts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const posts = useSelector(getAllPosts) as Post[];
  const isLoading = useSelector(getPostsLoading);
  const error = useSelector(getPostsError);

  useEffect(() => {
    dispatch(getPostsRequest());
  }, [dispatch]);

  const handleEdit = (postId: string) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDelete = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePostRequest(postId as any));
    }
  };

  if (isLoading) {
    return <Loader text="Loading posts..." />;
  }

  if (error) {
    return (
      <Box className="max-w-4xl mx-auto mt-8 p-4">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box className="max-w-4xl mx-auto mt-8 p-4">
      <Box className="flex gap-10 justify-between items-center mb-6">
        <Typography variant="h4">My Posts</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/create-post')}
        >
          Create New Post
        </Button>
      </Box>

      {posts?.length === 0 ? (
        <Typography variant="h6" className="text-center text-gray-500 mt-8">
          No posts found. Create your first post!
        </Typography>
      ) : (
        <Box className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {posts?.map((post: Post) => (
            <Box key={post._id}>
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent>
                  <Typography variant="h5" component="h2" className="mb-2">
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    className="mb-4 line-clamp-3"
                  >
                    {post.content}
                  </Typography>
                  <Box className="flex justify-end space-x-2">
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(post._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Posts; 