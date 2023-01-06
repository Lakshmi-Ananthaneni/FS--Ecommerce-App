import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchUser, setUser } from "../features/userSlice";
import { NavLink } from "react-router-dom";


const UserSidebar = () => {
  const dispatch = useAppDispatch();
  const { user, error, loading } = useAppSelector((state) => state.userR);
  const { firstname, lastname, email,phone } = user;

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="sidebar">
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      <h3 className="center">User Profile</h3>
      <div className="info">
        <i className="fa-solid fa-user fa-2x round"></i>
        <p> {firstname}</p>
        <p> {lastname}</p>
        <p>{email}</p>
        <p>{phone}</p>
      </div>

      <ul className="sidebar__lists">
        <li className="sidebar__list">
          <NavLink to ="/dashboard/user/edit-profile" style={{ color:"white" }}  state={user}>Edit Profile</NavLink>
        </li>
        <li className="sidebar__list">
          <NavLink to ="/dashboard/user/change-password" style={{ color:"white" }} >Change Password</NavLink>
        </li>
        
      </ul>
      
    </div>
  );
}

export default UserSidebar;