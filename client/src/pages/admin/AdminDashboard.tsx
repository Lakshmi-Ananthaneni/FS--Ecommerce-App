import React from 'react'

import { AdminSidebar } from 'components/AdminSidebar'
import { useAppSelector } from 'redux/hooks';

export const AdminDashboard = () => {
  const { user, error, loading } = useAppSelector((state) => state.userR);
  return (
    <div className='container-full'>
      <AdminSidebar />
      <div className='main-content'>
        <div className='profile'>
          <h3>Hello..{user.firstname}</h3>
        </div>
      </div>
    </div>
  )
}
