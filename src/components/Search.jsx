import React, { useState,useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [issearchpage,setisSearchpage] = useState(false);

    useEffect(() => {
      const isSearch = location.pathname === "/search"
      setisSearchpage(isSearch);
    },[location])
    
    const redirectToSearchPage = () =>{
        navigate("/search")
    }
  return (


    <div className="w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center w-full text-neutral-500 bg-slate-50 group focus-within:border-blue-400">
      <button className="flex justify-center items-center h-full p-3 group-focus-within:text-blue-400">
        <FaSearch size={22} />
      </button>
      <div className="w-full h-full">
           {
            !issearchpage ? (
                // not in search page
                <div onClick={redirectToSearchPage} className="w-full h-full flex items-center">
               <TypeAnimation
              sequence={[
            // Same substring at the start will only be typed out once, initially
             "Search Milk",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
             "Search Bread",
              1000,
             "Search Rice",
             1000,
             "Search Dal",
             1000,
             "Search Tea",
             1000,
             "Search Spices",
             1000,
             "Search Toothpaste",
             1000,
             "Search Aata",
             1000,
             "Search Basmati Rice",
             1000,
             "Search Shampoo",
             1000,
             "Search Mirch Powder",
             1000,
             "Search Chips",
             1000,
             "Search Curd",
             1000,
             "Search Panner",
             1000,
         ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
                 </div>
            ) :(
                // when i was search page
                <div className="w-full h-full">
                    <input type="text" placeholder="Search For atta dal..." autoFocus className="bg-transparent w-full h-full outline-none"/>
                </div>
            )
           }
      </div>
      
    </div>
  );
};

export default Search;
