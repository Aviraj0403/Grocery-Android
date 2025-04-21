// import React, { useEffect, useState } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import summaryApi from "../common/SummeryApi";
// import toast from "react-hot-toast";
// import Axios from "../utils/Axios";

// const Resetpassword = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [data, setdata] = useState({
//     email: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [showpassword, setshowpassword] = useState(false);
//   const [showconfirmpassword,setshowconfirmpassword] = useState(false);
//   const validvalue = Object.values(data).every((el) => el);

//   useEffect(() => {
//     if (!location?.state?.data?.success) {
//       navigate("/");
//     }
//     if (location?.state?.email) {
//       setdata((preve) => {
//         return {
//           ...preve,
//           email: location?.state?.email,
//         };
//       });
//     }
//   }, []);

//   const handlechange = (e) => {
//     const { name, value } = e.target;

//     setdata((preve) => {
//       return {
//         ...preve,
//         [name]: value,
//       };
//     });
//   };
//   console.log("data", data);

//   const handleregister = async (e) => {
//     e.preventDefault();

//     // optional part
//     if(data.newPassword !== data.confirmPassword){
//         toast.error("New password and confirm password must be same");
//     }

//     const response = await Axios({
//       ...summaryApi.resetPassword,
//       data: data,
//     });

//     console.log(response);
//   };

//   return (
//     <section className=" w-full container mx-auto px-4">
//       <div className="bg-green-50 my-4 w-full max-w-lg mx-auto rounded p-6">
//         <p className="hover:text-green-600 font-bold  mb-2 text-slate-700">
//           Enter your New Password
//         </p>

//         <form className="grid gap-3 py-4" onSubmit={handleregister}>
//           <div className="grid gap-1 ">
//             <label htmlFor="newpassword">New password:</label>
//             <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-green-700">
//               <input
//                 type={showpassword ? "text" : "password"}
//                 id="password"
//                 autoFocus
//                 className="w-full outline-none"
//                 name="newPassword"
//                 value={data.newPassword}
//                 onChange={handlechange}
//                 placeholder="Enter your new password"
//               />
//               <div
//                 onClick={() => setshowpassword((preve) => !preve)}
//                 className="cursor-pointer">
              
//                 {showpassword ? <FaRegEye /> : <FaRegEyeSlash />}
//               </div>
//             </div>
//           </div>


//           <div className="grid gap-1 ">
//             <label htmlFor="confirmpassword">Confirm Password:</label>
//             <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-green-700">
//               <input
//                 type={showconfirmpassword ? "text" : "password"}
//                 id="confirmPassword"
//                 autoFocus
//                 className="w-full outline-none"
//                 name="confirmPassword"
//                 value={data.confirmPassword}
//                 onChange={handlechange}
//                 placeholder="Enter your confirm password"
//               />
//               <div
//                 onClick={() => setshowconfirmpassword((preve) => !preve)}
//                 className="cursor-pointer">
              
//                 {showconfirmpassword ? <FaRegEye /> : <FaRegEyeSlash />}
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={handleregister}
//             disabled={!validvalue}
//             className={`${
//               validvalue ? "bg-green-600 hover:bg-green-700" : "bg-gray-500"
//             }  text-white py-2 rounded font-semibold my-3 tracking-wide`}
//           >
//             Change Password
//           </button>
//         </form>

//         <p>
//           Already have an account ?{" "}
//           <Link
//             to={"/login"}
//             className="font-semibold text-green-600 hover:text-green-700"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Resetpassword;
