import { Request, Response } from 'express';
import { Post } from '../models/post.model';
import { CreatePostInput } from '../types/post';
import { errorResponse, successResponse } from '../utils/response.utils';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content }: CreatePostInput = req.body;
    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });

    return successResponse(res, 'Post created successfully', post);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .populate('author', 'email');

    return successResponse(res, 'Posts fetched successfully', posts);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      author: req.user._id,
    }).populate('author', 'email');

    if (!post) {
      return errorResponse(res, 'Post not found');
    }

    return successResponse(res, 'Post fetched successfully', post);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, content }: CreatePostInput = req.body;
    const post = await Post.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user._id,
      },
      { title, content },
      { new: true }
    );

    if (!post) {
      return errorResponse(res, 'Post not found');
    }

    return successResponse(res, 'Post updated successfully', post);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!post) {
      return errorResponse(res, 'Post not found');
    }

    return successResponse(res, 'Post deleted successfully');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
}; 