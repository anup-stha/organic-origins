import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "userList",
  initialState: {
    info: [],
    loading: false,
    error: null,
    userDelete: {
      loading: false,
      success: false,
      error: null,
    },
    userUpdate: {
      loading: false,
      success: false,
      error: null,
    },
  },

  reducers: {
    userListRequested: (userList, action) => {
      userList.loading = true;
    },
    userListRequestSuccess: (userList, action) => {
      userList.info = action.payload;
      userList.loading = false;
    },
    userListRequestFailed: (userList, action) => {
      userList.loading = false;
      userList.error = action.payload;
    },
    userListReset: (userList, action) => {
      userList.info = [];
    },
    userDeleteRequested: (userList, action) => {
      userList.userDelete.loading = true;
    },
    userDeleteRequestSuccess: (userList, action) => {
      userList.userDelete.loading = false;
      userList.userDelete.success = true;
    },
    userDeleteRequestFailed: (userList, action) => {
      userList.userDelete.loading = false;
      userList.userDelete.success = true;
      userList.userDelete.error = action.payload;
    },
    userUpdateRequested: (userList, action) => {
      userList.userUpdate.loading = true;
    },
    userUpdateRequestSuccess: (userList, action) => {
      userList.userUpdate.loading = false;
      userList.userUpdate.success = true;
    },
    userUpdateRequestFailed: (userList, action) => {
      userList.userUpdate.loading = false;
      userList.userUpdate.success = false;
      userList.userUpdate.error = action.payload;
    },
    userUpdateReset: (userList) => {
      userList.userUpdate = {
        user: {},
      };
    },
  },
});

export const {
  userListRequested,
  userListRequestSuccess,
  userListRequestFailed,
  userListReset,
  userDeleteRequested,
  userDeleteRequestSuccess,
  userDeleteRequestFailed,
  userUpdateRequested,
  userUpdateRequestSuccess,
  userUpdateRequestFailed,
  userUpdateReset,
} = slice.actions;
export default slice.reducer;

const url = "/api/users";

export const listUser = () => (dispatch, getState) => {
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
      method: "get",
      headers: config,

      onStart: userListRequested.type,
      onSuccess: userListRequestSuccess.type,
      onError: userListRequestFailed.type,
    })
  );
};

export const deleteUser = (id) => (dispatch, getState) => {
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
      onStart: userDeleteRequested.type,
      onSuccess: userDeleteRequestSuccess.type,
      onError: userDeleteRequestFailed.type,
    })
  );
};

export const updateUser = (id, user) => (dispatch, getState) => {
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
      method: "put",
      data: user,
      headers: config,
      onStart: userUpdateRequested.type,
      onSuccess: userUpdateRequestSuccess.type,
      onError: userUpdateRequestFailed.type,
    })
  );
};
