import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

const groceryData = {
  "Hair Oil": [
    { id: "h1", name: "Navratna Oil", price: 3.99, image: "/images/navratna.jpg" },
    { id: "h2", name: "Parachute", price: 2.49, image: "/images/parachute.jpg" },
    { id: "h3", name: "Indulekha", price: 5.49, image: "/images/indulekha.jpg" },
    { id: "h4", name: "Bajaj Almond", price: 3.19, image: "/images/bajaj.jpg" },
    { id: "h5", name: "Dabur Amla", price: 2.99, image: "/images/amla.jpg" },
  ],
  "Face Cream": [
    { id: "f1", name: "Fair & Lovely", price: 2.99, image: "/images/fair.jpg" },
    { id: "f2", name: "Ponds Cream", price: 3.25, image: "/images/ponds.jpg" },
    { id: "f3", name: "Nivea Soft", price: 3.99, image: "/images/nivea.jpg" },
    { id: "f4", name: "Himalaya Cream", price: 2.75, image: "/images/himalaya.jpg" },
  ],
  Sugar: [
    { id: "s1", name: "White Sugar", price: 1.49, image: "/images/sugar.jpg" },
    { id: "s2", name: "Brown Sugar", price: 1.79, image: "/images/brownsugar.jpg" },
    { id: "s3", name: "Organic Sugar", price: 2.09, image: "/images/organicsugar.jpg" },
  ],
  "Cooking Oil": [
    { id: "o1", name: "Refined Oil", price: 4.99, image: "/images/refined.jpg" },
    { id: "o2", name: "Mustard Oil", price: 5.25, image: "/images/mustard.jpg" },
    { id: "o3", name: "Groundnut Oil", price: 6.15, image: "/images/groundnut.jpg" },
    { id: "o4", name: "Sunflower Oil", price: 5.75, image: "/images/sunflower.jpg" },
  ],
};

const ShopNow = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState({});

  const handleAdd = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const handleRemove = (id) =>
    setCart((c) => {
      const newCart = { ...c };
      if (newCart[id] > 1) newCart[id]--;
      else delete newCart[id];
      return newCart;
    });

  const filteredData =
    selectedCategory === "All"
      ? Object.entries(groceryData)
      : [[selectedCategory, groceryData[selectedCategory]]];

  return (
    <div className="bg-gradient-to-b from-slate-100 to-green-50 min-h-screen p-4">
        <Link to={"/"}>
      <h1 className="text-2xl font-bold text-center mb-6 text-green-700">
        Shop Now - Grocery
      </h1>
      </Link>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3 py-1 text-sm rounded-full border ${
            selectedCategory === "All"
              ? "bg-green-500 text-white"
              : "bg-white hover:bg-green-100"
          }`}
        >
          All
        </button>
        {Object.keys(groceryData).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 text-sm rounded-full border ${
              selectedCategory === category
                ? "bg-green-500 text-white"
                : "bg-white hover:bg-green-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Rows */}
      {/* Product Rows */}
{filteredData.map(([category, items]) => (
  <div key={category} className="mb-8">
    <h2 className="text-lg font-semibold mb-2">{category}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow-md p-3 text-center border border-transparent hover:border-green-400 hover:shadow-lg transform transition-all duration-200"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover mx-auto mb-2 rounded-full"
          />
          <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
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
              <span className="text-sm bg-green-100 text-green-800 px-2 rounded font-semibold">
                {cart[item.id]}
              </span>
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
              className="mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded-full hover:bg-red-500 transition"
            >
              Add
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
))}

    </div>
  );
};

export default ShopNow;
