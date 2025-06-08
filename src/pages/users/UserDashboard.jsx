// // src/components/Dashboard.js
// import React, { useEffect, useState } from 'react';
// import {
//   FaUserCircle,
//   FaShoppingCart,
//   FaCog,
//   FaSignOutAlt,
//   FaBars,
// } from 'react-icons/fa';
// import { IoMdClose } from 'react-icons/io';
// import toast from 'react-hot-toast';
// import { Link } from 'react-router-dom';
// import { getProfile, updateProfile, uploadAvatar } from '../../services/authApi';
// import { useAuth } from '../../context/AuthContext';

// const Dashboard = () => {
//   const { logout } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [draftProfile, setDraftProfile] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState('');
//   const [activeTab, setActiveTab] = useState('profile');
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const { data } = await getProfile();
//         setProfile(data.userProfileDetail);
//         setDraftProfile(data.userProfileDetail);
//         setAvatarPreview(data.userProfileDetail.avatar || '');
//       } catch (err) {
//         toast.error('Failed to load profile');
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setDraftProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       await updateProfile(draftProfile);
//       setProfile(draftProfile);
//       toast.success('Profile updated successfully!');
//     } catch (err) {
//       toast.error('Update failed');
//     }
//   };

//   const handleCancel = () => {
//     if (window.confirm('Discard changes?')) {
//       setDraftProfile(profile);
//     }
//   };

//   const handleAvatarChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setAvatarPreview(URL.createObjectURL(file));
//       const formData = new FormData();
//       formData.append('avatar', file);

//       try {
//         await uploadAvatar(formData);
//         toast.success('Avatar uploaded!');
//       } catch {
//         toast.error('Avatar upload failed');
//       }
//     }
//   };

//   const menuItems = [
//     { id: 'profile', icon: <FaUserCircle />, label: 'Profile' },
//     { id: 'orders', icon: <FaShoppingCart />, label: 'My Orders' },
//     { id: 'settings', icon: <FaCog />, label: 'Settings' },
//   ];

//   const orders = [
//     { id: 1, item: 'Apples', date: '2025-04-25', amount: '₹150' },
//     { id: 2, item: 'Milk', date: '2025-04-24', amount: '₹50' },
//     { id: 3, item: 'Bread', date: '2025-04-23', amount: '₹40' },
//   ];

//   if (!profile || !draftProfile) return <div className="p-5">Loading...</div>;

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 bg-white shadow-lg z-50 w-64 transform transition-transform duration-300 ease-in-out ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } md:translate-x-0 md:static`}
//       >
//         <div className="flex flex-col h-full justify-between">
//           <div className="p-4 space-y-6 relative">
//             <button
//               className="absolute top-4 right-4 text-2xl md:hidden"
//               onClick={() => setSidebarOpen(false)}
//             >
//               <IoMdClose />
//             </button>
//             <div className="flex flex-col items-center space-y-2 mt-8 md:mt-0">
//               <FaUserCircle className="text-5xl text-green-500" />
//               <h2 className="text-lg font-semibold">
//                 Hello, {profile.userName.split(' ')[0]}!
//               </h2>
//             </div>
//             <nav className="flex flex-col gap-2 mt-8">
//               {menuItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     setActiveTab(item.id);
//                     setSidebarOpen(false);
//                   }}
//                   className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full hover:bg-green-100 ${
//                     activeTab === item.id ? 'bg-green-200 font-semibold' : ''
//                   }`}
//                 >
//                   {item.icon}
//                   <span>{item.label}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>
//           <div className="p-4">
//             <Link to="/login">
//               <button
//                 onClick={logout}
//                 className="flex items-center gap-3 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white w-full"
//               >
//                 <FaSignOutAlt />
//                 Logout
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Mobile Navbar */}
//         <div className="flex items-center justify-between bg-white shadow-md p-4 md:hidden">
//           <button onClick={() => setSidebarOpen(!sidebarOpen)}>
//             <FaBars size={24} />
//           </button>
//           <h1 className="text-xl font-semibold text-green-600">Dashboard</h1>
//           <div></div>
//         </div>

//         <main className="flex-1 p-5">
//           {activeTab === 'profile' && (
//             <div>
//               <h1 className="text-2xl font-bold mb-4 text-green-600 my-12">
//                 Profile
//               </h1>

//               <div className="bg-gradient-to-r from-green-100 to-yellow-100 p-6 rounded-2xl shadow-lg space-y-4 border border-green-300">
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={avatarPreview || '/default-avatar.png'}
//                     alt="Avatar"
//                     className="w-24 h-24 rounded-full object-cover"
//                   />
//                   <label className="cursor-pointer text-sm text-green-600">
//                     Change Avatar
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleAvatarChange}
//                     />
//                   </label>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="flex gap-2">
//                     <span className="font-semibold text-green-700">Name:</span>
//                     <span>{profile.userName}</span>
//                   </div>
//                   <div className="flex gap-2">
//                     <span className="font-semibold text-green-700">Email:</span>
//                     <span>{profile.email}</span>
//                   </div>
//                   <div className="flex gap-2">
//                     <span className="font-semibold text-green-700">Phone:</span>
//                     <span>{profile.phoneNumber}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'orders' && (
//             <section>
//               <h2 className="text-2xl font-semibold text-green-600 mb-4">My Orders</h2>
//               <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto bg-gradient-to-r from-green-100 to-yellow-100">
//                 <table className="min-w-full text-sm text-gray-700">
//                   <thead className="bg-green-500 text-white">
//                     <tr>
//                       <th className="px-4 py-3 text-left rounded-tl-2xl">#</th>
//                       <th className="px-4 py-3 text-left">Item</th>
//                       <th className="px-4 py-3 text-left">Date</th>
//                       <th className="px-4 py-3 text-left rounded-tr-2xl">Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {orders.map((order) => (
//                       <tr key={order.id} className="hover:bg-green-100">
//                         <td className="px-4 py-4 font-semibold">{order.id}</td>
//                         <td className="px-4 py-4">{order.item}</td>
//                         <td className="px-4 py-4">{order.date}</td>
//                         <td className="px-4 py-4 font-semibold">{order.amount}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </section>
//           )}

//           {activeTab === 'settings' && (
//             <div>
//               <h1 className="text-2xl font-bold mb-4 text-green-600">Settings</h1>
//               <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-2xl shadow-lg space-y-6">
//                 <div className="flex flex-col gap-2">
//                   <label className="text-sm font-semibold text-green-700">Name</label>
//                   <input
//                     type="text"
//                     name="userName"
//                     value={draftProfile.userName}
//                     onChange={handleInputChange}
//                     className="border-2 border-green-300 rounded-lg p-2"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <label className="text-sm font-semibold text-green-700">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={draftProfile.email}
//                     onChange={handleInputChange}
//                     className="border-2 border-green-300 rounded-lg p-2"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <label className="text-sm font-semibold text-green-700">Phone</label>
//                   <input
//                     type="text"
//                     name="phoneNumber"
//                     value={draftProfile.phoneNumber}
//                     onChange={handleInputChange}
//                     className="border-2 border-green-300 rounded-lg p-2"
//                   />
//                 </div>
//                 <div className="flex gap-4 mt-4">
//                   <button
//                     onClick={handleSave}
//                     className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={handleCancel}
//                     className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
