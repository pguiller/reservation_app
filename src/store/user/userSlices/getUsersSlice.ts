import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { getUsersAsync } from '../userAsync';
import { GetUsersRequest } from '../types';

const initialState: GetUsersRequest = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: [],
};

const getUsersSlice = createSlice({
  name: 'getUsers',
  initialState,
  reducers: {
    resetGetUsersRequest: () => initialState,
    updateItemUserList: (state, action) => {
      const { user, id } = action.payload;
      const newData = [...state.data];

      newData[id] = user;
      state.data = newData;
    },
    addItemUserList: (state, action) => {
      const { user } = action.payload;
      const newData = [...user, ...state.data];

      state.data = newData;
    },
    removeItemUserList: (state, action) => {
      const { id } = action.payload;
      const newData = [...state.data];

      newData.splice(id);

      state.data = newData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'getUsers successful';
        state.data = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'getUsers failed';
      });
  },
});

export const {
  resetGetUsersRequest,
  updateItemUserList,
  addItemUserList,
  removeItemUserList,
} = getUsersSlice.actions;

export default getUsersSlice.reducer;
