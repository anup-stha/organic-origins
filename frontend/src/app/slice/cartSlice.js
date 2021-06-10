import { createSlice, current } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    shippingAddress: {},

    error: null,
  },
  reducers: {
    addedCartItem: (cart, action) => {
      const item = action.payload;
      const productDetails = {
        product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        countInStock: item.countInStock,
        qty: Number(item.qty),
      };
      const existItem = current(cart.cartItems).find(
        (x) => x.product === productDetails.product
      );
      if (existItem) {
        const index = cart.cartItems.findIndex(
          (x) => x.product === productDetails.product
        );
        cart.cartItems[index].qty += Number(item.qty);
      } else {
        cart.cartItems.push(productDetails);
      }

      localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
    },

    editedCartItem: (cart, action) => {
      const item = action.payload;
      const productDetails = {
        product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        countInStock: item.countInStock,
        qty: item.qty,
      };

      const index = cart.cartItems.findIndex(
        (x) => x.product === productDetails.product
      );
      cart.cartItems[index].qty = item.qty;

      localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
    },

    removedCartItem: (cart, action) => {
      const filteredCart = cart.cartItems.filter(
        (x) => x.product !== action.payload
      );
      cart.cartItems = filteredCart;
      localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
    },

    savedShippingAddress: (cart, action) => {
      cart.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    savedPaymentMethod: (cart, action) => {
      cart.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    },

    clearCart: (cart, action) => {
      cart.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  editedCartItem,
  addedCartItem,
  removedCartItem,
  savedShippingAddress,
  savedPaymentMethod,
  clearCart,
} = slice.actions;

const url = "/api/products";
export const addToCart = (id, qty) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `${url}/${id}`,
      onSuccess: addedCartItem.type,
      itemName: "qty",
      items: qty,
    })
  );
};

export const editCart = (id, qty) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `${url}/${id}`,
      onSuccess: editedCartItem.type,
      itemName: "qty",
      items: qty,
    })
  );
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(removedCartItem(id));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(savedShippingAddress(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(savedPaymentMethod(data));
};

export default slice.reducer;
