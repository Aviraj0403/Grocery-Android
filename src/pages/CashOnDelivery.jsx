import React from 'react'
import { BsCashCoin } from "react-icons/bs";
import { Link } from 'react-router-dom';
const CashOnDelivery = () => {
  return (
    <div className="p-6 sm:p-8 border border-green-200 rounded-xl bg-green-50 shadow-sm max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Link to={"/"}>
        <h1 className="text-2xl sm:text-3xl font-bold text-green-800 transition-transform duration-300 hover:scale-105 md:hover:scale-100">
          Cash On Delivery
        </h1>
        </Link>
        <BsCashCoin className="text-green-600 text-3xl animate-pulse" />
      </div>
      <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
        We offer a <strong>Cash-on-Delivery</strong> service. If you're not comfortable paying online or via UPI,
        you can simply pay with cash at your doorstep.
      </p>
      
    </div>
  )
}

export default CashOnDelivery






