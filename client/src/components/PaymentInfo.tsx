import React, { useEffect, useState } from 'react'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import DropIn from "braintree-web-drop-in-react";
import { getBrainClientToken, processBraintreePayment } from 'services/adminService';
import { useLocation, useNavigate } from 'react-router-dom';

export const PaymentInfo = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {cartItems} = useAppSelector((state) => state.cartR)
    const totalQuantity=useAppSelector(state => state.cartR.totalQuantity);
    const {user} = useAppSelector((state) => state.userR)
    //console.log(cartItems)
    const [braintreeToken, setBraintreeToken] = useState("");
    const [instance, setInstance] = useState<any | undefined>("");

    const { state } = useLocation();
    const totalAmount = state;

    const getTotalAmount = () => {
    let totalAmount = 0;
    cartItems.map((cartItem) => totalAmount = totalAmount + cartItem.price)
    return totalAmount.toLocaleString("dn-DK",
        {
            style:"currency",
            currency:"EUR",
        })
    }
    
    const getBraintreeClientToken = async() => {
      try {
        const res = await getBrainClientToken();
        console.log(res)
        setBraintreeToken(res.clientToken);
      }catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
    useEffect(() => {
      getBraintreeClientToken()
    },[])
   
    const handlePayment = async () => {
      try {
        /*const { nonce } = await instance.requestPaymentMethod();
        const res = await processBraintreePayment(nonce, totalAmount);
        if (res.status === 200) {*/
          toast.success("Payment successfull");
          navigate("/");
           cartItems.length=0
        
      } catch (error: any) {
        console.log(error);
      }
    }
    
  return (
    <div className='cart-card vertical'>
      <h4>Payment Info</h4>
      <h5>Total Amount: {getTotalAmount()}</h5>
      <h5>Address: Denmark</h5>
      <button> Update Your delivery address</button>
      <div>
      
      {!braintreeToken ? ( "" ) : ( 
      <>
      <DropIn
      /*options={{ authorization: braintreeToken,paypal: {
        flow:"vault"
      } }} */
      options={{ authorization: braintreeToken }}
      onInstance={(instance) => setInstance(instance)}
    />
      </>
      )}
      </div>
      
      <button className='btn' onClick={()=> {handlePayment()}}>Pay Now</button>
    </div>
  )
}
