import React from 'react'
import banner from '../assets/banner.jpg'
import mobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
const Home = () => {

  //  const loadingcategory = useSelector(state => state.product.loadingcategory)

  return (
    <section className='bg-white'>
      <div className='container mx-auto'>
          <div className={`w-full h-full min-h-48 bg-white rounded ${!banner && "animate-pulse my-2"} `}>
                 <img src={banner} alt="banner" className='w-full h-full hidden lg:block'/>
                 <img src={mobile} alt="banner" className='w-full h-full lg:hidden'/>
           </div>
      </div>

      <div className='container mx-auto px-4 my-2 grid grid-cols-2 md:grid-col-4 lg:grid-col-6'>
      {
        new Array(10).fill(null).map((c,index)=>{
          return(
            <div className='bg-white rounded p-4 min-h-36'>
              <div className='bg-blue-200 min-h-20'></div>
              <div className='bg-blue-100 h-8'></div>
              <div>
                <div className='bg-blue-100 h-8'></div>
                <div className='bg-blue-100 h-8'></div>
              </div>
            </div>
          )
        })
      }
      </div>
    </section>
  )
}

export default Home