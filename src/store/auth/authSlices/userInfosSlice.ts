import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { getUserInfosRequest } from '../types';
import { getUserInfosAsync } from '../authAsync';

const initialState: getUserInfosRequest = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: {
    id: 0,
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    role: '',
    supervised_service: {
      id: 0,
      nom_service: '',
      pole: '',
      entite: '',
      manager: 0,
    },
  },
};

const userInfosSlice = createSlice({
  name: 'getUserInfos',
  initialState,
  reducers: {
    resetGetUserInfosRequest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfosAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(getUserInfosAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'getUserInfos successful';
        state.data = action.payload;
      })
      .addCase(getUserInfosAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'getUserInfos failed';
      });
  },
});

export const { resetGetUserInfosRequest } = userInfosSlice.actions;

export default userInfosSlice.reducer;
