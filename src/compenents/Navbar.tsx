import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-indigo-600">Al Mohandis E-commerce</h1>
      <div className="space-x-4">
        <Link
          to="/"
          className={`px-4 py-2 rounded-full font-bold transition-colors ${location.pathname === '/' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
        >
          Vue Client
        </Link>
        <Link
          to="/admin"
          className={`px-4 py-2 rounded-full font-bold transition-colors ${location.pathname === '/admin' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
        >
          Vue Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
