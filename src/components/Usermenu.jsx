// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import Divider from "./Divider";
// import Axios from "../utils/Axios";
// import summaryApi from "../common/SummeryApi";
// import { logout } from "../store/Userslice";
// import toast from "react-hot-toast";
// import { FiExternalLink } from "react-icons/fi";

// const Usermenu = (close) => {
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogOut = async () => {
//     try {
//       const response = await Axios({
//         ...summaryApi.logout,
//       });

//       if (response.data.success) {
//         if (close) {
//           close();
//         }

//         dispatch(logout());
//         localStorage.clear();
//         toast.success(response.data.message);
//         navigate("/");
//       }
//     } catch (error) {
//       console.log(error);
//       AxiosToastError(error);
//     }
//   };

//   const handleClose = () => {
//     if (close) {
//       close();
//     }
//   };
//   return (
//     <div>
//       <div className="font-semibold px-2">My Account</div>
//       <div className="text-sm flex items-center gap-2">
//         <span className="max-w-52 text-ellipsis line-clamp-1">
//           {user.name || user.mobile}{" "}
//         </span>
//         <Link
//           onClick={handleClose}
//           to={"dashboard/profile"}
//           className="hover:text-green-400"
//         >
//           <FiExternalLink size={25} />
//         </Link>
//       </div>

//       <Divider />

//       <div className="text-sm grid gap-2">
//          <Link
//           onClick={handleClose}
//           to={"/dashboard/category"}
//           className="px-2 hover:bg-green-500"
//         >
//           Category 
//         </Link>


//         <Link
//           onClick={handleClose}
//           to={"/dashboard/subcategory"}
//           className="px-2 hover:bg-green-500"
//         >
//           Sub-category 
//         </Link>


//         <Link
//           onClick={handleClose}
//           to={"/dashboard/upload-product"}
//           className="px-2 hover:bg-green-500"
//         >
//           Upload product's
//         </Link>

//         <Link
//           onClick={handleClose}
//           to={"/dashboard/product"}
//           className="px-2 hover:bg-green-500"
//         >
//           Product
//         </Link>

//         <Link
//           onClick={handleClose}
//           to={"/dashboard/myorders"}
//           className="px-2 hover:bg-green-500"
//         >
//           My Order
//         </Link>

//         <Link
//           onClick={handleClose}
//           to={"/dashboard/address"}
//           className="px-2 hover:bg-green-500"
//         >
//           Save Address
//         </Link>

//         <button
//           onClick={handleLogOut}
//           className="text-left hover:bg-green-500 px-2 cursor-pointer"
//         >
//           Log Out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Usermenu;
