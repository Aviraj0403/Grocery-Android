import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion"; // ← import Framer Motion
import { Link } from "react-router-dom";

const products = [
    // Toothpaste
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
  
    // Toothbrush
    {
      id: 6,
      category: "Toothbrush",
      name: "Colgate Slim Soft",
      price: "₹30",
      image: "https://www.bigbasket.com/media/uploads/p/l/40071613_2-colgate-toothbrush-slim-soft.jpg",
    },
    {
      id: 7,
      category: "Toothbrush",
      name: "Oral-B All Rounder",
      price: "₹25",
      image: "https://www.bigbasket.com/media/uploads/p/l/261831_6-oral-b-toothbrush-all-rounder.jpg",
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

    // Home Cleaning Essentials
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

  const ITEMS_PER_PAGE = 4;

  const Toothpaste = () => {
    const [wishlist, setWishlist] = useState([]);
    const [currentPage, setCurrentPage] = useState({}); // per-category page tracker
  
    const handleWishlistToggle = (product) => {
      setWishlist((prev) => {
        const exists = prev.find((item) => item.id === product.id);
        return exists ? prev.filter((item) => item.id !== product.id) : [...prev, product];
      });
    };
  
    const handlePageChange = (category, newPage) => {
      setCurrentPage((prev) => ({
        ...prev,
        [category]: newPage,
      }));
    };
  
    const grouped = products.reduce((acc, item) => {
      acc[item.category] = [...(acc[item.category] || []), item];
      return acc;
    }, {});
  
    return (
        <>
         <marquee className="text-sm text-white bg-orange-400 py-2 font-semibold tracking-wide">
      🎉 Get Tootpaste Brushes and Home Cleaning Essintails 🎉
    </marquee>
      <div className="p-4 bg-green-50 min-h-screen">
        <Link to={"/"}>
        <h2 className="text-2xl font-bold text-green-700 mb-4">
         Toothpaste & Home Cleaning
        </h2>
        </Link>
  
        {Object.entries(grouped).map(([category, items]) => {
          const page = currentPage[category] || 1;
          const startIndex = (page - 1) * ITEMS_PER_PAGE;
          const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
          const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  
          return (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold text-green-700 mb-2">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {paginatedItems.map((product) => {
                  const isWishlisted = wishlist.some((item) => item.id === product.id);
  
                  return (
                    <motion.div
                      key={product.id}
                      className="relative bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition"
                      whileHover={{ scale: 1.03 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.button
                        onClick={() => handleWishlistToggle(product)}
                        whileTap={{ scale: 1.3 }}
                        className={`absolute top-2 right-2 text-xl ${
                          isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                      </motion.button>
  
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-contain mb-2"
                      />
                      <h4 className="text-md font-semibold">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.price}</p>
                      <button className="mt-2 w-full bg-orange-400 text-white py-1 px-2 rounded hover:bg-orange-600">
                        Add to Cart
                      </button>
                    </motion.div>
                  );
                })}
              </div>
  
              {/* Pagination Controls */}
              <div className="flex justify-center mt-4 gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => handlePageChange(category, page - 1)}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-sm text-gray-700 mt-1">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(category, page + 1)}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          );
        })}
  
        {/* Wishlist Section */}
        {wishlist.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold text-red-600 mb-4">Your Wishlist</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <AnimatePresence>
                {wishlist.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow p-3"
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
      </>
    );
  };
  

export default Toothpaste;
