import React from 'react'
import { MdHistory } from 'react-icons/md'

const Navbar = (props) => {
  return (
    <nav className='col-span-full grid grid-cols-12'>
      <div className='flex flex-col justify-center items-center py-5 col-span-6 col-start-4'>
        <h1 className='font-semibold text-4xl text-[#521C0D] text-center'>RESTORAN SEDERHANA</h1>
        <p className='text-sm sm:text-sm'>By Bikra Abna Filqiyast Dzaki</p>
      </div>
      <div className='col-start-11 w-full h-full flex justify-end items-center'>
        <button className='text-3xl text-[#521C0D] cursor-pointer' onClick={props.onOpenHistory}><MdHistory/></button>
      </div>
    </nav>
  )
}

export default Navbar
