import React from 'react'

import SearchIcon from '@mui/icons-material/Search';
import { Search } from "@material-ui/icons";
import { useState,ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SearchBar = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        
      };
    const handleSubmit = async (e: any) => {
      try {
        e.preventDefault();
        const res = await axios.get(`http://localhost:4000/api/v1/products/search/${searchValue}`, {
        withCredentials: true,
      })
      //console.log(res.data)
      navigate("/search",{state: res.data})
    } catch(error) {
        console.log(error)
      }
      /*if(keyword.trim()){
            navigate(`/products/${keyword}`)
        } else {
            navigate('/products');
        }*/
    }
  return (
    <div>
      <form className="searchBar" onSubmit={handleSubmit} >
        <input
          name="search"
          type="text"
          placeholder='search for products..'
          onChange={handleChange}
          value={searchValue}
        />
        <button type="submit" className='btn ' style={{background:"gray", color:"white", height:"3%"}} >Search</button>
      </form>
    </div>
  )
}



