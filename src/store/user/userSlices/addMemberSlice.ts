import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { NoDataResponse } from 'src/utils/types/redux';
import { addMemberAsync } from '../userAsync';

const initialState: NoDataResponse = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
};

const addMemberSlice = createSlice({
  name: 'addMember',
  initialState,
  reducers: { resetAddMemberRequest: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(addMemberAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(addMemberAsync.fulfilled, (state) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'addMember successful';
      })
      .addCase(addMemberAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'addMember failed';
      });
  },
});

export const { resetAddMemberRequest } = addMemberSlice.actions;

export default addMemberSlice.reducer;
