import React from 'react'
import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className='flex gap-2 items-center rounded-full p-2 bg-slate-200'>
        <CiSearch/>
        <input className='bg-transparent focus:outline-none' type="text" placeholder='Search for your city' />
    </div>
  )
}

export default Search