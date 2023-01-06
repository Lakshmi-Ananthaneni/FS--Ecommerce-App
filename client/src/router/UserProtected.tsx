import React from 'react'

import { Home } from 'pages';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';

const UserProtected = () => {
    const { isLoggedIn } = useAppSelector((state) => state.userR);
  return isLoggedIn ? <Outlet /> : <Home />
}

export default UserProtected