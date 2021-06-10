import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "productReview",
  initialState: {},
  reducers: {
    productCreateReviewRequested: (productReview, action) => {
      productReview.loading = true;
    },
    productCreateReviewRequestSuccess: (productReview, action) => {
      productReview.success = true;
      productReview.loading = false;
    },
    productCreateReviewRequestFailed: (productReview, action) => {
      productReview.loading = false;
      productReview.error = action.payload;
    },
    productReviewReset: (productReview) => {
      productReview = {};
    },
  },
});

export const {
  productCreateReviewRequestSuccess,
  productCreateReviewRequested,
  productCreateReviewRequestFailed,
  productReviewReset,
} = slice.actions;

export default slice.reducer;

export const createProductReview =
  (productId, review) => (dispatch, getState) => {
    const {
      users: {
        user: {
          currentUser: { info },
        },
      },
    } = getState();

    const config = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${info.token}`,
    };

    dispatch(
      apiCallBegan({
        url: `/api/products/${productId}/reviews`,
        method: "post",
        data: review,
        headers: config,
        onStart: productCreateReviewRequested.type,
        onSuccess: productCreateReviewRequestSuccess.type,
        onError: productCreateReviewRequestFailed.type,
      })
    );
  };
