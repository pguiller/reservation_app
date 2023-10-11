import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from './authSlices/loginSlice';
import registerSlice from './authSlices/registerSlice';
import resetPasswordSlice from './authSlices/resetPasswordSlice';

const authReducer = combineReducers({
  login: loginSlice,
  register: registerSlice,
  resetPassword: resetPasswordSlice,
});

export default authReducer;
