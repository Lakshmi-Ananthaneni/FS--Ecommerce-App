import React, { useEffect, useState } from "react";
import axios from "axios";

// import { UserProfile } from "../types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUser, setUser } from "../../features/userSlice";
import { UserProfile } from "types";
import { CollectionsOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

export const Profile = () => {
  const { user, error, loading } = useAppSelector((state) => state.userR);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  //console.log(fetchUser)

  return ( 
    <main className="profile">
      <section className="profile__section">
      {loading && <p>Loading...</p>}
        {error && <p>Error</p>}
        <h1>User Profile</h1>
        <p>First Name:{user?.firstname}</p>
        <p>Last Name: {user?.lastname}</p>
        <p>Email: {user?.email}</p>
        <p>Phone:{user?.phone}</p>
        <div>
        <Link to="/dashboard/edit-profile" state={{ user: user }}>
          Edit Profile
        </Link>
        <Link to="/dashboard/change-password" state={{ user: user }}>
          Change Password
        </Link>
        </div>
      </section>
    </main>
  );
};












/*const [user, setUser] = useState<UserProfile>()
  const sendRequset = async()=> {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/users/profile",
      {
        withCredentials: true,
      })
      setUser(response.data.user)
      console.log(response.data.user)
      return response.data
  }catch(error: any) {
    toast.error(error.response.data.message);
  }
  }
  useEffect(() => {
    sendRequset()
  }, []);*/