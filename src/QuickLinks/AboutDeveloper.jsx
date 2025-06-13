import React from "react";
import { Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import image1 from "../assets/sunnyti.jpeg"
import image2 from "../assets/aviraj.png"
const AboutDeveloper = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-yellow-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-4xl w-full transition-transform duration-500 hover:scale-105">

        {/* Back to Home Link */}
        <Link to={"/"} className="flex items-center mb-8 hover:text-blue-600 transition-colors duration-300">
          <IoArrowBackCircleOutline className="text-3xl text-green-700 mr-4" />
          <h1 className="text-3xl font-bold text-green-700">About Developers</h1>
        </Link>

        {/* Sunny's Block */}
        <div className="relative bg-green-50 rounded-xl shadow-md p-6 mb-6 hover:bg-green-100 transition-all duration-500">
          {/* Developer Image */}
          <img 
            src={image1} // Replace with Sunny's image URL
            alt="Sunny Tiwari" 
            className="absolute top-4 right-4 w-16 h-16 rounded-full object-cover shadow-md border-2 border-green-300"
          />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Sunny Tiwari</h2>
          <p className="text-gray-700 leading-relaxed">
            Sunny Tiwari is a passionate <span className="font-semibold">Full-Stack Developer</span> and talented 
            <span className="font-semibold"> Graphic Designer</span>. With a sharp eye for detail and a love for crafting seamless user
            experiences, Sunny brings creativity and technical excellence together to deliver powerful and beautiful
            solutions across both front-end and back-end development.
          </p>
        </div>

        {/* Aviraj's Block */}
        <div className="relative bg-green-50 rounded-xl shadow-md p-6 hover:bg-green-100 transition-all duration-500">
          {/* Developer Image */}
          <img 
            src={image2} // Replace with Aviraj's image URL
            alt="Aviraj Singh" 
            className="absolute top-4 right-4 w-16 h-16 rounded-full object-cover shadow-md border-2 border-green-300"
          />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Aviraj Singh</h2>
          <p className="text-gray-700 leading-relaxed">
            Aviraj Singh is a skilled <span className="font-semibold">Full-Stack Developer</span> and expert 
            <span className="font-semibold"> Python Developer</span>. His strong background in scalable backend
            systems, combined with a deep understanding of modern frontend frameworks, ensures that every project
            he touches is built for performance, reliability, and innovation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutDeveloper;
