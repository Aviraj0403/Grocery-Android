import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import sunnyimg from "../../assets/cooffe.jpg"

const groceryData = {
  "Hair Oil": [
    { id: "h1", name: "Navratna Oil", price: 3.99, image: sunnyimg },
    { id: "h2", name: "Parachute", price: 2.49, image: sunnyimg },
    { id: "h3", name: "Indulekha", price: 5.49, image: sunnyimg },
    { id: "h4", name: "Bajaj Almond", price: 3.19, image: sunnyimg },
    { id: "h5", name: "Dabur Amla", price: 2.99, image: sunnyimg },
  ],
  "Face Cream": [
    { id: "f1", name: "Fair & Lovely", price: 2.99, image: sunnyimg },
    { id: "f2", name: "Ponds Cream", price: 3.25, image: sunnyimg },
    { id: "f3", name: "Nivea Soft", price: 3.99, image: sunnyimg },
    { id: "f4", name: "Himalaya Cream", price: 2.75, image: sunnyimg },
  ],
  Sugar: [
    { id: "s1", name: "White Sugar", price: 1.49, image: sunnyimg },
    { id: "s2", name: "Brown Sugar", price: 1.79, image: sunnyimg },
    { id: "s3", name: "Organic Sugar", price: 2.09, image: sunnyimg },
  ],
  "Cooking Oil": [
    { id: "o1", name: "Refined Oil", price: 4.99, image: sunnyimg },
    { id: "o2", name: "Mustard Oil", price: 5.25, image: sunnyimg },
    { id: "o3", name: "Groundnut Oil", price: 6.15, image: sunnyimg },
    { id: "o4", name: "Sunflower Oil", price: 5.75, image: sunnyimg },
  ],
};

const ShopNow = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({});

  const categories = Object.keys(groceryData);

  const filteredItems =
    selectedCategory === "All"
      ? categories.flatMap((cat) => groceryData[cat])
      : groceryData[selectedCategory];

  const handleCategoryChange = (category) => {
    setLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setLoading(false), 400);
  };

  const handleAdd = (id) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const handleRemove = (id) =>
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) updated[id]--;
      else delete updated[id];
      return updated;
    });

  return (
    <div className="bg-gradient-to-b from-slate-100 to-green-50 min-h-screen py-6 px-4">
      <div className="max-w-screen-xl mx-auto">
        <Link to="/">
          <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
            Shop Now - Grocery
          </h1>
        </Link>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-1.5 rounded-full text-sm border transition ${
                selectedCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-white hover:bg-green-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {loading
            ? Array.from({ length: filteredItems.length }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl shadow animate-pulse text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                </div>
              ))
            : filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow-md border hover:shadow-lg hover:border-green-400 transition text-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 mx-auto rounded-full object-cover mb-3"
                  />
                  <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                  <p className="text-green-700 font-semibold text-sm mb-2">
                    ${item.price.toFixed(2)}
                  </p>

                  {cart[item.id] ? (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="bg-red-500 text-white text-xs p-1 rounded"
                      >
                        <FaMinus />
                      </button>
                      <span className="px-2 bg-green-100 text-green-800 text-sm font-semibold rounded">
                        {cart[item.id]}
                      </span>
                      <button
                        onClick={() => handleAdd(item.id)}
                        className="bg-green-500 text-white text-xs p-1 rounded"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAdd(item.id)}
                      className="mt-2 px-4 py-1 bg-green-600 text-white text-xs rounded-full hover:bg-red-500 transition"
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ShopNow;
