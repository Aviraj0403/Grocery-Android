import React from "react";
import { Link, useNavigate } from "react-router-dom";

import ProductGrid from "../Product/ProductGrid.jsx";
import CategoriesSection from "../category/CategoriesSection.jsx";
import { Slide, Zoom } from "react-awesome-reveal";
// import abouticon from "../assets/about.svg";
import aboutImage from "../../assets/about.svg";
import adbanner from "../../assets/apple.png";
// import { Zoom } from "react-toastify";
import {
  FaEye,
  FaHeart,
  FaMoneyBillAlt,
  FaStar,
  FaTag,
  FaUndoAlt,
} from "react-icons/fa";
import Slider from "react-slick";
import coffe from "../../assets/cooffe.jpg";
import returnn from "../../assets/returns.svg";
import mobile from "../../assets/mobile.svg";
import price from "../../assets/price.svg";
import time from "../../assets/time.svg";
import mobileBanner from "../../assets/banner-mobile.jpg";
import desktopBanner from "../../assets/banner.jpg";

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
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50">
      {/* Hero Banner */}

      <section className="relative bg-green-100 text-center py-16 px-4 rounded-b-3xl">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-green-800 mb-4 animate-fade-in-up whitespace-nowrap overflow-hidden text-ellipsis">
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

      {/* return section */}

      <section className="my-2">
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 p-3 border rounded-xl border-pink-200 bg-green-50 text-sm text-gray-700 min-h-[60px]">
          <div
            className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 hover:text-green-700 sm:hover:scale-100 sm:hover:text-inherit cursor-pointer "
            onClick={() => navigate("onedayreturn")}
          >
            <FaUndoAlt className="text-green-600" />
            <span>1 Day Easy Return</span>
          </div>

          <div className="hidden sm:block border-l h-6 border-gray-300" />
          <div
            className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 hover:text-green-700 sm:hover:scale-100 sm:hover:text-inherit cursor-pointer"
            onClick={() => navigate("cashondelivery")}
          >
            <FaMoneyBillAlt className="text-green-600" />
            <span>Cash on Delivery</span>
          </div>

          <div className="hidden sm:block border-l h-6 border-gray-300" />

          <div className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 hover:text-green-700 sm:hover:scale-100 sm:hover:text-inherit cursor-pointer">
            <FaTag className="text-green-600" />
            <span>Lowest Prices</span>
          </div>
        </div>
      </section>

      {/* grab first offer*/}
      {/* relative bg-green-100 text-center py-16 px-4 rounded-b-3xl */}
      <section className="relative text-center py-16 px-4 rounded-b-3xl">
        <div className="max-w-8xl mx-auto">
          <Slide direction="down">
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col lg:flex-row items-center text-center lg:text-left space-y-6 lg:space-y-0 lg:space-x-10 w-full max-w-6xl mx-auto">
              {/* Image */}
              <div className="flex-shrink-0 animate-pulse">
                <img
                  src={aboutImage}
                  alt="about-icon"
                  className="w-32 h-32 object-contain mx-auto lg:mx-0"
                />
              </div>

              {/* Text + Button */}
              <div className="flex flex-col justify-center items-center lg:items-start space-y-4">
                <div>
                  <h1 className="text-4xl font-bold text-green-800 mb-2 animate-fade-in-up">
                    Welcome to Shanu-Mart
                  </h1>
                  <p className="text-lg text-green-700 max-w-xl animate-fade-in-up delay-100">
                    Download the app and get free food &{" "}
                    <span className="text-green-600 font-semibold">₹50</span>{" "}
                    off on your first order.
                  </p>
                </div>

                <Link to="#">
                  <button className="bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md animate-fade-in-up delay-200">
                    Grab Your First Offer
                  </button>
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
            <div className="relative bg-orange-200 rounded shadow overflow-hidden w-[90%] max-w-sm mx-auto lg:max-w-full h-53 lg:h-auto flex lg:flex-row items-stretch">
              {/* Text Content */}
              <div className=" absolute bottom-2 left-2 lg:static lg:flex-1 p-4 text-left flex flex-col justify-center items-start z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                  2% cashback on <br /> Deodorants & <br />Cleaning Essintial
                </h3>
                <div className="text-xs sm:text-sm text-gray-700 mb-3">
                  <p className="mb-1 font-semibold">Max cashback: 4%</p>
                  <span>
                    <span className="font-semibold text-black">CARE01</span>
                  </span>
                </div>

                <Slide direction="right">
                  <Link
                    to="#"
                    className="bg-slate-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded w-fit hover:bg-white hover:text-orange-300 transition-all duration-1000"
                  onClick={()=>navigate("deo")}>
                    Shop Now
                  </Link>
                </Slide>
              </div>

              {/* Image Section */}
              <div className="absolute bottom-3 right-3 lg:static p-2 sm:p-4 w-[180px] h-[180px] sm:w-1/2 sm:h-60 lg:h-auto z-0">
                <img
                  src={adbanner}
                  alt="ad-banner-1"
                  className="object-cover rounded-xl w-full h-full sm:max-w-full sm:max-h-full"
                />
              </div>
            </div>
          </Slide>

          {/* banner 2 */}
          <Zoom>
            <div className="relative bg-yellow-200 rounded shadow overflow-hidden w-[90%] max-w-sm mx-auto lg:max-w-full h-53 lg:h-auto flex lg:flex-row items-stretch">
              {/* Text Content */}
              <div className="absolute bottom-2 left-2 lg:static lg:flex-1 p-4 text-left flex flex-col justify-center items-start z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                   get discount on <br/> Body & Skin Care
                </h3>
                <div className="text-xs sm:text-sm text-gray-700 mb-3">
                  <p className="mb-1 font-semibold">Max cashback: 2%</p>
                  <span>
                    <span className="font-semibold text-black">CARE02</span>
                  </span>
                </div>

                <Slide direction="right">
                  <Link
                    to="#"
                    className="bg-slate-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded w-fit hover:bg-white hover:text-orange-300 transition-all duration-1000"
                  onClick={()=>navigate("cleaning")}>
                    Shop Now
                  </Link>
                </Slide>
              </div>

              {/* Image Section */}
              <div className="absolute bottom-3 right-3 lg:static p-2 sm:p-4 w-[180px] h-[180px] sm:w-1/2 sm:h-60 lg:h-auto z-0">
                <img
                  src={adbanner}
                  alt="ad-banner-1"
                  className="object-cover rounded-xl w-full h-full sm:max-w-full sm:max-h-full"
                />
              </div>
            </div>
          </Zoom>

          {/* banner 3 */}
          <Slide direction="right">
            <div className="relative bg-green-200 rounded shadow overflow-hidden w-[90%] max-w-sm mx-auto lg:max-w-full h-53 lg:h-auto flex lg:flex-row items-stretch">
              {/* Text Content */}
              <div className="absolute bottom-2 left-2 lg:static lg:flex-1 p-4 text-left flex flex-col justify-center items-start z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                  2% cashback on <br /> Tea,Coffe & Drinks
                </h3>
                <div className="text-xs sm:text-sm text-gray-700 mb-3">
                  <p className="mb-1 font-semibold">Max cashback:40</p>
                  <span>
                    Code:{" "}
                    <span className="font-semibold text-black">CARE12</span>
                  </span>
                </div>

                <Slide direction="right">
                  <Link
                    to="#"
                    className="bg-slate-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded w-fit hover:bg-white hover:text-orange-300 transition-all duration-1000"
                 onClick={()=>navigate("Coofe")} >
                    Shop Now
                  </Link>
                </Slide>
              </div>

              {/* Image Section */}
              <div className="absolute bottom-3 right-3 lg:static p-2 sm:p-4 w-[180px] h-[180px] sm:w-1/2 sm:h-60 lg:h-auto z-0">
                <img
                  src={adbanner}
                  alt="ad-banner-1"
                  className="object-cover rounded-xl w-full h-full sm:max-w-full sm:max-h-full"
                />
              </div>
            </div>
          </Slide>
        </div>
      </section>

      {/* Categories Preview */}

      <CategoriesSection />

      {/* extra feature */}

      {/* featured products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Featured Products
        </h2>

        <ProductGrid />
      </section>

      {/* shop now */}
    
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Fruits & Vegetables Banner */}
            <div className="w-full lg:w-1/2 bg-green-400 rounded">
              <Slide direction="right">
                <div className="rounded-2xl h-full flex flex-col sm:flex-row lg:flex-row p-0">
                  {/* Image - Centered */}
                  <div
                    className="w-full sm:w-1/2 h-40 flex justify-center items-center"
                    style={{
                      background: `url(${aboutImage}) no-repeat center`,
                      backgroundSize: "contain",
                    }}
                  ></div>

                  {/* Text - Centered */}
                  <div className="w-full sm:w-1/2 p-4 flex justify-center items-center">
                    <div className="text-black max-w-sm text-center">
                      <h3 className="text-2xl font-bold mb-2">
                        Baby Care & Essiential
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
                <div className="rounded-2xl h-full flex flex-col sm:flex-row lg:flex-row p-0">
                  {/* Image - Centered */}
                  <div
                    className="w-full sm:w-1/2 h-40 flex justify-center items-center"
                    style={{
                      background: `url(${aboutImage}) no-repeat center`,
                      backgroundSize: "contain",
                    }}
                  ></div>

                  {/* Text - Centered */}
                  <div className="w-full sm:w-1/2 p-4 flex justify-center items-center">
                    <div className="text-black max-w-sm text-center">
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
   
   
      {/* return critaria */}

      <section className="my-8 lg:my-14 ">
        <div className="container mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[...Array(4)].map((_, index) => (
              <Zoom key={index}>
                <div className="shadow-effect h-full flex flex-col items-center justify-start p-6 bg-white border border-green-400 rounded-xl shadow-effect h-full flex flex-col items-center justify-start p-6 bg-white border border-green-400 rounded-xl mobile-hover">
                  <div className="mb-6 w-20 h-20 mx-auto">
                    <img
                      src={mobile}
                      alt={["refresh", "package", "gift", "clock"][index]}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="icon-content">
                    {index === 0 && (
                      <>
                        <h3 className="text-lg font-semibold mb-3">
                          Easy Returns
                        </h3>
                        <p>
                          Not satisfied with a product? Return it at the
                          doorstep &amp; get a refund within hours. No questions
                          asked{" "}
                          <Link to="#!" className="text-green-600 underline">
                            policy
                          </Link>
                          .
                        </p>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <h3 className="text-lg font-semibold mb-3">
                          Wide Assortment
                        </h3>
                        <p>
                          Choose from 5000+ products across food, personal care,
                          household, bakery, veg and non-veg &amp; other
                          categories.
                        </p>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <h3 className="text-lg font-semibold mb-3">
                          Best Prices &amp; Offers
                        </h3>
                        <p>
                          Cheaper prices than your local supermarket, great
                          cashback offers to top it off. Get best prices &amp;
                          offers.
                        </p>
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <h3 className="text-lg font-semibold mb-3">
                          10 Minute Grocery Now
                        </h3>
                        <p>
                          Get your order delivered to your doorstep at the
                          earliest from FreshCart pickup stores near you.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </Zoom>
            ))}
          </div>
        </div>
      </section>

      {/* <h1>add here some banner attractive</h1> */}

      <Slide direction="right">
        <section className="relative w-full overflow-hidden">
          <div className="relative">
            {/* Mobile Banner */}
            <img
              src={mobileBanner}
              alt="Mobile Banner"
              className="w-full h-auto object-cover max-h-[400px] sm:hidden rounded-xl"
            />

            {/* Desktop Banner */}
            <img
              src={desktopBanner}
              alt="Desktop Banner"
              className="w-full h-auto object-cover max-h-[500px] hidden sm:block rounded-xl"
            />
          </div>
        </section>
      </Slide>

      {/* <div className="scroll-to-top bg-green-500">
    <button className="scroll-to-top-button show">↑</button>
  </div> */}

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
