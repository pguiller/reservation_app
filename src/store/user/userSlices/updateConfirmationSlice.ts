import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { NoDataResponse } from 'src/utils/types/redux';
import { updateConfirmationAsync } from '../userAsync';

const initialState: NoDataResponse = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
};

const updateConfirmationSlice = createSlice({
  name: 'updateConfirmation',
  initialState,
  reducers: { resetUpdateConfirmationRequest: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(updateConfirmationAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(updateConfirmationAsync.fulfilled, (state) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'updateConfirmation successful';
      })
      .addCase(updateConfirmationAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'updateConfirmation failed';
      });
  },
});

export const { resetUpdateConfirmationRequest } =
  updateConfirmationSlice.actions;

export default updateConfirmationSlice.reducer;
