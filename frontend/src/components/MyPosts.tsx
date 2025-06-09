import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import type { Post } from '../types/Post';

// Temporary mock data
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'First Post',
    content: 'This is my first post content.',
    createdAt: new Date().toISOString(),
    author: 'John Doe',
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'This is my second post content with more text to show how it wraps.',
    createdAt: new Date().toISOString(),
    author: 'John Doe',
  },
];

export default function MyPosts() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleDeleteClick = (post: Post) => {
    setSelectedPost(post);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedPost) {
      try {
        // TODO: Implement API call to delete post
        console.log('Deleting post:', selectedPost.id);
        setPosts(posts.filter(post => post.id !== selectedPost.id));
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box className="w-full max-w-4xl mx-auto p-4">
      <Paper elevation={3} className="p-8">
        <Typography variant="h4" component="h1" className="text-center mb-6">
          My Posts
        </Typography>
        <div className="space-y-4">
          {posts.length === 0 ? (
            <Typography variant="body1" className="text-center text-gray-500">
              You haven't created any posts yet.
            </Typography>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="w-full">
                <CardContent>
                  <div className="flex justify-between items-start">
                    <div>
                      <Typography variant="h6" component="h2" className="mb-2">
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className="mb-3">
                        Posted on {formatDate(post.createdAt)}
                      </Typography>
                    </div>
                    <IconButton
                      onClick={() => handleDeleteClick(post)}
                      color="error"
                      size="small"
                      className="mt-1"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <Divider className="my-3" />
                  <Typography variant="body1" className="whitespace-pre-line">
                    {post.content}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedPost?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 