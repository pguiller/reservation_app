import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { NoDataResponse } from 'src/utils/types/redux';
import { addFakeUserAsync } from '../userAsync';

const initialState: NoDataResponse = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
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
      .addCase(addFakeUserAsync.fulfilled, (state) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'addFakeUser successful';
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
