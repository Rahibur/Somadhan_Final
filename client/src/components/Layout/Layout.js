import React from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';



const Layout = ({ children }) => {
  return (
    <>
      <Navbar />

      <div className='content'>
        <Sidebar />
        {children}
      </div>

    </>
  )
}

export default Layout;