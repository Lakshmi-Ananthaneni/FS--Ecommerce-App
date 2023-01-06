import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate();
    const handleClick = () => {
   navigate("/products");
    }
  return (
    <section className='banner'>
      <div className='banner__content'>
      <p >Fashion makes life more beautiful.</p>
      <button className='btn' onClick={() => handleClick()}>SHOW NOW</button>
      </div>
    </section>
  )
}

export default Banner;