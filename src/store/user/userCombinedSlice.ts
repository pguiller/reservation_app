import { combineReducers } from '@reduxjs/toolkit';
import getUserSlice from './userSlices/getUsersSlice';
import getUserByIdSlice from './userSlices/getUserByIdSlice';
import updateConfirmationSlice from './userSlices/updateConfirmationSlice';
import deleteUserSlice from './userSlices/deleteUserSlice';
import addFakeUserSlice from './userSlices/addFakeUser';
import getUserByCreatorSlice from './userSlices/getUserByCreatorSlice';

const userReducer = combineReducers({
  getUser: getUserSlice,
  getUserById: getUserByIdSlice,
  getUsersByCreator: getUserByCreatorSlice,
  updateConfirmation: updateConfirmationSlice,
  deleteUser: deleteUserSlice,
  addFakeUser: addFakeUserSlice,
});

export default userReducer;
