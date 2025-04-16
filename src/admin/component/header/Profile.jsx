import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { MdEdit, MdKey, MdOutlineLogout } from 'react-icons/md';

function Profile() {
  return (
    <div className="profile-container absolute top-[10vh] right-[-50px] border shadow-md rounded-b-2xl bg-white p-8">
      <div className="upper flex items-center flex-col justify-center px-3 py-2">
        <div>
          <div className="relative border-2 border-red-500 rounded-full border-dashed">
            <img
              src="https://demo.foodscan.xyz/images/default/profile.png"
              className="p-1 w-24 h-24 rounded-full"
              alt="Profile"
            />
            <AiOutlineEdit
              size={38}
              className="absolute bottom-[-10px] left-[32%] border-2 p-1 rounded-full bg-black text-white"
            />
          </div>
        </div>
        <div className="text-center p-3">
          <h2 className="font-bold">
            Shanu-Mart
          </h2>
          <p className="text-sm font-semibold text-gray-500">
            john.doe@example.com
          </p>
          <p className="text-sm font-semibold text-gray-500">
            +91 9876543210
          </p>
        </div>
      </div>
      <div className="lower-links px-3 py-3 flex flex-col gap-2">
        <Link className="flex items-center gap-3 text-gray-600 hover:text-orange-500">
          <MdEdit /> Edit Profile
        </Link>
        <hr />
        <Link className="flex items-center gap-3 text-gray-600 hover:text-orange-500">
          <MdKey /> Change Password
        </Link>
        <hr />
        <Link
          to="/login"
          className="flex items-center gap-3 text-gray-600 hover:text-orange-500"
        >
          <MdOutlineLogout className="rotate-180" /> Logout
        </Link>
      </div>
    </div>
  );
}

export default Profile;
