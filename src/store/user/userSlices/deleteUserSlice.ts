import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { NoDataResponse } from 'src/utils/types/redux';
import { deleteUserAsync } from '../userAsync';

const initialState: NoDataResponse = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
};

const deleteUserSlice = createSlice({
  name: 'deleteUser',
  initialState,
  reducers: {
    resetDeleteUserRequest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUserAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(deleteUserAsync.fulfilled, (state) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'deleteUser successful';
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'deleteUser failed';
      });
  },
});

export const { resetDeleteUserRequest } = deleteUserSlice.actions;

export default deleteUserSlice.reducer;
