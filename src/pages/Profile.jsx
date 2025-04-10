import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";

const Profile = () => {
    const user = useSelector(state =>state.user)
    console.log("profile",user);
  return (
    <div>
        <div className='w-16 h-16 bg-red flex items-center justify-center rounded-full overflow-hidden drop-shadow-lg'>
            {
                user.avatar ? (
                    <img
                     alt={user.name}
                     src={user.avatar}
                     className='w-full h-full'
                     />
                ): (
                    <FaRegUserCircle size={60}/>
                )
            }
        </div>
    </div>
  )
}

export default Profile