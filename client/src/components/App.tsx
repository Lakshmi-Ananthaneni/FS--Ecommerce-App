import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminLogin } from 'pages/admin/AdminLogin';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {removeAdmin,setAdmin,
        setLoggedIn,setLoggedOut} from "../features/userSlice";
import {Home, Error, AboutUs,  Contact,
         Register, ForgotPassword, ResetPassword,Activate,Profile,
        Cart, Product, AdminDashboard, Shop, Login, Search, ShippingInfo} from '../pages';
import Footer from './Footer';
import Navbar from './Navbar';
//import { AdminRoute } from "router/AdminRoute";
import { Category } from "pages/admin/Category";
import { CreateProduct } from "pages/admin/CreateProduct";
import { AllProducts } from "pages/admin/AllProducts";
//import { AllCategories } from "pages/admin/AllCategories";
import { RunningText } from "./RunningText";
import { UserDashboard } from "pages/users/UserDashboard";
import { EditProfile } from "pages/users/EditProfile";
import { ChangePasswordd } from "pages/users/ChangePassword";


const App = () => {
  const { isLoggedIn, isAdmin } = useAppSelector((state) => state.userR);
  
  return (
    <BrowserRouter>
    <RunningText />
    <Navbar />
    
    <main className='main'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        {!isLoggedIn && (
            <>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        </>
        )}
        <Route path ="/activate-account/:token" element= {<Activate/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path ="/admin-login" element= {<AdminLogin />} />
        
        <Route path ="/dashboard/admin" element= {<AdminDashboard />} />
        <Route path ="/dashboard/admin/category" element= {<Category />} />
        <Route path ="/dashboard/admin/product" element= {<CreateProduct />} />
        <Route path ="/dashboard/admin/products" element= {<AllProducts product={{
            _id: "",
            productId: "",
            image: "",
            name: "",
            description: "",
            price: 0,
            category: "",
            rating: 0,
            available: false,
            sold: 0,
            quantity: 0
          }}  />} />
        
        
        {/*<Route path ="/dashboard" element= {<AdminRoute />}>
           <Route path ="admin" element= {<AdminDashboard />} />
           <Route path ="admin/category" element= {<CreateCategory />} />
           <Route path ="admin/product" element= {<CreateProduct />} />
        </Route> */}

        <Route path ="/dashboard/user" element= {<UserDashboard />} />
        <Route path ="/dashboard/user/edit-profile" element= {<EditProfile />} />
        <Route path ="/dashboard/user/change-password" element= {<ChangePasswordd />} />

        <Route path="/products" element={<Shop />} />
        <Route path="/product/:_id" element={<Product />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<ShippingInfo />} />
        <Route path="*" element={<Error />} />
      </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}
export default App
