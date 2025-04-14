import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import summaryApi from '../common/SummeryApi';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const[data,setdata] = useState({
        email:"",
        password:"",
    })
    const[showpassword,setshowpassword] = useState(false);

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
            ...summaryApi.login,
            data : data
        })

        // if(response.data.error){
        //     toast.error("wrong password")
        // }
        
        // console.log(response);
        toast.success("Logged in successfully!");
        navigate('/');
        // <Link to={"/"} className='block ml-auto hover:text-green-600'>Forgot password</Link>
    }

   const validvalue = Object.values(data).every(el => el)
  return (
    <section className=' w-full container mx-auto px-4'>
      <div className='bg-green-50 my-4 w-full max-w-lg mx-auto rounded p-6'>
          <p className='hover:text-green-600'>Login</p>

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


            <div className='grid gap-1'>
                <label htmlFor="password">Password:</label>
                <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-green-700'>
                <input type={showpassword ? "text":"password"} id='password' autoFocus 
                className='w-full outline-none'
                name='password'
                value={data.password}
                onChange={handlechange}
                placeholder='Enter your password'
                />
                 <div onClick={()=>setshowpassword(preve => !preve)} className='cursor-pointer'>
                    {
                        showpassword ?(
                            <FaRegEye/>
                        ):(
                            <FaRegEyeSlash/>
                        )
                    }
                </div>
                </div>
                <Link to={"/forgot-password"} className='block ml-auto hover:text-green-600'>Forgot password</Link>

            </div>
           



           
           <button onClick={handleregister} disabled={!validvalue} className={`${validvalue ? "bg-green-600 hover:bg-green-700":"bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide`}>
            Login
            </button>
            
          </form>

          <p>
            Dont have account ? <Link to={"/register"} 
            className='font-semibold text-green-600 hover:text-green-700'>Register</Link>
          </p>
      </div>
    </section>
  )
}

export default Login