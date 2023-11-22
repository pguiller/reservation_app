import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { getUserByCreatorAsync } from '../userAsync';
import { GetUserByCreatorRequest } from '../types';

const initialState: GetUserByCreatorRequest = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: [],
};

const getUserByCreatorSlice = createSlice({
  name: 'getUserById',
  initialState,
  reducers: {
    resetGetUserByIdRequest: () => initialState,
    addItemUserCreatorList: (state, action) => {
      const { user } = action.payload;
      const newData = [user, ...state.data];

      state.data = newData;
    },
    removeItemUserCreatorList: (state, action) => {
      const id = action.payload;

      state.data = state.data.filter((item, index) => index !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserByCreatorAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(getUserByCreatorAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'getUserById successful';
        state.data = action.payload;
      })
      .addCase(getUserByCreatorAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'getUserById failed';
      });
  },
});

export const {
  resetGetUserByIdRequest,
  addItemUserCreatorList,
  removeItemUserCreatorList,
} = getUserByCreatorSlice.actions;

export default getUserByCreatorSlice.reducer;
