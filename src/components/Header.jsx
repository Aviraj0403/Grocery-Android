import React from "react";
import logo from "../assets/logo2.png";
import Search from "./Search";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/Usemobile";
import { FaCartShopping } from "react-icons/fa6";
import { RiLoginCircleFill } from "react-icons/ri";


const Header = () => {
  const [ismobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();

  const redirectToLoginPage = ()=>{
     navigate("/login")
  }

  // console.log(first)
  return (
    <header className="h-30 lg:h-15 lg:shadow-md sticky top-0  flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && ismobile) && (
        <div className="container mx-auto flex item-center  px-2 justify-between">
          {/* logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full  flex justify-center items-center">
              <img
                src={logo}
                width={65}
                height={30}
                alt="logo"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={78}
                height={30}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          {/* search  */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* login and mycart */}
          <div className="">

            {/* user icon display in only mobile version */}

            <button className="text-neutral-500 lg:hidden ">
              <FaRegUserCircle size={26} />
            </button>
            {/* desktop only */}
            <div className="hidden lg:flex items-center gap-10">
              <button onClick={redirectToLoginPage} className="text-lg  flex items-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white">
                <div className="animate-bounce">
                  <RiLoginCircleFill size={32}/>
                  </div>
                  <div className="animate-bounce">
                    login
                  </div>
              </button>
              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white">
                {/* add to cart icon  */}
                <div className="animate-bounce">
                   <FaCartShopping size={32}/>
                </div>
                <div className="font-bold animate-bounce">
                  My Cart
                </div>
              </button>
              </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
