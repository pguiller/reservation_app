import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { registerAsync } from '../authAsync';
import { NoDataResponse } from 'src/utils/types/redux';

const initialState: NoDataResponse = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetRegisterRequest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'register successful';
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'register failed';
      });
  },
});

export const { resetRegisterRequest } = registerSlice.actions;

export default registerSlice.reducer;
