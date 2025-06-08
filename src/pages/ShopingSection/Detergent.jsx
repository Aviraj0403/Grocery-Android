import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const products = [
  // Detergents
  { id: 1, category: "Detergent", name: "Surf Excel Matic", price: "₹210", image: "https://www.bigbasket.com/media/uploads/p/l/1202753_6-surf-excel-matic-front-load-detergent-powder.jpg" },
  { id: 2, category: "Detergent", name: "Rin Advanced", price: "₹70", image: "https://www.bigbasket.com/media/uploads/p/l/272937_8-rin-detergent-bar-advanced.jpg" },
  { id: 3, category: "Detergent", name: "Ariel Matic", price: "₹220", image: "https://www.bigbasket.com/media/uploads/p/l/1214990_5-ariel-matic-top-load-detergent-washing-powder.jpg" },
  { id: 4, category: "Detergent", name: "Tide Plus", price: "₹160", image: "https://www.bigbasket.com/media/uploads/p/l/40087569_4-tide-plus-jasmine-rose-detergent-powder.jpg" },
  { id: 5, category: "Detergent", name: "Henko Matic", price: "₹190", image: "https://www.bigbasket.com/media/uploads/p/l/1214965_1-henko-matic-front-load-detergent-powder.jpg" },
  // Bleach
  { id: 6, category: "Bleach", name: "Robin Blue", price: "₹20", image: "https://www.bigbasket.com/media/uploads/p/l/10000269_11-robin-liquid-blue.jpg" },
  { id: 7, category: "Bleach", name: "Ujala Supreme", price: "₹35", image: "https://www.bigbasket.com/media/uploads/p/l/10000156_16-ujala-supreme-fabric-whitener.jpg" },
  { id: 8, category: "Bleach", name: "Domex Bleach", price: "₹85", image: "https://www.bigbasket.com/media/uploads/p/l/267400_11-domex-disinfectant-floor-cleaner-bleach.jpg" },
  { id: 9, category: "Bleach", name: "Safewash Fabric Whitener", price: "₹65", image: "https://www.bigbasket.com/media/uploads/p/l/40192269_4-safewash-liquid-bleach.jpg" },
  { id: 10, category: "Bleach", name: "Henko Fabric Whitener", price: "₹45", image: "https://www.bigbasket.com/media/uploads/p/l/10000274_14-henko-whiteners-fabric.jpg" },
];

const Detergent = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const handleWishlistToggle = (product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    toast.success(`${product.name} added to cart!`);
  };

  const filteredProducts = products
    .filter((item) =>
      selectedCategory === "All" ? true : item.category === selectedCategory
    )
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="bg-blue-50 min-h-screen p-4">
      <marquee className="text-sm text-white bg-blue-600 py-2 font-semibold">
        🧼 Clean Clothes, Bright Whites – Explore Detergents & Bleach 🧼
      </marquee>

      <div className="flex flex-col items-center justify-center text-center gap-4 my-4">
        <h2 className="text-4xl font-bold text-blue-800">Detergents & Bleach</h2>

        <div className="flex flex-wrap justify-center gap-2 items-center">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-3 py-1 rounded-md w-48"
          />

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full border ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        <AnimatePresence>
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);

            return (
              <motion.div
                key={product.id}
                layout
                className="bg-white rounded-xl shadow-md p-3 relative"
                whileHover={{ scale: 1.03 }}
              >
                <motion.button
                  onClick={() => handleWishlistToggle(product)}
                  whileTap={{ scale: 1.2 }}
                  className="absolute top-2 right-2 text-xl"
                >
                  {isWishlisted ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400 hover:text-red-500" />
                  )}
                </motion.button>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-contain mb-2"
                />
                <h4 className="text-md font-semibold">{product.name}</h4>
                <p className="text-blue-600 font-semibold">{product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 flex justify-center items-center gap-1"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {wishlist.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-bold text-red-600 mb-4 text-center">Your Wishlist</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded shadow">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-28 object-contain mb-2"
                />
                <h4 className="text-sm font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Detergent;
