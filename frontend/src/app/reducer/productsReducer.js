import { combineReducers } from "redux";
import productDetailsReducer from "../slice/productDetailSlice";
import productReviewReducer from "app/slice/productReviewSlice";

import productListReducer from "../slice/productListSlice";
export default combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReview: productReviewReducer,
});
