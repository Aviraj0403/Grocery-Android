import React from "react";
import logo from "../assets/logo2.png";
import Search from "./Search";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
const Header = () => {
  return (
    <header className="h-33 lg:h-15 lg:shadow-md sticky top-0 bg-red-500 flex flex-col justify-center gap-1">
      <div className="container mx-auto flex item-center  px-2 justify-between">
        {/* logo */}
        <div className="h-full">
          <Link to={"/"} className="h-full  flex justify-center items-center">
            <img src={logo} width={80} height={60} alt="logo" className="hidden lg:block" />
            <img src={logo} width={70} height={40} alt="logo" className="lg:hidden" />

          </Link>
        </div>

        {/* search  */}
      <div className="hidden lg:block">
         <Search/>
      </div>
        {/* login and mycart */}
        <div className="">
           <button className="text-neutral-500 lg:hidden ">
           <FaRegUserCircle size={25}/>
           </button>
        <div className="hidden lg:block">
            login and my cart
        </div>
        </div>
      </div>

      <div className="container mx-auto px-2 lg:hidden">
        <Search/>
      </div>
    </header>
  );
};

export default Header;
