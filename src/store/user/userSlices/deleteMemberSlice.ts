import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { NoDataResponse } from 'src/utils/types/redux';
import { deleteMemberAsync } from '../userAsync';

const initialState: NoDataResponse = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
};

const deleteMemberSlice = createSlice({
  name: 'deleteMember',
  initialState,
  reducers: {
    resetDeleteMemberRequest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteMemberAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(deleteMemberAsync.fulfilled, (state) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'deleteMember successful';
      })
      .addCase(deleteMemberAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'deleteMember failed';
      });
  },
});

export const { resetDeleteMemberRequest } = deleteMemberSlice.actions;

export default deleteMemberSlice.reducer;
