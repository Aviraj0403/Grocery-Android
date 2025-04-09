import React from 'react'
import Usermenu from '../components/Usermenu'
import { IoClose } from "react-icons/io5";

const Usermenumobile = () => {
  return (
    <section className='bg-white h-full w-full py-7'>
        <button onClick={()=>window.history.back()} className='text-neutral-800 block w-fit ml-auto'>
            <IoClose size={25}/>
        </button>
        <div className='container mx-auto p-3 pb-8'>
        <Usermenu/>
        </div>
    </section>
  )
}

export default Usermenumobile