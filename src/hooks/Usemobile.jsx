import React,{useState} from "react";
import { useEffect } from "react";
const useMobile = (breakpoint = 768)=>{
    const [ismobile,setismobile]= useState(window.innerWidth < breakpoint);
    const handleresize =()=>{
        const checkpoint = window.innerWidth < breakpoint
        setismobile(checkpoint);
    }
    useEffect(() => {
     handleresize();

     window.addEventListener('resize',handleresize)

     return ()=>{
        window.removeEventListener('resize',handleresize);
     }
    }, [])
    
    return [ismobile ]
}
export default useMobile;