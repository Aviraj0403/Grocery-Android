import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummeryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileEdit, setopenProfileEdit] = useState(false);
  const [userdata, setuserdata] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const [loading,setloading] = useState(false);

  useEffect(() => {
    setuserdata({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setuserdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      setloading(true);
      const response = await Axios({
              ...summaryApi.updateUserDetails,
              data : userdata
      })

        const {data : responseData} = response

        if(responseData.success){
          toast.success(responseData.message);
        }

    } catch (error) {
      AxiosToastError(error);
    }finally{
      setloading(false);
    }

  };
  return (
    <div>
      {/* profile upload and display image */}
      <div
        className="w-16 h-16 bg-red flex items-center justify-center 
        rounded-full overflow-hidden drop-shadow-sm"
      >
        {user.avatar ? (
          <img alt={user.name} src={user.avatar} className="w-full h-full" />
        ) : (
          <FaRegUserCircle size={60} />
        )}
      </div>
      <button
        onClick={() => setopenProfileEdit(true)}
        className="text-sm min-w-10 border border-green-500 px-3 py-1 rounded-full mt-2 hover:bg-green-500"
      >
        Change Profile
      </button>
      {openProfileEdit && (
        <UserProfileAvatarEdit close={() => setopenProfileEdit(false)} />
      )}

      {/* name,mobile,email,changepassword */}
      <form className="my-4 grid gap-3" onSubmit={handleSubmit}>
        <div className="grid">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="p-2 bg-blue-50 outline-none border focus-within:border-green-300 rounded"
            value={userdata.name}
            name="name"
            onChange={handleOnchange}
            required
          />
        </div>

        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="p-2 bg-blue-50 outline-none border focus-within:border-green-300 rounded"
            value={userdata.email}
            name="email"
            onChange={handleOnchange}
            required
          />
        </div>

        <div className="grid">
          <label htmlFor="mobile">Mobile No</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter your mobile"
            className="p-2 bg-blue-50 outline-none border focus-within:border-green-300 rounded"
            value={userdata.mobile}
            name="mobile"
            onChange={handleOnchange}
            required
          />
        </div>

        <button className="border px-4 py-2 font-semibold border border-green-500 text-green-500 hover:text-neutral-800 rounded  hover:bg-green-600">
          {
            loading ? "Loading.." : "Submit"
          }
        
        </button>
      </form>
    </div>
  );
};

export default Profile;
