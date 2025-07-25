import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [form, setForm] = useState({ title: '', content: '', category: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.title || !form.content || !form.category) {
      setError('All fields are required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post('/api/posts', form);
      setSuccess('Post created successfully!');
      setForm({ title: '', content: '', category: '' });
    } catch (err) {
      setError('Failed to create post.');
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        /><br />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
        ></textarea><br />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        /><br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
