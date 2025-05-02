import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import banner from "../../assets/fashwash4.png"
import { Link } from 'react-router-dom';
import { ImCancelCircle } from "react-icons/im";

// import { Slide, Zoom } from 'react-toastify';
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

  const shampoosPerPage = 6;
  const facewashesPerPage = 4;

  const handleAdd = (id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemove = (id) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
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
        className={`absolute top-1 right-1 p-1 rounded-full ${wishlist[item.id] ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition`}
      >
        <FaHeart className="w-4 h-4" />
      </button>
  
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mb-1 rounded-full border" />
      <h3 className="text-xs font-semibold text-gray-800">{item.name}</h3>
      <p className="text-green-600 font-bold text-sm mb-1">${item.price.toFixed(2)}</p>
  
      {cart[item.id] ? (
        <div className="flex items-center gap-1 mt-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleRemove(item.id)}
            className="px-2 py-0.5 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
          >
            -
          </motion.button>
          <span className="text-sm">{cart[item.id]}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAdd(item.id)}
            className="px-2 py-0.5 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition"
          >
            +
          </motion.button>
        </div>
      ) : (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAdd(item.id)}
          className="mt-1 bg-green-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-500 transition"
        >
          Add to cart
        </motion.button>
      )}
    </motion.div>
  );

  const paginate = (currentPage, setPage, itemsPerPage, totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border rounded disabled:opacity-50 bg-slate-500 text-white hover:bg-blue-500"
        >
          Prev
        </button>
        <span className="text-sm font-medium text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border rounded disabled:opacity-50 bg-slate-500 text-white hover:bg-blue-500"
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
      🎉 Get 2% on selected skin-care ! Limited time offer 🎉
    </marquee>
    <div className="px-4 py-6 max-w-6xl mx-auto">
        <Link to={"/"}>
       <div className="relative">
                <ImCancelCircle className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-500 cursor-pointer transition-all text-red-500" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-500 drop-shadow-lg mb-6">
                  Body & Skin Care
                </h1>
              </div>
      </Link>
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Shampoos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {paginatedShampoos.map(renderCard)}
        </div>
        {paginate(shampooPage, setShampooPage, shampoosPerPage, shampoos.length)}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Facewashes</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {paginatedFacewashes.map(renderCard)}
        </div>
        {paginate(facewashPage, setFacewashPage, facewashesPerPage, facewashes.length)}
      </section>
    </div>
    </>
  );
};

export default Cleaning;
