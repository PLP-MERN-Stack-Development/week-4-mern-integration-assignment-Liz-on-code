import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { deletePost } from '../services/api';

const Home = () => {
  const { data: postsData, loading, error } = useFetch('/api/posts');
  const [posts, setPosts] = useState([]);

  // Sync posts from fetch once loaded
  React.useEffect(() => {
    if (postsData) setPosts(postsData);
  }, [postsData]);

  const handleDelete = async (id) => {
    // Optimistic update
    const oldPosts = [...posts];
    setPosts(posts.filter(post => post._id !== id));
    try {
      await deletePost(id);
    } catch (err) {
      setPosts(oldPosts); // rollback if failed
      alert('Failed to delete post.');
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Blog Posts</h1>
      {posts.map(post => (
        <div key={post._id} className="border p-4 mb-3 rounded shadow-sm">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.content}</p>
          <p className="text-sm text-gray-600"><strong>Category:</strong> {post.category}</p>
          <div className="mt-2 space-x-2">
            <Link to={`/edit/${post._id}`} className="text-blue-500">Edit</Link>
            <button onClick={() => handleDelete(post._id)} className="text-red-500">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
