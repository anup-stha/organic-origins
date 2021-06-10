import { combineReducers } from "redux";
import userReducer from "../slice/userSlice";
import userDetailReducer from "../slice/userDetailSlice";
import UserListReducer from "../slice/userListSlice";

export default combineReducers({
  user: userReducer,
  userDetail: userDetailReducer,
  userList: UserListReducer,
});
