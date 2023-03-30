import React from 'react'
import {Outlet} from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import SubNavbar from './SubNavbar'
const Layout = () => {
  return (
   <>
      <Navbar/>
      <SubNavbar/>
        <main className='h-screen'>
          <Outlet/>
        </main>
     
   </>
  )
}

export default Layout