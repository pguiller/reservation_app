import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { loginlAsync } from '../authAsync';
import { AuthState } from '../types';

const initialState: AuthState = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  token: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetLoginRequest: () => initialState,
    resetLoginRequestStatus: (state) => {
      state.status = ReduxStatus.Idle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginlAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(loginlAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'Login successful';
        state.token = action.payload;
      })
      .addCase(loginlAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'login failed';
      });
  },
});

export const { resetLoginRequest, resetLoginRequestStatus } =
  loginSlice.actions;

export default loginSlice.reducer;
