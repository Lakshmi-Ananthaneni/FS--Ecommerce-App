import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeAdmin,setAdmin,
  setLoggedIn,setLoggedOut,
} from "../features/userSlice";
import { logoutUser } from "../services/userService";

import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Link, useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import axios from 'axios';


const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useAppSelector((state) => state.userR);
  const { isLoggedIn, isAdmin } = useAppSelector((state) => state.userR);
  
const totalQuantity=useAppSelector(state => state.cartR.totalQuantity);;
  
const handleLogout = async () => {
  dispatch(setLoggedOut());
  navigate("/login");
  try {
      const res = await logoutUser();
      if (res.status === 200) {
        dispatch(setLoggedOut());
        navigate("/login");
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
  <header className="header">
    <h4 className ="logo">FASHION<span className="span">CUBE</span></h4>
    <div><SearchBar /></div>
    
    <nav >
      <ul className="navbar_links">
       <li><Link to ="/" className=" link">Home</Link></li>
       {!isLoggedIn && (
         <>
          <li><Link to ="/login" className ="link">Login</Link></li>
          <li><Link to ="/register" className ="link">Register</Link></li>
          </>
        )}
          
       <li><Link to ="/products" className ="link">Shop</Link></li>
       <li><Link to='/cart' className ="link" >
          <Badge badgeContent={totalQuantity >= 1 ? totalQuantity : 0} color="primary">
                <ShoppingCartOutlined />
          </Badge>
        </Link></li>
        {isLoggedIn && (
          <div className='dropdown'>
            <button className="dropbtn">{user.firstname}</button>
            <ul className='dropdown-content'>
             <li><Link to="/" onClick={handleLogout} className="link">Logout
                </Link>
              </li>
              <li>
              <Link to={`/dashboard/${isAdmin !== 1 ? "user" : "admin"}`}  className="link">
                  Dashboard
              </Link>
              </li>
            </ul>
          </div>
      )} 
      </ul>
   </nav>
  </header>
  );
};

export default Navbar;


    
 
/*<li><Link to={`dashboard/${isAdmin === 1} ? "admin" : "user"`} onClick={handleLogout} className="link">{user.firstname}
          </Link></li> 
          li><Link to="/" onClick={handleLogout} className="link">Logout
          </Link></li>*/