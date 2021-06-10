import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";

let cartItemsFromStorage;
let UserInfoFromStorage;
let ShippingAddressFromStorage;

cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

UserInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

ShippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: ShippingAddressFromStorage,
    paymentMethod: "Paypal",
  },
  users: {
    user: {
      currentUser: {
        info: UserInfoFromStorage,
        error: null,
      },
      newUser: {
        info: null,
        error: null,
      },
    },
  },
};
export const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: [...getDefaultMiddleware(), api],
  devTools: process.env.NODE_ENV !== "production",
});
