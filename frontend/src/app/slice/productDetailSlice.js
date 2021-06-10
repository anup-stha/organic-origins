import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "productDetails",
  initialState: {
    product: {
      reviews: [],
    },
    loading: false,

    error: null,
  },
  reducers: {
    productDetailsRequested: (productDetails, action) => {
      productDetails.loading = true;
    },
    productDetailsReceived: (productDetails, action) => {
      productDetails.product = action.payload;
      productDetails.loading = false;
    },
    productDetailsRequestFailed: (productDetails, action) => {
      productDetails.loading = false;
      productDetails.error = action.payload;
    },
  },
});

const {
  productDetailsReceived,
  productDetailsRequested,
  productDetailsRequestFailed,
} = slice.actions;
export default slice.reducer;

const url = "/api/products";

export const loadProductDetails = (id) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `${url}/${id}`,
      onStart: productDetailsRequested.type,
      onSuccess: productDetailsReceived.type,
      onError: productDetailsRequestFailed.type,
    })
  );
};
