import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { Link } from "react-router-dom";

const teaCoffeeData = {
  Tea: [
    { id: "t1", name: "Tata Tea Gold", price: 2.99, image: "/images/tata.jpg" },
    { id: "t2", name: "Brooke Bond", price: 3.49, image: "/images/brooke.jpg" },
    { id: "t3", name: "Wagh Bakri", price: 3.19, image: "/images/waghbakri.jpg" },
    { id: "t4", name: "Society Tea", price: 3.89, image: "/images/society.jpg" },
    { id: "t5", name: "Green Tea", price: 4.59, image: "/images/greentea.jpg" },
  ],
  Coffee: [
    { id: "c1", name: "Nescafe", price: 4.99, image: "/images/nescafe.jpg" },
    { id: "c2", name: "Bru Coffee", price: 5.25, image: "/images/bru.jpg" },
    { id: "c3", name: "Rage Coffee", price: 6.25, image: "/images/rage.jpg" },
    { id: "c4", name: "Continental", price: 4.75, image: "/images/continental.jpg" },
    { id: "c5", name: "Davidoff", price: 7.25, image: "/images/davidoff.jpg" },
  ],
  Drinks: [
    { id: "d1", name: "Coca Cola", price: 1.99, image: "/images/coke.jpg" },
    { id: "d2", name: "Pepsi", price: 1.89, image: "/images/pepsi.jpg" },
    { id: "d3", name: "Sprite", price: 1.79, image: "/images/sprite.jpg" },
    { id: "d4", name: "Fanta", price: 1.85, image: "/images/fanta.jpg" },
    { id: "d5", name: "Limca", price: 1.75, image: "/images/limca.jpg" },
  ],
};

const TeaCoffe = () => {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const allItems = Object.values(teaCoffeeData).flat();
  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [page]);

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

  const paginatedItems = allItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen px-4 py-6 max-w-5xl mx-auto">
      <Link to="/" className="block relative mb-6">
        <ImCancelCircle className="absolute top-2 right-0 text-xl text-gray-600 hover:text-red-500 transition cursor-pointer" />
        <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-500">
          Tea, Coffee & Drinks
        </h1>
      </Link>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white border rounded-xl shadow-sm p-4 text-center hover:border-green-500 transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-full mx-auto mb-3"
            />
            <h3 className="text-sm font-semibold text-gray-700">{item.name}</h3>
            <p className="text-green-600 text-sm font-bold">${item.price.toFixed(2)}</p>
            {cart[item.id] ? (
              <div className="flex items-center justify-center gap-2 mt-2">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-1 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                >
                  <FaMinus />
                </button>
                <span className="text-sm">{cart[item.id]}</span>
                <button
                  onClick={() => handleAdd(item.id)}
                  className="p-1 bg-green-500 text-white rounded-full text-xs hover:bg-green-600"
                >
                  <FaPlus />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleAdd(item.id)}
                className="mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded-full hover:bg-red-500 transition"
              >
                Add to cart
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm font-semibold text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TeaCoffe;
