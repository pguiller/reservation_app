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
    firstname: '',
    lastname: '',
    confirmation: null,
    members: [],
  },
};

const getUserByIdSlice = createSlice({
  name: 'getUserById',
  initialState,
  reducers: {
    resetGetUserByIdRequest: () => initialState,
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

export const { resetGetUserByIdRequest } = getUserByIdSlice.actions;

export default getUserByIdSlice.reducer;
