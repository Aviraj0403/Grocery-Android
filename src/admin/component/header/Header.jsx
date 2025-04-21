import React, { useState } from "react";
import { FaAlignLeft, FaUserAstronaut,FaShoppingBasket  } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useAuth } from '../../../context/AuthContext.jsx';
import Profile from "./Profile.jsx";

function Header({ toggleSidebar, openSidebar }) {
  const { user } = useAuth();
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  // console.log(user)
  return (
    <header className="bg-orange-100/20 p-4 fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-md transition-all ease-in-out duration-300">
  <div className="container mx-auto flex justify-between items-center">
    
    {/* LEFT SIDE: Branding / Fixed Name */}
    <div className="flex items-center space-x-4">
    <div className="flex items-center space-x-2">
    <FaShoppingBasket size={22} className="text-orange-800" />
    <h1 className="text-lg font-bold text-orange-800">Shanu-Mart</h1>
  </div>
      {openSidebar ? (
        <FaAlignLeft size={26} onClick={toggleSidebar} className="cursor-pointer" />
      ) : (
        <MdMenu size={38} onClick={toggleSidebar} className="cursor-pointer" />
      )}
    </div>

    {/* RIGHT SIDE: Language, Sidebar Toggle, Profile */}
    <div className="flex items-center space-x-4">
    <p className="text-sm max-sm:hidden">Branch: Bettiah (Main)</p>
      <select className="border rounded px-2 py-1 text-black max-sm:hidden">
        <option value="english">English</option>
        <option value="Hindi">Hindi</option>
      </select>


      <div className="relative">
        <button
          onClick={() => setIsOpenProfile(!isOpenProfile)}
          className="bg-orange-700 flex items-center gap-1 text-white px-3 py-2 rounded"
        >
          <FaUserAstronaut /> {user?.userName || "User"}
        </button>
        {isOpenProfile && <Profile />}
      </div>
    </div>
  </div>
</header>

  );
}

export default Header;
