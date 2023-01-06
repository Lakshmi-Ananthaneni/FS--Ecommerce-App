import React, { useEffect } from 'react'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminSidebar } from 'components/AdminSidebar'
import Products from 'components/Products';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchProducts } from 'features/productsSlice';
import { Productprops } from 'types';
import { Link } from 'react-router-dom';
import { Description } from '@material-ui/icons';

export const AllProducts = ({product}: Productprops) => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.productsR);
  const { productId,image,name, description,price, rating,sold ,quantity} = product;
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])
  return (
    <div className='container-full'>
    <AdminSidebar />
    <div className='main-content'>
      <div className='profile'>
        <h3>All Products </h3>
        <div className="products">
      {loading && <p>loading...</p>}
      {error && <p>Error!</p>}
      {products.map((product: any) => {
          return (
            <div className="product">
              <img className='image' src={product.image} alt={image} />
              <h5><Link to={`/product/${product._id}`} className="nameLink" ><b>{product.name}</b></Link> </h5>
              <p><b>Description:</b> {product.description.substring(0, 30)}....</p>
              <div className='details'>
               
                <p><b>Price:</b> {" "}
                   {product.price.toLocaleString("dn-DK",{
                    style: "currency",
                    currency:"EUR",
                    })}
                </p>
                <p><b>Rating:</b> {product.rating}</p>
              </div>
              <div className='product__btn'>
                <button type="submit" className='btn' >Edit</button>
                <button type="submit" className='btn'>Delete</button>
              </div>
            </div>
          );
        })}
     </div>
         
      </div>
    </div> 
  </div>
  )
}
