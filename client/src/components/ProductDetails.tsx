import { addToCart } from 'features/cartSlice';
import React from 'react'
import { useAppDispatch } from 'redux/hooks';

import { Productprops } from 'types';

const ProductDetails = ({product}: Productprops) => {
  const dispatch= useAppDispatch();
const { image,name, description, price, rating,category } = product;

const handleAddToCart = (product: any) => {
  dispatch(addToCart(product))
}
  return (
    <main className='product'>
      <div>
      <img className='image' src={image} alt={name} />
      </div>
      <div>
      <h5>{name}</h5>
      <p>Description: {description}</p>
      <p>Category: {category} </p>
      <p>Price: {""}
           {price.toLocaleString("dn-DK",{
            style: "currency",
            currency:"EUR",
            })}
        </p>
      <p>Rating: {rating}</p>

      <button type="submit" className='btn' 
          onClick={()=> { handleAddToCart(product)}}>
          Add To Cart
        </button>
        </div>
    </main>
  );
}

export default ProductDetails;