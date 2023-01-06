import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateCart } from "types";

const initialState: InitialStateCart = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state,action) => {
      state.totalQuantity += 1;
      state.cartItems.push(action.payload)
      state.totalAmount += action.payload.price * action.payload.totalQuantity;
      localStorage.setItem("cart", JSON.stringify(state))
    },
    removeItemFromCart : (state,action) => {
      state.totalQuantity -= 1;
       const id= action.payload;
       state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== id  );
        state.totalAmount += action.payload.price * action.payload.totalQuantity;
        //(cartItem) => cartItem._id !== id  );
       localStorage.setItem("cart", JSON.stringify(state))
    },
  },
});

export const {addToCart,removeItemFromCart} = cartSlice.actions;
export default cartSlice.reducer;
