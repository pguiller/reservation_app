import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from './authSlices/loginSlice';
import logoutSlice from './authSlices/logoutSlice';
import userInfosSlice from './authSlices/userInfosSlice';

const authReducer = combineReducers({
  login: loginSlice,
  logout: logoutSlice,
  userInfos: userInfosSlice,
});

export default authReducer;
