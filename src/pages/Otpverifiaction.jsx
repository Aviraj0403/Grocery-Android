import React, { useEffect, useRef, useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import summaryApi from '../common/SummeryApi';
import { Link, Navigate, useLocation } from 'react-router-dom';

const Otpverifiaction = () => {
    const[data,setdata] = useState(["","","","","",""])
    const inputref = useRef([])
    const location = useLocation();
    // console.log("location",location);

    // useEffect(() => {
    //   if(!location?.state?.email){
    //     Navigate("/forgot-password")
    //   }
    // }, [])
    

    const handleregister = async(e)=>{
        e.preventDefault();
       

        const response = await Axios({
            ...summaryApi.forgot_password_otp_verification,
            data : {
              otp : data.join(""),
              email : location?.state?.email
            }  
        })

        console.log(response);

    }

   const validvalue = data.every(el => el)

  return (
    <section className=' w-full container mx-auto px-4'>
      <div className='bg-green-50 my-4 w-full max-w-lg mx-auto rounded p-6 hover:bg-green-100'>
          <p className='hover:text-green-600 font-bold  mb-2 text-slate-700'>Enter OTP</p>

          <form className='grid gap-3 py-4' onSubmit={handleregister}>

            <div className='grid gap-1 '>
                <label htmlFor="otp">Enter Your OTP:</label>
                <div className='flex items-center gap-1 justify-between mt-3'>
                    {
                        data.map((Element,index)=>{
                            return(
                                <input key={"otp" + index} 
                                type="text" id='otp'
                                 ref={(ref)=>{inputref.current[index]=ref  
                                  return ref
                                }} 
                                  autoFocus
                                  maxLength={1}
                                  value={data[index]} 
                                  onChange={(e)=>{const value = e.target.value
                                   const newdata = [...data]
                                   newdata[index] = value
                                   setdata(newdata);
                                   console.log("value is",value)
                            
                                   if(value && index < 5){
                                         inputref.current[index+1].focus()
                                   }
                                  
                                  }}
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