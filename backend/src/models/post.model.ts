import { Schema, model, SchemaTypes } from 'mongoose';
import { IPost } from '../types/post';

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = model<IPost>('Post', postSchema); 