import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummeryApi";
import { logout } from "../store/Userslice";
import toast from "react-hot-toast";

const Usermenu = (close) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogOut = async () => {
    try {
      const response = await Axios({
        ...summaryApi.logout,
      });

      if (response.data.success) {
        if (close) {
          close();
        }

        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };
  return (
    <div>
      <div className="font-semibold px-2">My Account</div>
      <div className="text-sm">{user.name || user.mobile}</div>
      <Divider />
      <div className="text-sm grid gap-2">
        <Link to={""} className="px-2 hover:bg-green-500">
          My Order
        </Link>
        <Link to={""} className="px-2 hover:bg-green-500">
          Save Address
        </Link>
        <button
          onClick={handleLogOut}
          className="text-left hover:bg-green-500 px-2 cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Usermenu;
