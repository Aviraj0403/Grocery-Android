import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import summaryApi from '../common/SummeryApi';
import { Link } from 'react-router-dom';

const Otpverifiaction = () => {
    const[data,setdata] = useState(["","","","","",""])


    const handleregister = async(e)=>{
        e.preventDefault();
       

        const response = await Axios({
            ...summaryApi.forgot_password,
            data : data
        })

        console.log(response);

    }

   const validvalue = data.every(el => el)

  return (
    <section className=' w-full container mx-auto px-4'>
      <div className='bg-green-50 my-4 w-full max-w-lg mx-auto rounded p-6'>
          <p className='hover:text-green-600 font-bold  mb-2 text-slate-700'>Enter OTP</p>

          <form className='grid gap-3 py-4' onSubmit={handleregister}>

            <div className='grid gap-1 '>
                <label htmlFor="otp">Enter Your OTP:</label>
                <div className='flex items-center gap-1 justify-between mt-3'>
                    {
                        data.map((Element,index)=>{
                            return(
                                <input type="text" id='otp' autoFocus maxLength={1}
                                className='bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-green-700 text-center font-semibold'
                                // placeholder='Enter your OTP'
                                />
                            )
                        })
                    }
                </div>
            </div>

           <button onClick={handleregister} disabled={!validvalue} className={`${validvalue ? "bg-green-600 hover:bg-green-700":"bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide`}>
            Verify OTP
            </button>
            
          </form>

          <p>
            Already have an account ? <Link to={"/login"} 
            className='font-semibold text-green-600 hover:text-green-700'>Login</Link>
          </p>
      </div>
    </section>
  )
}

export default Otpverifiaction;