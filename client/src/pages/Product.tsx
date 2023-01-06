import React, { useEffect, useState } from 'react'

import { fetchProducts } from "../features/productsSlice"
import { useAppDispatch, useAppSelector } from "redux/hooks";
import ProductDetails from 'components/ProductDetails'
import { useNavigate, useParams } from 'react-router-dom';
import { Productprops, Products } from 'types';
import axios from 'axios';
import { addToCart } from 'features/cartSlice';

export const Product = () => {
  const dispatch= useAppDispatch();
  const params = useParams()
  const navigate = useNavigate();
  const [product, setProduct] = useState<Products>()
  const fetchProductById = async (_id: string | undefined) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/products/${params._id}`)
      //console.log(response)
      setProduct(response.data)
    } catch (error: any) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchProductById(params._id)
  }, [])
  //console.log(product)
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product))
  }

  return (
    <main className='product__page'>
      <div>
      <img className='image' src={product?.image} alt={product?.image} style={{ width: "45%"}}/>
      </div>
      <div className='product__details'>
      <h5>{product?.name}</h5>
      <p><b>Description:</b> {product?.description}</p>
      <p><b>Category:</b> {product?.category} </p>
      <p><b>Price:</b>{""}
           {product?.price.toLocaleString("dn-DK",{
            style: "currency",
            currency:"EUR",
            })}
        </p>
      <p><b>Rating:</b> {product?.rating}</p>
      <button type="submit" className='btn' 
          onClick={()=> { handleAddToCart(product)}}>
          <b>Add To Cart</b>
        </button>
        <button type="submit" className={`btn m-4`} 
          onClick={()=> {  navigate(`/products`);}}>
          <b>Back To Shop</b>
        </button>
      </div>
    </main>
  )
}
