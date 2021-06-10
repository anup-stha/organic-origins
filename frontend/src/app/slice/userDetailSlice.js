import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "userDetail",
  initialState: {
    user: {},
    loading: false,
    error: null,

    success: false,
  },
  reducers: {
    userDetailRequested: (userDetail, action) => {
      userDetail.loading = true;
    },
    userDetailRequestSuccess: (userDetail, action) => {
      userDetail.user = action.payload;
      userDetail.loading = false;
    },
    userDetailRequestFailed: (userDetail, action) => {
      userDetail.loading = false;
      userDetail.error = action.payload;
    },

    userDetailReset: (userDetail, action) => {
      userDetail = {
        user: {},
        loading: false,
        error: null,

        success: false,
      };
    },
  },
});

export const {
  userDetailRequested,
  userDetailRequestSuccess,
  userDetailRequestFailed,
  userDetailReset,
} = slice.actions;

export default slice.reducer;

const url = "/api/users";

export const getUserDetails = (id) => (dispatch, getState) => {
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
      url: `${url}/${id}`,
      method: "get",
      headers: config,
      onStart: userDetailRequested.type,
      onSuccess: userDetailRequestSuccess.type,
      onError: userDetailRequestFailed.type,
    })
  );
};
