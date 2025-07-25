import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post(
  '/',
  [
    body('title').notEmpty(),
    body('content').notEmpty(),
    body('author').notEmpty(),
  ],
  createPost
);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
