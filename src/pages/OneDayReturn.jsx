import { Link } from "@mui/material";
import React from "react";
import { TbTruckReturn } from "react-icons/tb";

const OneDayReturn = () => {
  return (
    <div className="p-6 sm:p-8 border border-green-200 rounded-xl bg-green-50 shadow-sm max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
       
      
        <h1 className="text-2xl sm:text-3xl font-bold text-green-800 transition-transform duration-300 hover:scale-105 md:hover:scale-100">
        1 Day Easy Return
        </h1>
        

        <TbTruckReturn className="text-green-600 text-3xl transition-transform duration-300 hover:scale-120 md:hover:scale-100 animate-bounce" />
      </div>
      <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
        We offer a simple <strong>1-day-return</strong> policy. If you're not
        satisfied, you can return the product within 24 hours of delivery.
      </p>
    </div>
  );
};

export default OneDayReturn;
