import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import brush1 from "../../assets/Tooth2.png";

const products = [
  // ... [Same products list as before] ...
  {
    id: 1,
    category: "Toothpaste",
    name: "Colgate Strong Teeth",
    price: "₹50",
    image: "https://www.bigbasket.com/media/uploads/p/l/40015597_7-colgate-strong-teeth.jpg",
  },
  {
    id: 2,
    category: "Toothpaste",
    name: "Pepsodent Germi Check",
    price: "₹45",
    image: "https://www.bigbasket.com/media/uploads/p/l/40084306_3-pepsodent-germi-check.jpg",
  },
  {
    id: 3,
    category: "Toothpaste",
    name: "Closeup Ever Fresh",
    price: "₹55",
    image: "https://www.bigbasket.com/media/uploads/p/l/40029729_7-closeup-ever-fresh-toothpaste.jpg",
  },
  {
    id: 4,
    category: "Toothpaste",
    name: "Sensodyne Sensitive",
    price: "₹95",
    image: "https://www.bigbasket.com/media/uploads/p/l/1201031_5-sensodyne-sensitive-toothpaste.jpg",
  },
  {
    id: 5,
    category: "Toothpaste",
    name: "Dabur Red Paste",
    price: "₹60",
    image: "https://www.bigbasket.com/media/uploads/p/l/1201414_3-dabur-red-toothpaste.jpg",
  },
  {
    id: 6,
    category: "Toothbrush",
    name: "Colgate Slim Soft",
    price: "₹30",
    image: brush1,
  },
  {
    id: 7,
    category: "Toothbrush",
    name: "Oral-B All Rounder",
    price: "₹25",
    image: brush1,
  },
  {
    id: 8,
    category: "Toothbrush",
    name: "Pepsodent Triple Clean",
    price: "₹28",
    image: "https://www.bigbasket.com/media/uploads/p/l/40024452_2-pepsodent-triple-clean.jpg",
  },
  {
    id: 9,
    category: "Toothbrush",
    name: "Sensodyne Soft Brush",
    price: "₹35",
    image: "https://www.bigbasket.com/media/uploads/p/l/40090192_2-sensodyne-sensitive-soft-toothbrush.jpg",
  },
  {
    id: 10,
    category: "Toothbrush",
    name: "Dabur Herbal Brush",
    price: "₹20",
    image: "https://www.bigbasket.com/media/uploads/p/l/40071457_3-dabur-herbal-toothbrush.jpg",
  },
  {
    id: 11,
    category: "Home Cleaning",
    name: "Lizol Disinfectant Surface Cleaner",
    price: "₹99",
    image: "https://www.bigbasket.com/media/uploads/p/l/10000395_15-lizol-disinfectant-surface-cleaner.jpg",
  },
  {
    id: 12,
    category: "Home Cleaning",
    name: "Harpic Toilet Cleaner",
    price: "₹85",
    image: "https://www.bigbasket.com/media/uploads/p/l/241580_10-harpic-toilet-cleaner.jpg",
  },
  {
    id: 13,
    category: "Home Cleaning",
    name: "Vim Dishwash Gel",
    price: "₹95",
    image: "https://www.bigbasket.com/media/uploads/p/l/40004944_9-vim-dishwash-gel-lemon.jpg",
  },
  {
    id: 14,
    category: "Home Cleaning",
    name: "Dettol Antiseptic Liquid",
    price: "₹115",
    image: "https://www.bigbasket.com/media/uploads/p/l/221124_15-dettol-antiseptic-liquid.jpg",
  },
  {
    id: 15,
    category: "Home Cleaning",
    name: "Scotch-Brite Scrub Pad",
    price: "₹30",
    image: "https://www.bigbasket.com/media/uploads/p/l/40075382_4-scotch-brite-scrub-pad.jpg",
  },
];

const ITEMS_PER_PAGE = 8;

const Toothpaste = () => {
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleWishlistToggle = (product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const paginatedItems = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4 bg-gradient-to-br from-green-50 to-yellow-50 min-h-screen">
      <Link to="/" className="block text-center">
        <h2 className="text-4xl font-extrabold text-orange-600 mb-6 underline underline-offset-4">
          Oral & Home Care Products
        </h2>
      </Link>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1 rounded-full font-medium border ${
              selectedCategory === cat
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"
            }`}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search product name..."
          className="px-4 py-2 w-72 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-400"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {paginatedItems.map((product) => {
          const isWishlisted = wishlist.some((item) => item.id === product.id);

          return (
            <motion.div
              key={product.id}
              className="relative bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <button
                onClick={() => handleWishlistToggle(product)}
                className={`absolute top-2 right-2 text-xl z-10 ${
                  isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
                }`}
              >
                {isWishlisted ? <FaHeart /> : <FaRegHeart />}
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-contain mb-3"
              />
              <h4 className="text-md font-semibold">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.price}</p>
              <button className="mt-3 w-full bg-orange-500 text-white py-1.5 rounded-xl hover:bg-orange-600 font-semibold transition-all">
                Add to Cart
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-40"
          >
            ⬅ Prev
          </button>
          <span className="text-sm mt-1 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-40"
          >
            Next ➡
          </button>
        </div>
      )}

      {/* Wishlist Section */}
      {wishlist.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-red-600 mb-6">❤️ Your Wishlist</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            <AnimatePresence>
              {wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-contain mb-2"
                  />
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.price}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toothpaste;
