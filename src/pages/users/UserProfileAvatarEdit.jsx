import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { updateProfile } from "../services/authApi";
import AxiosToastError from "../utils/AxiosToastError";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
    }
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await updateProfile(userData);
      if (response.data.success) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Avatar Section */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden shadow">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaRegUserCircle size={80} className="text-gray-500" />
          )}
        </div>
        <button
          onClick={() => setOpenProfileEdit(true)}
          className="text-sm text-green-600 mt-2 hover:underline"
        >
          Change Avatar
        </button>
      </div>

      {openProfileEdit && (
        <UserProfileAvatarEdit close={() => setOpenProfileEdit(false)} />
      )}

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <div>
          <label htmlFor="name" className="block text-sm text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleOnChange}
            className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleOnChange}
            className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label htmlFor="mobile" className="block text-sm text-gray-600">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={userData.mobile}
            onChange={handleOnChange}
            className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
