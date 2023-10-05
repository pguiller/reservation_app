import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { AuthState } from '../types';
import { logoutlAsync } from '../authAsync';

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

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutlAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(logoutlAsync.fulfilled, (state) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'logout successful';
        state.user = null;
        state.token = null;
      })
      .addCase(logoutlAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'logout failed';
      });
  },
});

export default logoutSlice.reducer;
