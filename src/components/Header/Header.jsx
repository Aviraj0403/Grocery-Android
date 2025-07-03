import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const items = useSelector((state) => state.cart.items || []);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const showSearchBar =
    location.pathname === "/" || location.pathname === "/dashboard/cart";
  // Navigate immediately when typing (with trim)
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/search?query=${encodeURIComponent(trimmed)}`);
    }
  }, [searchQuery, navigate]);

  return (
    <header className="bg-white sticky top-0 z-50 shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-green-600 flex items-center gap-1"
        >
          <FaShoppingCart className="text-yellow-500" />
          <span className="text-yellow-500">Shanu-</span>Mart
        </Link>

        {showSearchBar && (
          <div className="hidden md:flex flex-1 mx-6">
            <input
              type="text"
              placeholder="Search groceries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        )}

        <div className="flex items-center gap-5">
          <Link
            to="/dashboard/cart"
            className="relative text-green-600 hover:text-green-700"
          >
            <FaShoppingCart size={30} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <div className="font-semibold">Login</div>
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-2 text-green-600 hover:text-green-700"
                title={`Hi, ${user.userName || user.email}`}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover border border-green-500"
                  />
                ) : (
                  <FaUserCircle size={30} />
                )}
                <span className="hidden sm:inline text-sm font-medium">
                  {user.userName}
                </span>
              </Link>

              <button
                onClick={logout}
                className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-full"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
