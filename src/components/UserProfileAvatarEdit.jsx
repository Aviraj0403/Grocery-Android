import { Axios } from "axios";
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common/SummeryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { updateAvatar } from "../store/Userslice";
import { IoClose } from "react-icons/io5";
const UserProfileAvatarEdit = ({close}) => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading,setloading] = useState(false);

    const handleSubmit =(e) =>{
       e.preventDefault();
    }

    const handleUploadAvatarImage = async(e)=>{
        const file = e.target.files[0]
        if(file){

        }
        const formData = new FormData()
        formData.append('avatar',file)

       try {
        setloading(true);
        const response = await Axios({
            ...summaryApi.uploadAvatar,
            data : formData
        })
        const {data :responseData} = response

        dispatch(updateAvatar(responseData.data.avatar))

       } catch (error) {
        AxiosToastError(error)
       }finally{
        setloading(false);
       }
    }
  return (
    <section
      className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900
    bg-opacity-60 p-4 flex items-center justify-center"
    >
      <div className="bg-white ,max-w-sm w-full rounded p-3 flex flex-col items-center justify-center">
        <button onClick={close} className="text-neutral-800 w-fit block ml-auto cursor-pointer">
            <IoClose size={25}/>
        </button>
        <div
          className="w-16 h-16 bg-green-500 flex items-center justify-center 
                          rounded-full overflow-hidden drop-shadow-sm"
        >
          {user.avatar ? (
            <img alt={user.name} src={user.avatar} className="w-full h-full" />
          ) : (
            <FaRegUserCircle size={60} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="uploadprofile">
            <div className=" cursor-pointer border border-green-500 hover:bg-green-500 px-4 py-1 rounded text-sm my-2">
                {
                    loading ? "Loading..." : "Upload"
                }
                </div>

                
            <input onChange={handleUploadAvatarImage} type='file' id='uploadprofile' className="hidden" />
            </label>
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
