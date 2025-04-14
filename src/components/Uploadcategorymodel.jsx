import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";

const Uploadcategorymodel = ({close}) => {
    const[data,setdata] = useState({
        name : "",
        image : ""
    })

    const handleOnchange = (e) =>{
        const {name,value} = e.target

        setdata((preve)=>{
            return{
                  ...preve,
                  [name] : value
            }
        })
    }
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-600 opacity-60 flex items-center justify-center'>
           <div className='bg-white max-w-4xl w-full p-4 rounded'>
              <div className='flex items-center justify-between'>
                <h1 className='font-semibold'>Category</h1>
              <button onClick={close} className='w-fit block ml-auto'>
                <IoClose size={25}/>
               </button>
              </div>
              <form>
                <div>
                    <label id="categoryName">Name</label>
                    <input type="text"
                    id='categoryName' 
                    placeholder='Enter category name'
                    value={data.name}
                    name='name'
                    onChange={handleOnchange}
                    className='outline-none text-black'
                    />
                </div>
              </form>
           </div>
    </section>
  )
}

export default Uploadcategorymodel