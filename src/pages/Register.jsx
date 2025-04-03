import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";


const Register = () => {
    const[data,setdata] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
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
    console.log("data",data)
  return (
    <section className=' w-full container mx-auto px-4'>
      <div className='bg-green-400 my-4 w-full max-w-lg mx-auto rounded p-4'>
          <p>Welcome to Shanu's Shop</p>

          <form className='grid gap-3 mt-6'>
            <div className='grid gap-1'>
                <label htmlFor="name">Name:</label>
                <input type="text" id='name' autoFocus className='bg-blue-50 p-2 border rounded'
                name='name'
                value={data.name}
                onChange={handlechange}
                />
            </div>

            <div className='grid gap-1'>
                <label htmlFor="email">Email:</label>
                <input type="email" id='email' autoFocus className='bg-blue-50 p-2 border rounded'
                name='email'
                value={data.email}
                onChange={handlechange}
                />
            </div>


            <div className='grid gap-1'>
                <label htmlFor="password">Password:</label>
                <div>
                <input type={showpassword ? "text":"password"} id='password' autoFocus className='bg-blue-50 p-2 border rounded'
                name='password'
                value={data.password}
                onChange={handlechange}
                />
                </div>
            </div>

            <div className='grid gap-1'>
                <label htmlFor="confirmPassword">ConfirmPassword:</label>
                <input type="password" id='password' autoFocus className='bg-blue-50 p-2 border rounded'
                name='password'
                value={data.password}
                onChange={handlechange}
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
          </form>
      </div>
    </section>
  )
}

export default Register