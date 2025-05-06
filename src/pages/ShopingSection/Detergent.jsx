import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const products = [
  // Detergent
  {
    id: 1,
    category: "Detergent",
    name: "Surf Excel Matic",
    price: "₹210",
    image:
      "https://www.bigbasket.com/media/uploads/p/l/1202753_6-surf-excel-matic-front-load-detergent-powder.jpg",
  },
  {
    id: 2,
    category: "Detergent",
    name: "Rin Advanced",
    price: "₹70",
    image:
      "https://www.bigbasket.com/media/uploads/p/l/272937_8-rin-detergent-bar-advanced.jpg",
  },
  {
    id: 3,
    category: "Detergent",
    name: "Ariel Matic",
    price: "₹220",
    image:
      "https://www.bigbasket.com/media/uploads/p/l/1214990_5-ariel-matic-top-load-detergent-washing-powder.jpg",
  },
  {
    id: 4,
    category: "Detergent",
    name: "Tide Plus",
    price: "₹160",
    image:
      "https://www.bigbasket.com/media/uploads/p/l/40087569_4-tide-plus-jasmine-rose-detergent-powder.jpg",
  },
  {
    id: 5,
    category: "Detergent",
    name: "Henko Matic",
    price: "₹190",
    image:
      "https://www.bigbasket.com/media/uploads/p/l/1214965_1-henko-matic-front-load-detergent-powder.jpg",
  },

  // Bleach
  {
    id: 6,
    category: "Bleach",
    name: "Robin Blue",
    price: "₹20",
    image:
      "https://www.bigbasket.com/media/uploads/p/l/10000269_11-robin-liquid-blue.jpg",
  },
  {
    id: 7,
    category: "Bleach",
    name: "Ujala Supreme",
    price: "₹35",
    image:
      "https://www.bigbasket.com/media/uploads/p/l/10000156_16-ujala-supreme-fabric-whitener.jpg",
  },
  {
    id: 8,
    category: "Bleach",
    name: "Domex Bleach",
    price: "₹85",
    image:
      "https://www.bigbasket.com/media/uploads/p/l/267400_11-domex-disinfectant-floor-cleaner-bleach.jpg",
  },
  {
    id: 9,
    category: "Bleach",
    name: "Safewash Fabric Whitener",
    price: "₹65",
    image:
      "https://www.bigbasket.com/media/uploads/p/l/40192269_4-safewash-liquid-bleach.jpg",
  },
  {
    id: 10,
    category: "Bleach",
    name: "Henko Fabric Whitener",
    price: "₹45",
    image:
      "https://www.bigbasket.com/media/uploads/p/l/10000274_14-henko-whiteners-fabric.jpg",
  },
];

const ITEMS_PER_PAGE = 4;

const Detergent = () => {
  const navigate = useNavigate();
  const handleAddToCart = (products) => {
    // Add to cart logic here (e.g., dispatch Redux action)
    toast.success( `${products.name}added to cart!`);
  };
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState({});

  const handleWishlistToggle = (product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  const handlePageChange = (category, newPage) => {
    setCurrentPage((prev) => ({ ...prev, [category]: newPage }));
  };

  const grouped = products.reduce((acc, item) => {
    acc[item.category] = [...(acc[item.category] || []), item];
    return acc;
  }, {});

  return (
    <>
      <marquee className="text-sm text-white bg-blue-600 py-2 font-semibold tracking-wide">
        🧼 Clean Clothes, Bright Whites – Explore Detergents & Bleach 🧼
      </marquee>
      <div className="p-4 bg-blue-50 min-h-screen">
        <Link to={"/"}>
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Detergents & Bleach
          </h2>
        </Link>

        {Object.entries(grouped).map(([category, items]) => {
          const page = currentPage[category] || 1;
          const startIndex = (page - 1) * ITEMS_PER_PAGE;
          const paginatedItems = items.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
          );
          const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

          return (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {paginatedItems.map((product) => {
                  const isWishlisted = wishlist.some(
                    (item) => item.id === product.id
                  );

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
                          isWishlisted
                            ? "text-red-500"
                            : "text-gray-400 hover:text-red-500"
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
                      <button className="mt-2 w-full bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600" onClick={()=>handleAddToCart(products)}>
                        Add to Cart
                      </button>
                    </motion.div>
                  );
                })}
              </div>

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
            <h3 className="text-xl font-bold text-red-600 mb-4">
              Your Wishlist
            </h3>
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
              <ToastContainer position="top-right" />
            </div>
          </div>
        )}
      </div>
     
    </>
  );
};

export default Detergent;
