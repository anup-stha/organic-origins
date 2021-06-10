import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "productList",
  initialState: {
    products: {
      list: [],
      page: 0,
      pages: 0,
    },
    loading: false,
    error: null,
    productDelete: { loading: false, error: null, success: false },
    productCreate: { loading: false, error: null, success: false, product: {} },
    productUpdate: { loading: false, error: null, success: false, product: {} },
  },
  reducers: {
    productListRequested: (productList, action) => {
      productList.loading = true;
    },
    productListReceived: (productList, action) => {
      productList.products.list = action.payload.products;
      productList.products.page = action.payload.page;
      productList.products.pages = action.payload.pages;
      productList.loading = false;
    },
    productListRequestFailed: (productList, action) => {
      productList.loading = false;
      productList.error = action.payload;
    },
    productDeleteRequested: (productList, action) => {
      productList.productDelete.loading = true;
      productList.productDelete.success = false;
    },
    productDeleteRequestSuccess: (productList, action) => {
      productList.productDelete.loading = false;
      productList.productDelete.success = true;
    },
    productDeleteRequestFailed: (productList, action) => {
      productList.productDelete.loading = false;
      productList.productDelete.error = action.payload;
    },
    productCreateRequested: (productList, action) => {
      productList.productCreate.loading = true;
    },
    productCreateRequestSuccess: (productList, action) => {
      productList.productCreate.loading = false;
      productList.productCreate.success = true;
      productList.productCreate.product = action.payload;
    },
    productCreateRequestFailed: (productList, action) => {
      productList.productCreate.loading = false;
      productList.productCreate.error = action.payload;
    },
    productCreateReset: (productList, action) => {
      productList.productCreate = {
        loading: false,
        error: null,
        success: false,
        product: {},
      };
    },
    productUpdateRequested: (productList, action) => {
      productList.productUpdate.loading = true;
    },
    productUpdateRequestSuccess: (productList, action) => {
      productList.productUpdate.loading = false;
      productList.productUpdate.success = true;
      productList.productUpdate.product = action.payload;
    },
    productUpdateRequestFailed: (productList, action) => {
      productList.productUpdate.loading = false;
      productList.productUpdate.error = action.payload;
    },
    productUpdateReset: (productList, action) => {
      productList.productUpdate = {
        loading: false,
        error: null,
        success: false,
        product: {},
      };
    },
  },
});

export const {
  productListReceived,
  productListRequested,
  productListRequestFailed,
  productDeleteRequested,
  productDeleteRequestSuccess,
  productDeleteRequestFailed,
  productCreateRequested,
  productCreateRequestSuccess,
  productCreateRequestFailed,
  productCreateReset,
  productUpdateRequested,
  productUpdateRequestSuccess,
  productUpdateRequestFailed,
  productUpdateReset,
} = slice.actions;
export default slice.reducer;

const url = "/api/products";

export const loadProductList =
  (keyword = "", pageNumber = "") =>
  (dispatch, getState) => {
    dispatch(
      apiCallBegan({
        url: `${url}?keyword=${keyword}&pageNumber=${pageNumber}`,
        onStart: productListRequested.type,
        onSuccess: productListReceived.type,
        onError: productListRequestFailed.type,
      })
    );
  };
export const deleteProduct = (id) => (dispatch, getState) => {
  const {
    users: {
      user: {
        currentUser: { info },
      },
    },
  } = getState();

  const config = {
    Authorization: `Bearer ${info.token}`,
  };

  dispatch(
    apiCallBegan({
      url: `${url}/${id}`,
      method: "delete",
      headers: config,
      onStart: productDeleteRequested.type,
      onSuccess: productDeleteRequestSuccess.type,
      onError: productDeleteRequestFailed.type,
    })
  );
};

export const createProduct = (id) => (dispatch, getState) => {
  const {
    users: {
      user: {
        currentUser: { info },
      },
    },
  } = getState();

  const config = {
    Authorization: `Bearer ${info.token}`,
  };

  dispatch(
    apiCallBegan({
      url: `${url}`,
      method: "post",
      data: {},
      headers: config,
      onStart: productCreateRequested.type,
      onSuccess: productCreateRequestSuccess.type,
      onError: productCreateRequestFailed.type,
    })
  );
};

export const updateProduct = (product) => (dispatch, getState) => {
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
      url: `${url}/${product._id}`,
      method: "put",
      data: product,
      headers: config,
      onStart: productUpdateRequested.type,
      onSuccess: productUpdateRequestSuccess.type,
      onError: productUpdateRequestFailed.type,
    })
  );
};
