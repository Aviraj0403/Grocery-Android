import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const { user } = useAuth(); // AuthContext user
  const { items = [] } = useSelector((state) => state.cart || {});

  const isDashboard = location.pathname.startsWith('/');

  return (
    <header className="bg-white  sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          🛒 Shanu-Mart
        </Link>

        {/* Search bar (desktop only, visible on dashboard) */}
        {isDashboard && (
          <div className="hidden md:flex flex-1 mx-6">
            <input
              type="text"
              placeholder="Search groceries..."
              className="w-full px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-green-500 transition-10s"
            />
          </div>
        )}

        {/* Right-side icons */}
        <div className="flex items-center gap-5">
          {/* Cart Icon */}
          <Link to="/dashboard/cart" className="relative text-green-600 hover:text-green-700">
            <FaShoppingCart size={30} />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {items.length}
              </span>
            )}
          </Link>

          {/* User Icon */}
          {/* <Link
            to={user ? '/dashboard/profile' : '/login'}
            className="text-green-600 hover:text-green-700"
            title={user ? `Hi, ${user.userName || user.email}` : 'Login'}
          >
            <FaUserCircle size={24} />
            
          </Link> */}
          <Link
  to={user ? '/dashboard/profile' : '/login'}
  className="flex items-center gap-2 text-green-600 hover:text-green-700"
  title={user ? `Hi, ${user.userName || user.email}` : 'Login'}
>
  {user?.avatar ? (
    <img
      src={user.avatar}
      alt="User Avatar"
      className="w-8 h-8 rounded-full object-cover border border-green-500"
    />
  ) : (
    <div className='font-semibold'>
      Login
    </div>
  )}
  {user?.userName && (
    <span className="hidden sm:inline text-sm font-medium">{user.userName}</span>
  )}
</Link>

        </div>
      </div>

      {/* Mobile search input (only on dashboard routes) */}
      {isDashboard && (
        <div className="md:hidden px-4 pb-3">
          <input
            type="text"
            placeholder="Search groceries..."
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
