import React from "react";
import { Link, useNavigate } from "react-router-dom";

import ProductGrid from "../Product/ProductGrid.jsx";
import CategoriesSection from "../category/CategoriesSection.jsx";
import { Slide, Zoom } from "react-awesome-reveal";
// import abouticon from "../assets/about.svg";
import aboutImage from "../../assets/about.svg";
import adbanner from "../../assets/dio1.png";
import adbanner1 from "../../assets/skin4.png";
import adbanner2 from "../../assets/coffe.png";

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
import ReturnSection from "../../Return/ReturnSection.jsx";
import BannerSection from "../../Return/BannerSection.jsx";
import HeroBanner from "../../Return/HeroBanner.jsx";
import FeatureStrip from "../../Return/FeatureStrip.jsx";
import StayUpdated from "../../Return/StayUpdated.jsx";
import PromoBanners from "../../Return/PromoBanners.jsx";

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
  const handleNavigate = () => {
    setLoading(true);
    setTimeout(() => navigate("/arrivals"), 500);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Banner */}

      <HeroBanner />

      {/* return section */}

      <FeatureStrip />

      {/* grab first offer*/}
      {/* relative bg-green-100 text-center py-16 px-4 rounded-b-3xl */}
      <section className="relative text-center -mt-8 py-12 px-4 rounded-b-3xl">
  <div className="max-w-8xl mx-auto">
    <Slide direction="down">
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col lg:flex-row items-center text-center lg:text-left space-y-6 lg:space-y-0 lg:space-x-10 w-full max-w-6xl mx-auto">
        {/* Image */}
        <div className="flex-shrink-0 animate-bounce">
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
              Grab Your First Order From Shanu Mart &{" "}
              <span className="text-green-600 font-semibold">₹</span> And Get{" "}
              <strong>₹50</strong> Maff.
            </p>
          </div>

          <Link to="#">
            <button
              className="bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md animate-fade-in-up delay-200"
              onClick={() => navigate("grab")}
            >
              Grab Your First Order Here
            </button>
          </Link>
        </div>
      </div>
    </Slide>
  </div>
</section>


      {/* cashback and offer section */}
     <PromoBanners/>
      {/* Categories Preview */}

      {/* <CategoriesSection /> */}

      {/* featured products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Featured Products
        </h2>

        <ProductGrid />
      </section>

      {/* shop now */}

      <BannerSection />
      {/* return critaria */}

      <ReturnSection />

      {/* <h1>add here some banner attractive</h1> */}

      <Slide direction="right">
        <section className="relative w-full overflow-hidden">
          <div className="relative" onClick={() => navigate("raksha")}>
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
      <StayUpdated/>
    </div>
  );
};

export default Home;
