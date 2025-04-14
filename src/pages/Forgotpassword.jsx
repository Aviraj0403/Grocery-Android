import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import summaryApi from '../common/SummeryApi';
import { Link, useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
  const  navigate = useNavigate();
    const[data,setdata] = useState({
        email:"",
        
    })


    const handlechange = (e) =>{
           const {name,value} = e.target;

           setdata((preve)=>{
                 return{
                    ...preve,
                    [name] : value
                 }
           })
    }
    
    const handleregister = async(e)=>{
        e.preventDefault();
       

        const response = await Axios({
            ...summaryApi.forgot_password,
            data : data
        })

        console.log(response);
       toast.success("Otp at email");
        navigate('/verification-otp');

    }

   const validvalue = Object.values(data).every(el => el)
  return (
    <section className=' w-full container mx-auto px-4'>
      <div className='bg-green-50 my-4 w-full max-w-lg mx-auto rounded p-6'>
          <p className='hover:text-green-600 font-bold  mb-2 text-slate-700'>Forgot-password</p>

          <form className='grid gap-3 py-4' onSubmit={handleregister}>

            <div className='grid gap-1 '>
                <label htmlFor="email">Email:</label>
                <input type="email" id='email' autoFocus 
                className='bg-blue-50 p-2 border rounded outline-none focus:border-green-700'
                name='email'
                value={data.email}
                onChange={handlechange}
                placeholder='Enter your email address'
                />
            </div>

           <button onClick={handleregister} disabled={!validvalue} className={`${validvalue ? "bg-green-600 hover:bg-green-700":"bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide`}>
            Send otp
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

export default Forgotpassword;