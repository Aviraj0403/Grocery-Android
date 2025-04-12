import React from 'react'

const ProgressBar = ({progressWidth}) => {
  return (
   
      <div
            className=" border rounded-r-md h-2 bg-orange-600 transition-all ease-in-out duration-300"
            style={{ width: `${progressWidth}%` }}
          ></div>
    
  )
}

export default ProgressBar
