import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";

const data = {
  Tea: [
    { id: "t1", name: "Tata Tea Gold", price: 2.99, image: "/images/tata.jpg" },
    { id: "t2", name: "Brooke Bond", price: 3.49, image: "/images/brooke.jpg" },
    {
      id: "t3",
      name: "Wagh Bakri",
      price: 3.19,
      image: "/images/waghbakri.jpg",
    },
    {
      id: "t4",
      name: "Society Tea",
      price: 3.89,
      image: "/images/society.jpg",
    },
    { id: "t5", name: "Green Tea", price: 4.59, image: "/images/greentea.jpg" },
  ],
  Coffee: [
    { id: "c1", name: "Nescafe", price: 4.99, image: "/images/nescafe.jpg" },
    { id: "c2", name: "Bru Coffee", price: 5.25, image: "/images/bru.jpg" },
    { id: "c3", name: "Rage Coffee", price: 6.25, image: "/images/rage.jpg" },
    {
      id: "c4",
      name: "Continental",
      price: 4.75,
      image: "/images/continental.jpg",
    },
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
  const handleAdd = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const handleRemove = (id) =>
    setCart((c) => {
      const newCart = { ...c };
      if (newCart[id] > 1) newCart[id]--;
      else delete newCart[id];
      return newCart;
    });

  return (
    
    <div className="bg-slate-100 min-h-screen px-4 py-6 max-w-7xl mx-auto">
      <Link to={"/"}>
              <div className="relative">
                <ImCancelCircle className="absolute top-2 right-0 text-xl text-gray-600 hover:text-red-500 cursor-pointer transition-all text-red-500" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-500 drop-shadow-lg mb-6">
                Tea, Coffee & Drinks
                </h1>
              </div>
            </Link>

      {Object.entries(data).map(([category, items]) => (
        <section key={category} className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{category}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <motion.div
                whileHover={{ scale: 1.03 }}
                key={item.id}
                className="bg-white rounded-lg shadow p-3 text-center border hover:border-green-500"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
                />
                <h3 className="text-sm font-medium text-gray-700">
                  {item.name}
                </h3>
                <p className="text-green-600 text-sm font-semibold">
                  ${item.price.toFixed(2)}
                </p>
                {cart[item.id] ? (
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-1 bg-red-500 text-white rounded text-xs"
                    >
                      <FaMinus />
                    </button>
                    <span className="text-sm">{cart[item.id]}</span>
                    <button
                      onClick={() => handleAdd(item.id)}
                      className="p-1 bg-green-500 text-white rounded text-xs"
                    >
                      <FaPlus />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAdd(item.id)}
                    className="mt-2 px-2 py-1 bg-green-600 text-white text-xs rounded-full hover:bg-red-500"
                  >
                    Add
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default TeaCoffe;
