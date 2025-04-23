import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
// import summaryApi from '../common/SummeryApi';
import authApi from '../../services/authApi';
import { Link, useNavigate } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';

const Register = () => {
    const[data,setdata] = useState({
        userName:"",
        email:"",
        phoneNumber:"",
        password:"",
        confirmPassword:""
    })
    const[showpassword,setshowpassword] = useState(false);
    const[showconfirmpassword,setshowconfirmpassword] = useState(false);
    const navigate = useNavigate();
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
        if(data.password !== data.confirmPassword){
            toast.error(
                "password and confirm password must be same"
            )  
            return 
        }
       try {
        const response = await Axios({
            ...authApi.register,
           data : data
        })

        if(response.data.error){
            toast.error(response.data.message)
        }
         
        if(response.data.success){
            toast.success(response.data.message)
            setdata({
                userName:"",
                email:"",
                phoneNumber:"",
                password:"",
                confirmPassword:""
            })
            navigate("/login")
        }

       } catch (error) {
        AxiosToastError(error)
       }

        

    }

   const validvalue = Object.values(data).every(el => el)
  return (
    <section className=' w-full container mx-auto px-4'>
      <div className='bg-green-50 my-4 w-full max-w-lg mx-auto rounded p-6'>
          <p className='bg-green-600 hover:bg-green-700 text-white flex justify-center py-2 rounded font-semibold'>Welcome to shanu's Mart</p>

          <form className='grid gap-3 mt-6' onSubmit={handleregister}>
            <div className='grid gap-1'>
                <label htmlFor="name">Name:</label>
                <input type="text" id='userName' autoFocus 
                className='bg-blue-50 p-2 border rounded outline-none focus:border-green-700'
                name='userName'
                value={data.userName}
                onChange={handlechange}
                placeholder='Enter your name...'
                />
            </div>

            <div className='grid gap-1 '>
                <label htmlFor="email">Email:</label>
                <input type="email" id='email' autoFocus 
                className='bg-blue-50 p-2 border rounded outline-none focus:border-green-700'
                name='email'
                value={data.email}
                onChange={handlechange}
                placeholder='Enter your email...'
                />
            </div>


            <div className='grid gap-1 '>
                <label htmlFor="number">Number:</label>
                <input type="number" id='phoneNumber' autoFocus 
                className='bg-blue-50 p-2 border rounded outline-none focus:border-green-700'
                name='phoneNumber'
                value={data.phoneNumber}
                onChange={handlechange}
                placeholder='Enter your number'
                />
            </div>


            <div className='grid gap-1'>
                <label htmlFor="password">Password:</label>
                <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-green-700'>
                <input type={showpassword ? "text":"password"} id='password' autoFocus 
                className='w-full outline-none bg-blue-50'
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

            </div>
             
            <div className='grid gap-1'>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-green-700'>
                <input type={showconfirmpassword ? "text":"password"} id='confirmPassword' autoFocus 
                className='w-full outline-none bg-blue-50'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handlechange}
                placeholder='Enter your Confirm password...'
                />
                 <div onClick={()=>setshowconfirmpassword(preve => !preve)} className='cursor-pointer'>
                    {
                        showconfirmpassword ?(
                            <FaRegEye/>
                        ):(
                            <FaRegEyeSlash/>
                        )
                    }
                </div>
                </div>

            </div>



           
           <button onClick={handleregister} disabled={!validvalue} className={`${validvalue ? "bg-green-600 hover:bg-green-700":"bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide`}>
            Register
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

export default Register