import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import deoimg from "../../assets/deo1.png";

const sampleDeos = [
  { id: 1, name: "Axe Dark Temptation", price: 100, image: deoimg },
  { id: 2, name: "Nivea Fresh Active", price: 150, image: deoimg },
  { id: 3, name: "Dove Men+Care", price: 6.25, image: deoimg },
  { id: 4, name: "Park Avenue Good Morning", price: 5.25, image: deoimg },
  { id: 5, name: "Denver Hamilton", price: 4.99, image: deoimg },
  { id: 6, name: "Fogg Xtremo", price: 6.49, image: deoimg },
  { id: 7, name: "Wild Stone Hydra Energy", price: 5.75, image: deoimg },
  { id: 8, name: "Set Wet Cool Avatar", price: 4.79, image: deoimg },
  { id: 9, name: "Engage M1", price: 6.1, image: deoimg },
  { id: 10, name: "Old Spice Original", price: 5.99, image: deoimg },
  { id: 11, name: "Axe Fresh", price: 5.99, image: deoimg },
  { id: 12, name: "Nivea Men", price: 4.99, image: deoimg },
  { id: 13, name: "Dove Men", price: 5.99, image: deoimg },
  { id: 14, name: "Park Avenue Classic", price: 4.99, image: deoimg },
];

const Deo = () => {
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(sampleDeos.length / itemsPerPage);

  const handleAdd = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemove = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) updated[id]--;
      else delete updated[id];
      return updated;
    });
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePageChange = (page) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setLoading(false);
    }, 500);
  };

  const currentItems = sampleDeos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderCard = (item) => (
    <motion.div
      key={item.id}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-xl p-4 flex flex-col items-center text-center border border-blue-100 relative w-full h-full"
    >
      <button
        onClick={() => toggleWishlist(item.id)}
        className={`absolute top-2 right-2 p-1 rounded-full transition ${
          wishlist[item.id] ? "text-red-500" : "text-gray-300"
        } hover:text-red-500`}
      >
        <FaHeart className="w-5 h-5" />
      </button>

      <img
        src={item.image}
        alt={item.name}
        className="w-32 h-32 object-cover mb-3 rounded-full border-2 border-blue-200 shadow-md"
      />
      <h3 className="text-md font-bold text-gray-800 mb-1">{item.name}</h3>
      <p className="text-blue-600 font-semibold text-sm mb-2">₹{item.price.toFixed(2)}</p>

      {cart[item.id] > 0 ? (
        <div className="flex items-center gap-2 mt-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleRemove(item.id)}
            className="px-3 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600 transition"
          >
            -
          </motion.button>
          <span className="text-sm font-semibold">{cart[item.id]}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAdd(item.id)}
            className="px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition"
          >
            +
          </motion.button>
        </div>
      ) : (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAdd(item.id)}
          className="mt-2 bg-green-600 text-white text-xs px-4 py-1 rounded-full hover:bg-red-500 transition"
        >
          Add to Cart
        </motion.button>
      )}
    </motion.div>
  );

  return (
    <>
      <marquee className="text-sm text-white bg-blue-600 py-2 font-semibold tracking-wide">
        🎉 Get 2% discount on every deodorant & Cleaning Essential! Limited time offer 🎉
      </marquee>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-4 py-6 max-w-6xl mx-auto"
      >
        <div className="relative mb-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-red-500 drop-shadow-lg">
            Premium Deodorants
          </h1>
        </div>

        {loading ? (
          <div className="text-center text-blue-600 font-semibold text-lg my-10 animate-pulse">
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map(renderCard)}
          </div>
        )}

        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1 || loading}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            Previous
          </button>
          <span className="flex items-center text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages || loading}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Deo;
