import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-yellow-100 p-7">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-2xl w-full text-center transition-transform duration-500 hover:scale-105">
        <Link to={"/"}>
        <h1 className="text-4xl font-bold text-green-700 mb-6">Contact Us</h1>
        </Link>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          We’re here to help — anytime, anywhere!
        </p>
        <p className="text-gray-700 text-lg mb-2">
          📞 <a href="tel:7352205506" className="text-yellow-600 hover:underline">7352205506</a>
        </p>
        <p className="text-gray-700 text-lg mb-6">
          📧 <a href="mailto:tiwarisunny7352@gmail.com" className="text-yellow-600 hover:underline">tiwarisunny7352@gmail.com</a>
        </p>
        <p className="text-gray-600 text-base">
          If you have any problem, don't hesitate to contact us. We are available <strong>24/7</strong> for your help!
        </p>
      </div>
    </section>
  );
};

export default Contact;
