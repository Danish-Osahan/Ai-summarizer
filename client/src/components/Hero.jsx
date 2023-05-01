import React from 'react'
import { logo } from "../assets";
import { useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
const Hero = () => {
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem('token')
    navigate('/signin');
  }
  return (
    <header className='w-full  flex justify-center items-center flex-col mb-2'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3' data-aos="fade-left"
          data-aos-duration="1000">
        <img src={logo} alt='sumz_logo' className='w-28 object-contain' />

        <button
          type='button'
          onClick={
            logout
          }
          className='black_btn flex justify-center items-center text-center'
        >
          Logout
        </button>
        
      </nav>

      <h1 className='head_text' data-aos="flip-left"
          data-aos-duration="1000">
        Summarize Articles with <br className='max-md:hidden' />
        <span className='orange_gradient '>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc'data-aos="flip-right"
          data-aos-duration="1000">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  )
}

export default Hero
