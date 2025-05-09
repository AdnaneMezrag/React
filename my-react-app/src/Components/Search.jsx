import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Search = ({searchKeyword,setSearchKeyword}) => {
  return (
    <div className="flex bg-[#0F0D23] items-center p-2 gap-2 pl-5 w-[640px] rounded-lg">
        <MagnifyingGlassIcon className="text-gray-400 h-5 w-5 inline-block" />
        <input className='text-[#A8B5DB] text-xl w-[100%]' type="text"
         placeholder='Search through 300+ movies online' value={searchKeyword} 
         onChange={(e)=> setSearchKeyword(e.target.value)}/>
    </div>
  )
}

export default Search