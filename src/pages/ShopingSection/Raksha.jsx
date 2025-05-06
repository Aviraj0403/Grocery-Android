import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const products = [
  { id: 1, name: "Traditional Rakhi", image: "/images/rakhi1.jpg", price: "₹99" },
  { id: 2, name: "Bhaiya-Bhabhi Rakhi Set", image: "/images/rakhi2.jpg", price: "₹199" },
  { id: 3, name: "Designer Pearl Rakhi", image: "/images/rakhi3.jpg", price: "₹149" },
  { id: 4, name: "Kidz Cartoon Rakhi", image: "/images/rakhi4.jpg", price: "₹89" },
  { id: 5, name: "Handcrafted Rakhi", image: "/images/rakhi5.jpg", price: "₹129" },
  { id: 6, name: "Silver Plated Rakhi", image: "/images/rakhi6.jpg", price: "₹249" },
  { id: 7, name: "Eco-Friendly Rakhi", image: "/images/rakhi7.jpg", price: "₹119" },
  { id: 8, name: "Zardosi Rakhi", image: "/images/rakhi8.jpg", price: "₹179" },
  { id: 9, name: "Photo Rakhi", image: "/images/rakhi9.jpg", price: "₹159" },
  { id: 10, name: "Lumba Rakhi", image: "/images/rakhi10.jpg", price: "₹139" },
];

const ITEMS_PER_PAGE = 8;

const Raksha = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddToCart = (product) => toast.success(`${product.name} added to cart!`);
  const handleNavigate = () => { setLoading(true); setTimeout(() => navigate("/gift"), 500); };

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setLoading(false);
    }, 500);
  };

  return (
    <>
     <marquee className="text-sm text-white bg-pink-500 py-2 font-semibold tracking-wide">
     Distance can never break the bond we share. Happy Raksha Bandhan!
      </marquee>
    <div className="bg-pink-50 py-10 px-4 relative">
        <Link to={"/"}>
      <h2 className="text-3xl font-bold text-pink-700 text-center mb-8">Raksha Bandhan Specials</h2>
      </Link>
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex justify-center items-center z-50">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="relative bg-white rounded-2xl shadow-md p-4 border border-pink-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center">
            <button className="absolute top-2 right-2 text-pink-400 hover:text-pink-600 text-xl">❤</button>
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-xl mb-3" />
            <h3 className="text-pink-600 font-semibold text-sm mb-1">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.price}</p>
            <button onClick={() => handleAddToCart(product)} className="mt-auto bg-pink-500 text-white px-4 py-1 rounded-full text-sm hover:bg-pink-600 transition-colors duration-300">Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button key={idx} onClick={() => handlePageChange(idx + 1)} disabled={loading} className={`px-3 py-1 rounded-full border ${currentPage === idx + 1 ? 'bg-pink-600 text-white' : 'bg-white text-pink-600 border-pink-600'} hover:bg-pink-500 hover:text-white transition-colors duration-300 disabled:opacity-50`}>
            {idx + 1}
          </button>
        ))}
      </div>

      <ToastContainer position="top-right" />

      <button onClick={handleNavigate} className="fixed bottom-6 right-6 bg-white text-pink-600 border border-pink-400 px-4 py-2 rounded-full shadow-md hover:bg-pink-500 hover:text-white hover:shadow-lg transition-all duration-300 z-50">
        Move to Gift Section
      </button>
    </div>
    </>
  );
};

export default Raksha;
