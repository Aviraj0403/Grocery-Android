import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Arrivals = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-center px-4 py-16 relative">
      
      {/* Firecrackers GIF */}
      <motion.img
        src="https://media.giphy.com/media/xT1XGzQw2h1vE73VNm/giphy.gif"
        alt="firecrackers"
        className="w-28 h-28 mb-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
      />

      {/* Celebration Confetti GIF */}
      {/* <motion.img
        src="https://media.giphy.com/media/111ebonMs90YLu/giphy.gif"
        alt="confetti celebration"
        className="w-24 h-24 mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      /> */}

      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-green-700 mb-4"
      >
        🛍️ New Arrivals
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg text-gray-600 text-center max-w-xl"
      >
        We’re preparing something fresh and exciting just for you! Check back
        soon to discover our latest additions to the store.
      </motion.p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        className="mt-8 px-6 py-2 bg-green-600 text-white rounded-full shadow-lg text-sm font-medium"
      >
        Coming Soon...
      </motion.div>

      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-5 py-2 bg-gray-800 text-white rounded-full shadow hover:bg-gray-700 transition duration-300"
      >
        ← Go Back
      </button>
    </div>
  );
};

export default Arrivals;
