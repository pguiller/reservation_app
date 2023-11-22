import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { addFakeUserAsync } from '../userAsync';
import { CreateFakeUserRequest } from '../types';

const initialState: CreateFakeUserRequest = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: {
    id: 0,
  },
};

const addFakeUserSlice = createSlice({
  name: 'addFakeUser',
  initialState,
  reducers: { resetAddFakeUserRequest: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(addFakeUserAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(addFakeUserAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'addFakeUser successful';
        state.data = action.payload;
      })
      .addCase(addFakeUserAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'addFakeUser failed';
      });
  },
});

export const { resetAddFakeUserRequest } = addFakeUserSlice.actions;

export default addFakeUserSlice.reducer;
