import { Router, RequestHandler } from 'express';
import { protect } from '../middleware/auth.middleware';
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from '../controllers/post.controller';
import { asyncHandler } from '../utils/commonFunctions';

const router = Router();

// All routes are protected
router.use(protect as RequestHandler);

// Post routes
router.post('/', asyncHandler(createPost));
router.get('/', asyncHandler(getPosts));

// Post routes with ID
router.get('/:id', asyncHandler(getPost));
router.put('/:id', asyncHandler(updatePost));
router.delete('/:id', asyncHandler(deletePost));

export default router; 