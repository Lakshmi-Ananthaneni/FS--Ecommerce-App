import React from 'react'

import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { addToCart , removeItemFromCart} from 'features/cartSlice';
import { PaymentInfo } from 'components/PaymentInfo';

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

export const Cart = () => {
  const dispatch = useAppDispatch();
  const {cartItems} = useAppSelector((state) => state.cartR)
  const { user, error, loading } = useAppSelector((state) => state.userR);
  
  return (
    <main className='cart'>
      <div className='cart-title center'>
        <h4>Hello {user.firstname} , you have{" "}
            {cartItems.length >= 1 ? cartItems.length : 0} items to checkout </h4>
      </div>
      <div className='cart-main'>
        <div className='cart-items'>
        { cartItems.map((cartItem) => (
          <div className='cart-card'>
            <div className='cart-left'>
            <img src={cartItem?.image} alt={cartItem?.image} style={{ width: "30%", height:"auto"}}/>
            </div>
            <div className='cart-right'>
             <p> {cartItem.name.substring(0, 20)}...</p>
             <p> {cartItem.quantity}</p>
              <p>{cartItem.price.toLocaleString("dn-DK",{
                   style: "currency",
                   currency:"EUR",
              })}  </p>   
             </div>
              <Add  onClick={() => dispatch(addToCart(cartItem))}
               style={{ backgroundColor: '#e03a3c' }}
               className='icons__cart  m-2 rounded-circle text-white p-1 cursor-pointer'
               />
                <Remove  onClick={() => dispatch(removeItemFromCart(cartItem._id))}
                  style={{ backgroundColor: '#e03a3c' }}
                  className={`icons__cart m-2 rounded-circle text-white p-1 cursor-pointer `}
                />
            </div>
            ))
            }
            <Hr />
         </div>
     
        <div className='cart-sidebar'>
       <PaymentInfo />
        </div>
      </div>
    </main>
  )
}
