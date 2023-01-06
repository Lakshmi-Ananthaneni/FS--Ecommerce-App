import React from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { addToCart } from 'features/cartSlice';
import { Productprops } from 'types';
import { Badge } from './Badge';

const ProductList = ({product}: Productprops) => {
  const dispatch= useAppDispatch();
  const navigate = useNavigate();
  const { productId,image,name, price, rating,sold ,quantity} = product;
  
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product))
  }
  
  const handleClick = () => {
   navigate(`/product/${product._id}`);
    }
 
  return (
    <div className="product">
      <img className='image' src={image} alt={image} onClick={() => handleClick()}/>
      <h5><Link to={`/product/${product._id}`} className="nameLink" >{name}</Link> </h5>
      <div className='details'>
        <p>Price: {" "}
           {price.toLocaleString("dn-DK",{
            style: "currency",
            currency:"EUR",
            })}
        </p>
        <p>Rating: {rating}</p>
      </div>
      <div className='product__btn'>
        <button type="submit" className='btn' onClick={() => handleClick()}>Detailes</button>
        <button type="submit" className='btn' 
          onClick={()=> { handleAddToCart(product)}}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductList;
/*<Badge sold = {sold}
          quantity = {quantity}/> */