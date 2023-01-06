import UserSidebar from 'components/UserSidebar';
import React from 'react'


import { useAppSelector } from 'redux/hooks';
import { Profile } from './Profile';

export const UserDashboard = () => {
  const { user, error, loading } = useAppSelector((state) => state.userR);
  return (
    <main className='container-full'>
      <UserSidebar />
      <div className='main-content'>
        <div className='profile'>
          <h3>Hello..{user.firstname}</h3>
        </div>
      </div>
    </main>
  )
}
