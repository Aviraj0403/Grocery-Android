import React from "react";
import { Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const AboutUs = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-yellow-100 p-6">
    <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-3xl w-full text-center transition-transform duration-500 hover:scale-105">
      <Link to={"/"} className="flex items-center justify-start mb-6 hover:text-green-500 transition-colors duration-300">
        <IoArrowBackCircleOutline className="text-4xl text-green-700 mr-2" />
        <h1 className="text-4xl font-bold text-green-700">
          About Us
        </h1>
      </Link>

      <h2 className="text-gray-700 text-lg leading-relaxed hover:text-gray-900 transition-colors duration-300">
        At <span className="font-semibold text-green-700">Shanu-Mart</span>, we believe that good food is the foundation
        of a happy, healthy life. That's why we’re committed to bringing you
        the freshest fruits, vegetables, pantry essentials, and more — straight
        from trusted farms and suppliers. We’re passionate about quality,
        sustainability, and service. Whether you're shopping for everyday meals
        or special occasions, our selection is curated to offer you the best,
        every time. Freshness you can trust, quality you can taste — welcome to
        <span className="font-semibold text-green-700"> Shanu-Mart</span>, your neighborhood's favorite grocery destination.
      </h2>
    </div>
  </section>
  );
};

export default AboutUs;
