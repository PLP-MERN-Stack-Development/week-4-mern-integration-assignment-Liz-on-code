import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

export const fetchPosts = () => API.get('/posts');
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (postData) => API.post('/posts', postData);
export const updatePost = (id, postData) => API.put(`/posts/${id}`, postData);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const fetchCategories = () => API.get('/categories');
export const createCategory = (category) => API.post('/categories', category);
