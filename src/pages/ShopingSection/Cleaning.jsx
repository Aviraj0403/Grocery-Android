import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { Link } from "react-router-dom";

// Product data
const shampoos = [
  { id: 's1', name: 'Head & Shoulders', price: 4.99, image: '/images/hns.jpg' },
  { id: 's2', name: 'Pantene Pro-V', price: 5.49, image: '/images/pantene.jpg' },
  { id: 's3', name: 'Dove Intense Repair', price: 6.29, image: '/images/dove.jpg' },
  { id: 's4', name: 'Sunsilk Black Shine', price: 4.79, image: '/images/sunsilk.jpg' },
  { id: 's5', name: 'Clinic Plus', price: 3.99, image: '/images/clinicplus.jpg' },
  { id: 's6', name: 'Tresemme Keratin', price: 6.99, image: '/images/tresemme.jpg' },
  { id: 's7', name: 'L’Oreal Paris', price: 7.49, image: '/images/loreal.jpg' },
];

const facewashes = [
  { id: 'f1', name: 'Himalaya Neem Facewash', price: 3.99, image: '/images/himalaya.jpg' },
  { id: 'f2', name: 'Garnier Men OilClear', price: 4.25, image: '/images/garnier.jpg' },
  { id: 'f3', name: 'Pond’s Pure White', price: 3.75, image: '/images/ponds.jpg' },
  { id: 'f4', name: 'Nivea Men Dark Spot', price: 4.50, image: '/images/nivea.jpg' },
  { id: 'f5', name: 'Clean & Clear', price: 3.95, image: '/images/cleanandclear.jpg' },
];

const Cleaning = () => {
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [shampooPage, setShampooPage] = useState(1);
  const [facewashPage, setFacewashPage] = useState(1);
  const [loadingSection, setLoadingSection] = useState("");

  const shampoosPerPage = 6;
  const facewashesPerPage = 4;

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

  const handlePageChange = (section, pageSetter, page) => {
    setLoadingSection(section);
    setTimeout(() => {
      pageSetter(page);
      setLoadingSection("");
    }, 500);
  };

  const renderCard = (item) => (
    <motion.div
      key={item.id}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-36 h-45 bg-white rounded-xl shadow-md p-2 flex flex-col items-center text-center border border-gray-100 hover:border-green-500 relative"
    >
      <button
        onClick={() => toggleWishlist(item.id)}
        className={`absolute top-1 right-1 p-1 rounded-full ${
          wishlist[item.id] ? "text-red-500" : "text-gray-400"
        } hover:text-red-500 transition`}
      >
        <FaHeart className="w-4 h-4" />
      </button>

      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mb-1 rounded-full border" />
      <h3 className="text-xs font-semibold text-gray-800">{item.name}</h3>
      <p className="text-green-600 font-bold text-sm mb-1">${item.price.toFixed(2)}</p>

      {cart[item.id] ? (
        <div className="flex items-center gap-1 mt-1">
          <button
            onClick={() => handleRemove(item.id)}
            className="px-2 py-0.5 bg-red-500 text-white text-xs rounded"
          >
            -
          </button>
          <span className="text-sm">{cart[item.id]}</span>
          <button
            onClick={() => handleAdd(item.id)}
            className="px-2 py-0.5 bg-green-500 text-white text-xs rounded"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => handleAdd(item.id)}
          className="mt-1 bg-green-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-500 transition"
        >
          Add to cart
        </button>
      )}
    </motion.div>
  );

  const paginateControls = (page, setPage, perPage, totalItems, sectionName) => {
    const totalPages = Math.ceil(totalItems / perPage);
    return (
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => handlePageChange(sectionName, setPage, Math.max(page - 1, 1))}
          disabled={page === 1 || loadingSection === sectionName}
          className="px-4 py-1 bg-slate-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(sectionName, setPage, Math.min(page + 1, totalPages))}
          disabled={page === totalPages || loadingSection === sectionName}
          className="px-4 py-1 bg-slate-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  const paginatedShampoos = shampoos.slice(
    (shampooPage - 1) * shampoosPerPage,
    shampooPage * shampoosPerPage
  );

  const paginatedFacewashes = facewashes.slice(
    (facewashPage - 1) * facewashesPerPage,
    facewashPage * facewashesPerPage
  );

  return (
    <>
      <marquee className="text-sm text-white bg-slate-500 py-2 font-semibold tracking-wide">
        🎉 Get 2% on selected skin-care! Limited time offer 🎉
      </marquee>

      <div className="px-4 py-6 max-w-6xl mx-auto">
        <Link to="/">
          <div className="relative">
            <ImCancelCircle className="absolute top-2 right-2 text-xl text-red-500 hover:text-red-600 cursor-pointer transition-all" />
            <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-500 drop-shadow-lg mb-6">
              Body & Skin Care
            </h1>
          </div>
        </Link>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Shampoos</h2>
          {loadingSection === "shampoo" ? (
            <div className="text-center text-blue-600 font-semibold animate-pulse">Loading Shampoos...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {paginatedShampoos.map(renderCard)}
            </div>
          )}
          {paginateControls(shampooPage, setShampooPage, shampoosPerPage, shampoos.length, "shampoo")}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Facewashes</h2>
          {loadingSection === "facewash" ? (
            <div className="text-center text-blue-600 font-semibold animate-pulse">Loading Facewashes...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {paginatedFacewashes.map(renderCard)}
            </div>
          )}
          {paginateControls(facewashPage, setFacewashPage, facewashesPerPage, facewashes.length, "facewash")}
        </section>
      </div>
    </>
  );
};

export default Cleaning;
