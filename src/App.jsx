import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import Fetchuserdetails from './utils/Fetchuserdetails';
import { setUserDetails } from './store/Userslice';
import { useDispatch } from 'react-redux';

const App = () => {
const dispatch = useDispatch();

  const fetchUser = async() => {
    const userData = await  Fetchuserdetails()
     dispatch(setUserDetails(userData.data))
  }
useEffect(() => {
  fetchUser()
},[])


  return (
    <>
    
    <Header/>
   <main className='min-h-[78vh]'>
    <Outlet/>
   </main>
   <Footer/>
   <Toaster/>
   </>
  )
}

export default App