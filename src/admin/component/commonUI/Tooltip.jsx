import React from "react";

const Tooltip = ({ text, isVisible }) => (
  <div
    className={`absolute top-[-40px] left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out ${
      isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-2 pointer-events-none"
    } sm:top-[-30px] md:top-[-40px] lg:top-[-50px]`}
  >
    <div className="bg-gray-700 text-white text-xs px-2 py-1 rounded-md relative">
      {text}
      <div
        className={`absolute bottom-[-3px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rotate-45 transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </div>
  </div>
);

export default Tooltip;
