import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div className='bg-[#111111] h-full'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default MainLayout
