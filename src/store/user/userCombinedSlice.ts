import { combineReducers } from '@reduxjs/toolkit';
import getUserSlice from './userSlices/getUsersSlice';
import addMemberSlice from './userSlices/addMemberSlice';
import getUserByIdSlice from './userSlices/getUserByIdSlice';
import updateConfirmationSlice from './userSlices/updateConfirmationSlice';
import deleteUserSlice from './userSlices/deleteUserSlice';
import deleteMemberSlice from './userSlices/deleteMemberSlice';

const userReducer = combineReducers({
  getUser: getUserSlice,
  addMember: addMemberSlice,
  getUserById: getUserByIdSlice,
  updateConfirmation: updateConfirmationSlice,
  deleteUser: deleteUserSlice,
  deleteMember: deleteMemberSlice,
});

export default userReducer;
