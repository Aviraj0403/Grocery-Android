import React, { useState } from "react";
import logo from "../assets/logo2.png";
import Search from "./Search";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/Usemobile";
import { FaCartShopping } from "react-icons/fa6";
import { RiLoginCircleFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RxTriangleDown } from "react-icons/rx";
import { GoTriangleUp } from "react-icons/go";
import Usermenu from "./Usermenu";


const Header = () => {
  const [ismobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state)=>state?.user)
  const [openUserMenu,setopenUserMenu] = useState(false);

  console.log("user from store",user)

  const redirectToLoginPage = ()=>{
     navigate("/login")
  }
  const handleCloseUserMenu = ()=>{
    setopenUserMenu(false);
  }

  const handleMobileUser= () =>{
        if(!user._id){
          navigate("/login")
          return
        }
        navigate("/user")
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

            <button className="text-neutral-500 lg:hidden" onClick={handleMobileUser}>
              <FaRegUserCircle size={26} />
            </button>
            {/* desktop only */}
            <div className="hidden lg:flex items-center gap-10">
               
                {
                  user?._id ? (
                    <div className="relative">
                      <div onClick={()=>setopenUserMenu(preve => !preve)} className="flex select-none items-center gap-2 cursor-pointer">
                        <p>Account</p>
                        {
                          openUserMenu ? (
                            <GoTriangleUp size={24}/>
                          ) : (
                            <RxTriangleDown size={24}/>
                          )
                        }
                        
                      </div>
                      {
                        openUserMenu && (
                          <div className="absolute right-0 top-12">
                          <div className="bg-red-500 rounded p-4 min-w-52 lg:shadow-lg">
                            <Usermenu close={handleCloseUserMenu}/>
                          </div>
                      </div>
                        )
                      }
                   
                    </div>
                  ) : (
                    <button onClick={redirectToLoginPage} className="text-lg  flex items-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white">
                    <div className="animate-bounce">
                      <RiLoginCircleFill size={32}/>
                      </div>
                      <div className="animate-bounce">
                        login
                      </div>
                  </button>
                  )
                }

             
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
