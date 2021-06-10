import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import cartReducer from "../slice/cartSlice";
import usersReducer from "./usersReducer";
import orderReducer from "../slice/orderSlice";

export default combineReducers({
  products: productsReducer,
  cart: cartReducer,
  users: usersReducer,
  orders: orderReducer,
});
