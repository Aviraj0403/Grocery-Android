import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

const sampleDeos = [
  { id: 1, name: "Axe Dark Temptation", price: 100, image: "/images/axe.jpg" },
  { id: 2, name: "Nivea Fresh Active", price: 150, image: "/images/nivea.jpg" },
  { id: 3, name: "Dove Men+Care", price: 6.25, image: "/images/dove.jpg" },
  { id: 4, name: "Park Avenue Good Morning", price: 5.25, image: "/images/parkavenue.jpg" },
  { id: 5, name: "Denver Hamilton", price: 4.99, image: "/images/denver.jpg" },
  { id: 6, name: "Fogg Xtremo", price: 6.49, image: "/images/fogg.jpg" },
  { id: 7, name: "Wild Stone Hydra Energy", price: 5.75, image: "/images/wildstone.jpg" },
  { id: 8, name: "Set Wet Cool Avatar", price: 4.79, image: "/images/setwet.jpg" },
  { id: 9, name: "Engage M1", price: 6.1, image: "/images/engage.jpg" },
  { id: 10, name: "Old Spice Original", price: 5.99, image: "/images/oldspice.jpg" },
  { id: 11, name: "Axe Fresh", price: 5.99, image: "/images/axe_fresh.jpg" },
  { id: 12, name: "Nivea Men", price: 4.99, image: "/images/nivea_men.jpg" },
  { id: 13, name: "Dove Men", price: 5.99, image: "/images/dove_men.jpg" },
  { id: 14, name: "Park Avenue Classic", price: 4.99, image: "/images/parkavenue_classic.jpg" },
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
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-3 flex flex-col items-center text-center border border-gray-100 hover:border-blue-500 relative w-full h-full"
    >
      <button
        onClick={() => toggleWishlist(item.id)}
        className={`absolute top-1 right-1 p-1 rounded-full ${
          wishlist[item.id] ? "text-red-500" : "text-gray-400"
        } hover:text-red-500 transition`}
      >
        <FaHeart className="w-4 h-4" />
      </button>

      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover mb-2 rounded-full border"
      />
      <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
      <p className="text-blue-600 font-semibold text-sm mb-1">${item.price.toFixed(2)}</p>

      {cart[item.id] > 0 ? (
        <div className="flex items-center gap-1 mt-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleRemove(item.id)}
            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
          >
            -
          </motion.button>
          <span className="text-xs font-medium">{cart[item.id]}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAdd(item.id)}
            className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition"
          >
            +
          </motion.button>
        </div>
      ) : (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAdd(item.id)}
          className="mt-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-500 transition"
        >
          Add to Cart
        </motion.button>
      )}
    </motion.div>
  );

  return (
    <>
      <marquee className="text-sm text-white bg-slate-500 py-2 font-semibold tracking-wide">
        🎉 Get 2% discount on every deodorant & Cleaning Essential! Limited time offer 🎉
      </marquee>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-4 py-6 max-w-6xl mx-auto"
      >
        <Link to={"/"}>
          <div className="relative">
            <ImCancelCircle className="absolute top-2 right-2 text-xl text-red-500 cursor-pointer hover:text-red-600 transition" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-500 drop-shadow-lg mb-6">
              Deodorants
            </h1>
          </div>
        </Link>

        {loading ? (
          <div className="text-center text-blue-600 font-semibold text-lg my-10 animate-pulse">
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {currentItems.map(renderCard)}
          </div>
        )}

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            Previous
          </button>
          <span className="flex items-center text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Deo;
