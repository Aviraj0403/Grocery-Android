import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { Link } from "react-router-dom";

const shampoos = [
  { id: "s1", name: "Head & Shoulders", price: 4.99, image: "/images/hns.jpg" },
  { id: "s2", name: "Pantene Pro-V", price: 5.49, image: "/images/pantene.jpg" },
  { id: "s3", name: "Dove Intense Repair", price: 6.29, image: "/images/dove.jpg" },
  { id: "s4", name: "Sunsilk Black Shine", price: 4.79, image: "/images/sunsilk.jpg" },
  { id: "s5", name: "Clinic Plus", price: 3.99, image: "/images/clinicplus.jpg" },
  { id: "s6", name: "Tresemme Keratin", price: 6.99, image: "/images/tresemme.jpg" },
  { id: "s7", name: "L’Oreal Paris", price: 7.49, image: "/images/loreal.jpg" },
];

const facewashes = [
  { id: "f1", name: "Himalaya Neem Facewash", price: 3.99, image: "/images/himalaya.jpg" },
  { id: "f2", name: "Garnier Men OilClear", price: 4.25, image: "/images/garnier.jpg" },
  { id: "f3", name: "Pond’s Pure White", price: 3.75, image: "/images/ponds.jpg" },
  { id: "f4", name: "Nivea Men Dark Spot", price: 4.50, image: "/images/nivea.jpg" },
  { id: "f5", name: "Clean & Clear", price: 3.95, image: "/images/cleanandclear.jpg" },
];

const Cleaning = () => {
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [shampooPage, setShampooPage] = useState(1);
  const [facewashPage, setFacewashPage] = useState(1);

  const SHAMPOOS_PER_PAGE = 6;
  const FACEWASHES_PER_PAGE = 4;

  const toggleCart = (id, increment) => {
    setCart((prev) => {
      const updated = { ...prev };
      updated[id] = (updated[id] || 0) + increment;
      if (updated[id] <= 0) delete updated[id];
      return updated;
    });
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const paginate = (data, page, perPage) =>
    data.slice((page - 1) * perPage, page * perPage);

  const ProductCard = ({ item }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white p-3 rounded-2xl shadow-lg flex flex-col items-center text-center relative"
    >
      <button
        onClick={() => toggleWishlist(item.id)}
        className={`absolute top-2 right-2 transition-colors ${
          wishlist[item.id] ? "text-red-500" : "text-gray-300"
        }`}
      >
        <FaHeart />
      </button>
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-full border mb-2"
      />
      <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
      <p className="text-green-600 font-bold">${item.price.toFixed(2)}</p>
      <div className="mt-2">
        {cart[item.id] ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleCart(item.id, -1)}
              className="bg-red-500 text-white px-2 rounded"
            >
              -
            </button>
            <span>{cart[item.id]}</span>
            <button
              onClick={() => toggleCart(item.id, 1)}
              className="bg-green-500 text-white px-2 rounded"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => toggleCart(item.id, 1)}
            className="bg-green-600 text-white px-4 py-1 text-sm rounded-full hover:bg-green-700"
          >
            Add to Cart
          </button>
        )}
      </div>
    </motion.div>
  );

  const Pagination = ({ page, setPage, perPage, total }) => {
    const totalPages = Math.ceil(total / perPage);
    return (
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="bg-slate-500 text-white px-4 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="bg-slate-500 text-white px-4 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <>
      <marquee className="bg-slate-600 text-white text-sm py-2 font-medium">
        🎉 Get 2% off on selected skin-care! Limited time offer 🎉
      </marquee>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="relative mb-6">
          <Link to="/" className="absolute top-2 right-2 text-red-500 text-2xl hover:text-red-600">
            <ImCancelCircle />
          </Link>
          <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-red-500 text-transparent bg-clip-text mb-4">
            Body & Skin Care
          </h1>
        </div>

        {/* Shampoos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Shampoos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginate(shampoos, shampooPage, SHAMPOOS_PER_PAGE).map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
          <Pagination
            page={shampooPage}
            setPage={setShampooPage}
            perPage={SHAMPOOS_PER_PAGE}
            total={shampoos.length}
          />
        </section>

        {/* Facewashes */}
        <section>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Facewashes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginate(facewashes, facewashPage, FACEWASHES_PER_PAGE).map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
          <Pagination
            page={facewashPage}
            setPage={setFacewashPage}
            perPage={FACEWASHES_PER_PAGE}
            total={facewashes.length}
          />
        </section>
      </div>
    </>
  );
};

export default Cleaning;
