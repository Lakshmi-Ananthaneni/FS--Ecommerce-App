import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cartSlice from 'features/cartSlice';
import categorySlice from 'features/categorySlice';
import productsSlice from 'features/productsSlice';
import userSlice from 'features/userSlice';
import {
  listenerMiddleware,
  listenerMiddlewareTwo,
} from "../middlewares/middleware";

//const userState = JSON.parse(localStorage.getItem("loggedIn") || "null");

export const store = configureStore({
  
  reducer: {
    userR: userSlice,
    productsR: productsSlice,
    cartR: cartSlice,
    categoryR: categorySlice,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .prepend(listenerMiddleware.middleware)
    .prepend(listenerMiddlewareTwo.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
