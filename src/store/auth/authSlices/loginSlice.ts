import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { decodeToken } from 'src/utils/functions';
import { loginlAsync } from '../authAsync';
import { AuthState } from '../types';

const initialState: AuthState = {
  user: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginlAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(loginlAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'login successful';
        state.user = decodeToken(action.payload.access);
        state.token = action.payload.access;
      })
      .addCase(loginlAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'login failed';
      });
  },
});

export const { resetLoginRequest } = loginSlice.actions;

export default loginSlice.reducer;
