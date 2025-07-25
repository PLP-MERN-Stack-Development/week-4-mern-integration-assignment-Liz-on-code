import Post from '../models/Post.js';
import { validationResult } from 'express-validator';

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate('category');
  res.json(posts);
};

export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('category');
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
};

export const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const newPost = new Post(req.body);
  const saved = await newPost.save();
  res.status(201).json(saved);
};

export const updatePost = async (req, res) => {
  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Post not found' });
  res.json(updated);
};

export const deletePost = async (req, res) => {
  const deleted = await Post.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Post not found' });
  res.json({ message: 'Post deleted' });
};
