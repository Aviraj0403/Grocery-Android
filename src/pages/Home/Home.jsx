import React from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../Product/ProductGrid.jsx";

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Banner */}
      <section className="relative bg-green-100 text-center py-16 px-4 rounded-b-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 animate-fade-in-up">
          Welcome to Shanu-Mart
        </h1>
        <p className="text-lg md:text-xl text-green-700 max-w-2xl mx-auto mb-6 animate-fade-in-up delay-100">
          Discover fresh groceries, daily deals, and quick delivery — all at your fingertips!
        </p>
        <Link to="/shop">
          <button className="bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md animate-fade-in-up delay-200">
            Shop Now
          </button>
        </Link>
      </section>

      {/* Categories Preview */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1>Tiwari ji add here catogiroies section </h1>
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Browse Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[
            { name: "Fruits", img: "../../images/fruits.png" },
            { name: "Vegetables", img: "/images/vegetables.png" },
            { name: "Dairy", img: "/images/dairy.png" },
            { name: "Bakery", img: "/images/bakery.png" },
          ].map((cat, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center"
            >
              <img src={cat.img} alt={cat.name} className="w-20 h-20 object-contain mb-3" />
              <span className="text-green-700 font-medium">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-12">
        Tiwari ji add here product section
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Featured Products</h2>

       <ProductGrid />
      </section>
      <h1>add here some banner attractive</h1>

   
      {/* Call to Action */}
      <section className="text-center py-12 bg-white">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Stay Updated with Our Offers</h3>
        <Link to="/contact">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-all">
            Contact Us
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
