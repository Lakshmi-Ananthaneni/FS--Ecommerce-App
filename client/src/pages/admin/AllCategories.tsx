import React from 'react'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminSidebar } from 'components/AdminSidebar'

export const AllCategories = () => {
  return (
    <div className='container'>
    <AdminSidebar />
    <div className='main-content'>
      <div className='profile'>
        <h3>All Categories </h3>
        
        
      </div>
    </div> 
  </div>
  )
}
