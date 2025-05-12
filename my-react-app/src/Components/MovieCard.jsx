import React from 'react'
import { FaStar } from 'react-icons/fa';
import backupImage from '../assets/Images/CardImage.png';


function MovieCard({id,image, title, genre, rating}) {
  return (
    <div className='text-white bg-[#0F0D23] flex items-center flex-col p-3 rounded-[16px] m-2 text-[14px]'>
        <div>
        <div className='flex flex-col'>
        <div className='Card-Image mt-2 hover:scale-105 transition-all duration-300 ease-in-out h-[410px]'>
            <img className='rounded-2xl h-[100%]' src={image?
              ("https://image.tmdb.org/t/p/w500" + image) : backupImage} alt=""/>
        </div>
        <p className='self-start mt-2 font-bold'>{title}</p>
        </div>

<div className='flex mt-2 self-start items-center gap-1'>
        <FaStar size={18} color="gold" />
        <div>{rating} </div>
        <div className='text-gray-500'>{genre}</div>
</div>

        </div>
        
    </div>
  )
}

export default MovieCard