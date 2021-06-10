import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

import { orderListUserReset } from "./orderSlice";
import { userDetailReset } from "./userDetailSlice";
import { userListReset } from "./userListSlice";

const slice = createSlice({
  name: "user",
  initialState: {
    currentUser: {
      info: {
        name: null,
      },
      loading: false,
      error: null,
      success: false,
    },
    newUser: {
      info: null,
      loading: false,
      error: null,
    },

    userDelete: {},
  },
  reducers: {
    userLoginRequested: (user, action) => {
      user.currentUser.loading = true;
    },
    userLoginRequestSuccess: (user, action) => {
      user.currentUser.info = action.payload;
      user.newUser.loading = false;
      user.currentUser.loading = false;
      localStorage.setItem("userInfo", JSON.stringify(user.currentUser.info));
    },
    userLoginRequestFailed: (user, action) => {
      user.currentUser.loading = false;
      user.currentUser.error = action.payload;
    },
    userLogOut: (user, action) => {
      user.currentUser.info = null;
      user.currentUser.error = null;
      localStorage.removeItem("userInfo");
    },
    userRegisterRequested: (user, action) => {
      user.newUser.loading = true;
    },

    userRegisterRequestFailed: (user, action) => {
      user.newUser.loading = false;
      user.newUser.error = action.payload;
    },
    userUpdateProfileRequested: (user, action) => {
      user.currentUser.loading = true;
    },
    userUpdateProfileRequestSuccess: (user, action) => {
      user.currentUser.info = action.payload;
      user.currentUser.loading = false;
      user.currentUser.success = true;
    },
    userUpdateProfileRequestFailed: (user, action) => {
      user.currentUser.loading = false;
      user.currentUser.error = action.payload;
    },
    userUpdateProfileReset: (user, action) => {
      user.currentUser = {
        info: {
          name: null,
        },
        loading: false,
        error: null,

        success: false,
      };
    },
  },
});

export const {
  userLoginRequested,
  userLoginRequestSuccess,
  userLoginRequestFailed,
  userRegisterRequestFailed,
  userRegisterRequested,
  userLogOut,
  userUpdateProfileRequestFailed,
  userUpdateProfileRequested,
  userUpdateProfileReset,
  userUpdateProfileRequestSuccess,
} = slice.actions;
export default slice.reducer;

const url = "/api/users";

export const loginUser = (email, password) => (dispatch) => {
  const config = {
    "Content-Type": "application/json",
  };

  dispatch(
    apiCallBegan({
      url: `${url}/login`,
      method: "post",
      headers: config,
      data: { email, password },
      onStart: userLoginRequested.type,
      onSuccess: userLoginRequestSuccess.type,
      onError: userLoginRequestFailed.type,
    })
  );
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  localStorage.clear();
  dispatch(orderListUserReset());
  dispatch(userDetailReset());
  dispatch(userListReset());
  dispatch(userLogOut());
};

export const registerUser =
  (name, email, password, image) => (dispatch, getState) => {
    const config = {
      "Content-Type": "application/json",
    };

    dispatch(
      apiCallBegan({
        url: `${url}/`,
        method: "post",
        headers: config,
        data: { name, email, password, image },
        onStart: userRegisterRequested.type,
        onSuccess: userLoginRequestSuccess.type,
        onError: userRegisterRequestFailed.type,
      })
    );
    if (!getState().users.user.currentUser.info === null) {
      dispatch(loginUser(email, password));
    }
  };
export const updateUserDetails = (user) => (dispatch, getState) => {
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
      url: `${url}/profile`,
      method: "put",
      data: user,
      headers: config,
      onStart: userUpdateProfileRequested.type,
      onSuccess: userUpdateProfileRequestSuccess.type,
      onError: userUpdateProfileRequestFailed.type,
    })
  );
};
