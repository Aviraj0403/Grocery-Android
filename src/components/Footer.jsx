import React from 'react'
import "./Footer.css"
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
      <p>© All Rights Reserve 2025</p>

      <div className='flex item-center gap-3.5 justify-center text-2xl'>
        <a href='' className='hov' >
            <FaFacebook/>
        </a>
        <a href="" className='hov'>
          <FaInstagram/>
        </a>
        <a href="/admin" className='hov'>
          <FaLinkedin/>
        </a>
        <a href="" className='hov' >
          <FaWhatsapp/>
        </a>
      </div>
      </div>
    </footer>
  )
}

export default Footer