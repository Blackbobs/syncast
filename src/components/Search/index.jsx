import React from 'react'
import { CiSearch } from "react-icons/ci";
import { useStateContext } from '../../context/ContextProvider';

const Search = () => {
  const {searchTerm, setSearchTerm} = useStateContext()

  return (
    <div className='flex gap-2 items-center rounded-full p-2 bg-slate-200 shadow-md'>
        <CiSearch/>
        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='bg-transparent focus:outline-none' type="text" placeholder='abeokuta' />
    </div>
  )
}

export default Search