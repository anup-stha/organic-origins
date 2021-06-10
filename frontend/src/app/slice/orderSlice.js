import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const initialState = {
  orderCreate: {
    info: null,
    loading: false,
    success: false,
    error: null,
  },
  orderDetails: {
    info: {
      orderItems: [],
      shippingAddress: {},
    },
    loading: false,
    error: null,
  },
  orderPay: {},
  orderListUser: {
    info: [],
    loading: false,

    error: null,
  },
  allOrders: {
    info: [],
    loading: false,
    error: null,
  },
  orderDeliver: {},
};

const slice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderCreateRequested: (order, action) => {
      order.orderCreate.loading = true;
    },
    orderCreateRequestSuccess: (order, action) => {
      order.orderCreate.loading = false;
      order.orderCreate.info = action.payload;
      order.orderCreate.success = true;
    },
    orderCreateRequestFailed: (order, action) => {
      order.orderCreate.loading = false;
      order.orderCreate.error = action.payload;
      order.orderCreate.success = false;
    },
    orderDetailsRequested: (order, action) => {
      order.orderDetails.loading = true;
    },
    orderDetailsRequestSuccess: (order, action) => {
      order.orderDetails.loading = false;
      order.orderDetails.info = action.payload;
    },
    orderDetailsRequestFailed: (order, action) => {
      order.orderDetails.loading = false;
      order.orderDetails.error = action.payload;
    },
    orderPayRequested: (order, action) => {
      order.orderPay.loading = true;
    },
    orderPayRequestSuccess: (order, action) => {
      order.orderPay.loading = false;
      order.orderPay.success = true;
    },
    orderPayRequestFailed: (order, action) => {
      order.orderPay.loading = false;
      order.orderPay.error = action.payload;
      order.orderPay.success = false;
    },
    resetPay: (order) => {
      order.orderPay = initialState;
    },
    orderListUserRequested: (order, action) => {
      order.orderListUser.loading = true;
    },
    orderListUserRequestSuccess: (order, action) => {
      order.orderListUser.loading = false;
      order.orderListUser.info = action.payload;
    },
    orderListUserRequestFailed: (order, action) => {
      order.orderListUser.loading = false;
      order.orderListUser.error = action.payload;
    },
    orderListUserReset: (order, action) => {
      order.orderListUser = {};
    },
    allOrdersListUserRequested: (order, action) => {
      order.allOrders.loading = true;
    },
    allOrdersListUserRequestSuccess: (order, action) => {
      order.allOrders.loading = false;
      order.allOrders.info = action.payload;
    },
    allOrdersListUserRequestFailed: (order, action) => {
      order.allOrders.loading = false;
      order.allOrders.error = action.payload;
    },
    orderDeliverRequested: (order, action) => {
      order.orderDeliver.loading = true;
    },
    orderDeliverRequestSuccess: (order, action) => {
      order.orderDeliver.loading = false;
      order.orderDeliver.success = true;
    },
    orderDeliverRequestFailed: (order, action) => {
      order.orderDeliver.loading = false;
      order.orderDeliver.error = action.payload;
      order.orderDeliver.success = false;
    },
    resetDeliver: (order) => {
      order.orderDeliver = {};
    },
  },
});

export const {
  orderCreateRequested,
  orderCreateRequestSuccess,
  orderCreateRequestFailed,
  orderDetailsRequested,
  orderDetailsRequestSuccess,
  orderDetailsRequestFailed,
  orderPayRequested,
  orderPayRequestSuccess,
  orderPayRequestFailed,
  resetPay,
  orderListUserRequested,
  orderListUserRequestSuccess,
  orderListUserRequestFailed,
  orderListUserReset,
  allOrdersListUserRequested,
  allOrdersListUserRequestSuccess,
  allOrdersListUserRequestFailed,
  orderDeliverRequested,
  orderDeliverRequestSuccess,
  orderDeliverRequestFailed,
  resetDeliver,
} = slice.actions;

export default slice.reducer;
const url = "/api/orders";

export const createOrder = (order) => (dispatch, getState) => {
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
      url: `${url}`,
      method: "post",
      headers: config,
      data: order,
      onStart: orderCreateRequested.type,
      onSuccess: orderCreateRequestSuccess.type,
      onError: orderCreateRequestFailed.type,
    })
  );
};

export const getOrderDetails = (id) => (dispatch, getState) => {
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
      method: "get",
      headers: config,
      onStart: orderDetailsRequested.type,
      onSuccess: orderDetailsRequestSuccess.type,
      onError: orderDetailsRequestFailed.type,
    })
  );
};

export const payOrder = (paymentResult, orderId) => (dispatch, getState) => {
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
      url: `${url}/${orderId}/pay`,
      method: "put",
      data: paymentResult,
      headers: config,
      onStart: orderPayRequested.type,
      onSuccess: orderPayRequestSuccess.type,
      onError: orderPayRequestFailed.type,
    })
  );
};

export const listUserOrder = () => (dispatch, getState) => {
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
      url: `${url}/myorders`,
      method: "get",
      headers: config,
      onStart: orderListUserRequested.type,
      onSuccess: orderListUserRequestSuccess.type,
      onError: orderListUserRequestFailed.type,
    })
  );
};

export const listAllOrder = () => (dispatch, getState) => {
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
      method: "get",
      headers: config,
      onStart: allOrdersListUserRequested.type,
      onSuccess: allOrdersListUserRequestSuccess.type,
      onError: allOrdersListUserRequestFailed.type,
    })
  );
};

export const deliverOrder = (orderId) => (dispatch, getState) => {
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
      url: `${url}/${orderId}/deliver`,
      method: "put",
      data: {},
      headers: config,
      onStart: orderDeliverRequested.type,
      onSuccess: orderDeliverRequestSuccess.type,
      onError: orderDeliverRequestFailed.type,
    })
  );
};
