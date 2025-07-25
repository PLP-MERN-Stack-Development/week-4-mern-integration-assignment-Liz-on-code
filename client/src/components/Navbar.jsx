import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-200 p-4">
      <Link to="/" className="mr-4">Home</Link>
      <Link to="/create">Create Post</Link>
    </nav>
  );
}

export default Navbar;
