import ProductList from 'components/ProductList'
import React from 'react'
import { useLocation } from 'react-router-dom'

export const Search = () => {
    const {state} = useLocation()
    console.log(state)
  return (
    <div className='products'>
   {state ? <ProductList  product={state} /> : <p>No products found</p>}
    </div>
  )
}
/* {state ? <ProductList  products={state} /> : <p>No products found</p>} */