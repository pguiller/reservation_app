import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { resetPasswordAsync } from '../authAsync';
import { NoDataResponse } from 'src/utils/types/redux';

const initialState: NoDataResponse = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    resetResetPasswordRequest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'resetPassword successful';
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'resetPassword failed';
      });
  },
});

export const { resetResetPasswordRequest } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
