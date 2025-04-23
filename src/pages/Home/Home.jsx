import React from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../Product/ProductGrid.jsx";
import { Slide } from "react-awesome-reveal";
// import abouticon from "../assets/about.svg";
import aboutImage from "../../assets/about.svg";
import adbanner from "../../assets/apple.png";
// import { Zoom } from "react-toastify";
import { FaEye, FaHeart, FaStar } from "react-icons/fa";

// import logo from '..\assets\logo2.png'

const products = [
  { id: 1, name: "Apple", price: "70", image: "/images/apple.png" },
  { id: 2, name: "Milk", price: "60", image: "/images/milk.png" },
  { id: 3, name: "Bread", price: "50", image: "/images/bread.png" },
  { id: 4, name: "Carrots", price: "40", image: "/images/carrots.png" },
  { id: 4, name: "Carrots", price: "40", image: "/images/carrots.png" },
  { id: 4, name: "Carrots", price: "40", image: "/images/carrots.png" },
  { id: 4, name: "Carrots", price: "40", image: "/images/carrots.png" },
  { id: 4, name: "Carrots", price: "40", image: "/images/carrots.png" },

];

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Banner */}

      <section className="relative bg-green-100 text-center py-16 px-4 rounded-b-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 animate-fade-in-up">
          <Slide direction="right">Welcome to Shanu-Mart</Slide>
        </h1>
        <p className="text-lg md:text-xl text-green-700 max-w-2xl mx-auto mb-6 animate-fade-in-up delay-100">
          Discover fresh groceries, daily deals, and quick delivery — all at
          your fingertips!
        </p>
        <Link to="/shop">
          <button className="bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md animate-fade-in-up delay-200">
            Shop Now
          </button>
        </Link>
      </section>
      

      {/* grab first offer*/}
      {/* relative bg-green-100 text-center py-16 px-4 rounded-b-3xl */}
   

      <section className="pt-2 py-16 px-4 rounded-b-3xl">
        <div className="max-w-8xl">
          <Slide direction="down">
            <div className="bg-neutral-200 rounded-xl shadow p-6 flex flex-col lg:flex-row items-center lg:items-center text-center lg:text-left space-y-0 lg:space-x-10 w-80 sm:w-[22rem] md:w-[26rem] lg:w-[90%] lg:h-75 mx-auto">
              {/* Image (Top on mobile, Left on desktop) */}
              <div className="flex-shrink-0">
                <img
                  src={aboutImage}
                  alt="about-icon"
                  className="w-32 h-32 object-contain mx-auto lg:mx-0"
                />
              </div>

              {/* Text + Button (Bottom on mobile, Right on desktop) */}
              <div className="flex flex-col justify-center items-center lg:items-start space-y-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    Welcome to Shanu-Mart
                  </h1>
                  <p>
                    Download the app and get free food &{" "}
                    <span className="text-green-600 font-semibold">₹50</span>{" "}
                    off on your first order.
                  </p>
                </div>

                <Link
                  to="#"
                  className="bg-green-700 text-white px-5 py-2 rounded hover:bg-green-800 transition"
                >
                  Grab Your First Offer
                </Link>
              </div>
            </div>
          </Slide>
        </div>
      </section>

      {/* cashback and offer section */}
      <section className=" px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Banner 1 */}

          <Slide direction="left">
            <div className="relative bg-orange-200 rounded shadow overflow-hidden w-[90%] max-w-sm mx-auto lg:max-w-full h-64 lg:h-auto flex lg:flex-row items-stretch">
              {/* Text Content */}
              <div className="absolute bottom-2 left-2 lg:static lg:flex-1 p-4 text-left flex flex-col justify-center items-start z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                  10% cashback on <br /> personal care
                </h3>
                <div className="text-xs sm:text-sm text-gray-700 mb-3">
                  <p className="mb-1">Max cashback: $12</p>
                  <span>
                    Code:{" "}
                    <span className="font-semibold text-black">CARE12</span>
                  </span>
                </div>

                <Slide direction="right">
                  <Link
                    to="#"
                    className="bg-slate-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded w-fit hover:bg-white hover:text-orange-300 transition-all duration-1000"
                  >
                    Shop Now
                  </Link>
                </Slide>
              </div>

              {/* Image Section */}
              <div className="absolute bottom-2 right-2 lg:static p-2 sm:p-4 w-24 h-24 sm:w-1/2 sm:h-60 lg:h-auto z-0">
                <img
                  src={adbanner}
                  alt="ad-banner-1"
                  className="object-cover rounded-3 w-full h-full max-w-[200px] max-h-[200px] sm:max-w-full sm:max-h-full"
                />
              </div>
            </div>
          </Slide>

          {/* banner 2 */}
          <Slide direction="up">
            <div className="relative bg-yellow-200 rounded shadow overflow-hidden w-[90%] max-w-sm mx-auto lg:max-w-full h-64 lg:h-auto flex lg:flex-row items-stretch">
              {/* Text Content */}
              <div className="absolute bottom-2 left-2 lg:static lg:flex-1 p-4 text-left flex flex-col justify-center items-start z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                  10% cashback on <br /> personal care
                </h3>
                <div className="text-xs sm:text-sm text-gray-700 mb-3">
                  <p className="mb-1">Max cashback: $12</p>
                  <span>
                    Code:{" "}
                    <span className="font-semibold text-black">CARE12</span>
                  </span>
                </div>

                <Slide direction="right">
                  <Link
                    to="#"
                    className="bg-slate-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded w-fit hover:bg-white hover:text-orange-300 transition-all duration-1000"
                  >
                    Shop Now
                  </Link>
                </Slide>
              </div>

              {/* Image Section */}
              <div className="absolute bottom-2 right-2 lg:static p-2 sm:p-4 w-24 h-24 sm:w-1/2 sm:h-60 lg:h-auto z-0">
                <img
                  src={adbanner}
                  alt="ad-banner-1"
                  className="object-cover rounded-3 w-full h-full max-w-[200px] max-h-[200px] sm:max-w-full sm:max-h-full"
                />
              </div>
            </div>
          </Slide>

          {/* banner 3 */}
          <Slide direction="right">
            <div className="relative bg-green-200 rounded shadow overflow-hidden w-[90%] max-w-sm mx-auto lg:max-w-full h-64 lg:h-auto flex lg:flex-row items-stretch">
              {/* Text Content */}
              <div className="absolute bottom-2 left-2 lg:static lg:flex-1 p-4 text-left flex flex-col justify-center items-start z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                  10% cashback on <br /> personal care
                </h3>
                <div className="text-xs sm:text-sm text-gray-700 mb-3">
                  <p className="mb-1">Max cashback: $12</p>
                  <span>
                    Code:{" "}
                    <span className="font-semibold text-black">CARE12</span>
                  </span>
                </div>

                <Slide direction="right">
                  <Link
                    to="#"
                    className="bg-slate-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded w-fit hover:bg-white hover:text-orange-300 transition-all duration-1000"
                  >
                    Shop Now
                  </Link>
                </Slide>
              </div>

              {/* Image Section */}
              <div className="absolute bottom-2 right-2 lg:static p-2 sm:p-4 w-24 h-24 sm:w-1/2 sm:h-60 lg:h-auto z-0">
                <img
                  src={adbanner}
                  alt="ad-banner-1"
                  className="object-cover rounded-3 w-full h-full max-w-[200px] max-h-[200px] sm:max-w-full sm:max-h-full"
                />
              </div>
            </div>
          </Slide>
        </div>
      </section>

      {/* Categories Preview */}

      <section className="max-w-7xl mx-auto px-5 py-9">
        {/* <h1>Tiwari ji add here catogiroies section </h1> */}
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center cursor-pointer hover:text-green-400">
          Browse Categories
        </h2>
        <Slide direction="right">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 cursor-pointer">
            {[
              { name: "Aata,Rice & Dal", img: "/assets/logo2.png" },
              { name: "instant Food", img: "/images/vegetables.png" },
              { name: "Dairy & Bread", img: "/images/dairy.png" },
              { name: "Tea & coffee", img: "/images/bakery.png" },
              { name: "baby-care", img: "../../images/fruits.png" },
              { name: "snack & Munchies", img: "/images/vegetables.png" },
              { name: "Cleaning Essentials", img: "/images/vegetables.png" },
              { name: "Bakery & Biscuits", img: "/images/vegetables.png" },
              { name: "Bath & skin-care", img: "/images/vegetables.png" },
            ].map((cat, i) => (
              <div
                key={i}
                className="min-w-[140px] bg-slate-200 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105 p-4 flex flex-col items-center flex-shrink-0"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-20 h-20 object-contain mb-2"
                />
                <span className="text-green-700 font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </Slide>
      </section>

      {/* extra feature */}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Fruits & Vegetables Banner */}
            <div className="w-full lg:w-1/2 bg-orange-200 rounded">
              <Slide direction="left">
                <div className="rounded-2xl h-full flex flex-col-reverse sm:flex-row-reverse lg:flex-row p-0">
                  {/* Background Image */}
                  <div
                    className="w-full sm:w-1/3 h-32 sm:h-40 flex justify-center items-center sm:items-center"
                    style={{
                      background: `url(${aboutImage}) no-repeat center`,
                      backgroundSize: "contain", // Adjusts image to fit inside
                    }}
                  ></div>

                  {/* Text Content */}
                  <div className="w-full sm:w-2/3 p-4 flex items-end justify-start sm:items-center sm:justify-center">
                    <div className="text-black max-w-sm text-left">
                      <h3 className="text-2xl font-bold mb-2">
                        Fruits & Vegetables
                      </h3>
                      <p className="mb-4 text-lg">
                        Get Upto <span className="font-semibold">20%</span> Off
                      </p>
                      <Link
                        to="#"
                        className="inline-block bg-gray-900 text-white px-5 py-2 rounded-md font-medium hover:bg-gray-800 transition"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </Slide>
            </div>

            {/* Freshly Baked Buns Banner */}
            <div className="w-full lg:w-1/2 bg-slate-200 rounded">
              <Slide direction="left">
                <div className="rounded-2xl h-full flex flex-col-reverse sm:flex-row-reverse lg:flex-row p-0">
                  {/* Background Image */}
                  <div
                    className="w-full sm:w-1/3 h-32 sm:h-40 flex justify-center items-center sm:items-center"
                    style={{
                      background: `url(${aboutImage}) no-repeat center`,
                      backgroundSize: "contain", // Adjusts image to fit inside
                    }}
                  ></div>

                  {/* Text Content */}
                  <div className="w-full sm:w-2/3 p-4 flex items-end justify-start sm:items-center sm:justify-center">
                    <div className="text-black max-w-sm text-left">
                      <h3 className="text-2xl font-bold mb-2">
                        FreshBaked & Bunes
                      </h3>
                      <p className="mb-4 text-lg">
                        Get Upto <span className="font-semibold">30%</span> Off
                      </p>
                      <Link
                        to="#"
                        className="inline-block bg-gray-900 text-white px-5 py-2 rounded-md font-medium hover:bg-gray-800 transition"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </Slide>
            </div>
          </div>
        </div>
      </section>

      {/* featured products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Featured Products
        </h2>

        <ProductGrid />
      </section>

      <h1>add here some banner attractive</h1>

      {/* chat gpt code */}

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 relative">
            Popular Products
            <span className="block w-16 h-1 bg-orange-500 mx-auto mt-2 rounded-full"></span>
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {Array.isArray(products) &&
              products.map((product) => (
                <div
                  key={product.id}
                  className={`relative w-64 border rounded-lg p-4 bg-white hover:shadow-lg transition-all duration-300 ${
                    product.highlight
                      ? "border-green-500 shadow-md"
                      : "border-gray-200"
                  }`}
                >
                  {/* Badge */}
                  {product.label && (
                    <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 bg-red-500 text-white rounded-full">
                      {product.label}
                    </span>
                  )}

                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-contain mb-3"
                  />

                  {/* Category */}
                  <p className="text-sm text-gray-500">
                    {product.category || "Category"}
                  </p>

                  {/* Name */}
                  <h3 className="font-semibold text-base mb-1">
                    {product.name || "Product Name"}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center text-yellow-500 text-sm mb-2">
                    {Number.isFinite(product.rating) &&
                      [...Array(Math.floor(product.rating))].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    <span className="text-gray-600 ml-2">
                      {product.rating ?? 0} ({product.reviews ?? 0})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="font-bold text-lg text-gray-800">
                      {product.price ?? 0}
                    </span>
                    {product.originalPrice && (
                      <span className="line-through text-sm text-gray-400">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Action Icons */}
                  {product.highlight && (
                    <div className="absolute top-2 right-2 flex flex-col space-y-2 bg-white p-2 rounded shadow">
                      <FaEye className="text-gray-600 hover:text-blue-500 cursor-pointer" />
                      <FaHeart className="text-gray-600 hover:text-red-500 cursor-pointer" />
                    </div>
                  )}

                  {/* Add Button */}
                  <button className="w-full mt-auto bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                    Add to cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-white">
        <h3 className="text-xl font-semibold text-green-700 mb-4">
          Stay Updated with Our Offers
        </h3>
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
