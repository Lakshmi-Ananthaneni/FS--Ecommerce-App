import React, { useEffect, useCallback } from "react";

import axios from "axios";
// import { UserProfile } from "../types/types";
import { refreshUser } from "../services/userService";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchUser, setUser } from "../features/userSlice";
import { NavLink } from "react-router-dom";
axios.defaults.withCredentials = true;

export const AdminSidebar = () => {
  const dispatch = useAppDispatch();
  const { user, error, loading } = useAppSelector((state) => state.userR);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="sidebar">
      
      <h3 className="center">Admin Profile</h3>
      <div className="info">
        <i className="fa-solid fa-user fa-2x round"></i>
        <p> {user.firstname}</p>
        <p>{user.email}</p>
      </div>

      <ul className="sidebar__lists">
        <li className="sidebar__list">
          <NavLink to ="/dashboard/admin/category" style={{ color:"white" }}>Category</NavLink>
        </li>
        <li className="sidebar__list">
          <NavLink to ="/dashboard/admin/product" style={{ color:"white" }}> Create Product</NavLink>
        </li>
        <li className="sidebar__list">
          <NavLink to ="/dashboard/admin/products" style={{ color:"white" }}>List of Products</NavLink>
        </li>
      </ul>
      
    </div>
  );
};

/*<li className="sidebar__list">
          <NavLink to ="/dashboard/admin/categories" style={{ color:"white" }}>List of Categories</NavLink>
        </li> */