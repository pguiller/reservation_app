import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { getUserByIdsAsync } from '../userAsync';
import { GetUserByIdRequest } from '../types';

const initialState: GetUserByIdRequest = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: {
    id: 0,
    idCreator: 0,
    firstname: '',
    lastname: '',
    confirmation: false,
    confirmation_dej: false,
    confirmation_balade: false,
    confirmation_diner: false,
  },
};

const getUserByIdSlice = createSlice({
  name: 'getUserById',
  initialState,
  reducers: {
    resetGetUserByIdRequest: () => initialState,
    // addMembersToUser: (state, action) => {
    //   const { member } = action.payload;
    //   const newData = [...state.data.members];

    //   newData.push(member);
    //   state.data.members = newData;
    // },
    // removeMembersToUser: (state, action) => {
    //   const { id } = action.payload;
    //   const newData = [...state.data.members];

    //   const indexToRemove = newData.findIndex((member) => member.id === id);

    //   if (indexToRemove !== -1) {
    //     newData.splice(indexToRemove, 1);
    //     state.data.members = newData;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserByIdsAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(getUserByIdsAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'getUserById successful';
        state.data = action.payload;
      })
      .addCase(getUserByIdsAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'getUserById failed';
      });
  },
});

export const {
  resetGetUserByIdRequest,
  // addMembersToUser,
  // removeMembersToUser,
} = getUserByIdSlice.actions;

export default getUserByIdSlice.reducer;
