import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { getUserByIdsAsync } from '../userAsync';
import { GetUserByIdRequest } from '../types';

const initialState: GetUserByIdRequest = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: {
    id: 0,
    idCreator: 0,
    firstname: '',
    lastname: '',
    confirmation: false,
    confirmation_dej: false,
    confirmation_balade: false,
    confirmation_diner: false,
  },
};

const getUserByIdSlice = createSlice({
  name: 'getUserById',
  initialState,
  reducers: {
    resetGetUserByIdRequest: () => initialState,
    setConfirmation: (state, action) => {
      const {
        confirmation,
        confirmation_dej,
        confirmation_balade,
        confirmation_diner,
      } = action.payload;

      state.data.confirmation =
        confirmation !== undefined ? confirmation : state.data.confirmation;
      state.data.confirmation_dej =
        confirmation_dej !== undefined
          ? confirmation_dej
          : state.data.confirmation_dej;
      state.data.confirmation_balade =
        confirmation_balade !== undefined
          ? confirmation_balade
          : state.data.confirmation_balade;
      state.data.confirmation_diner =
        confirmation_diner !== undefined
          ? confirmation_diner
          : state.data.confirmation_diner;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserByIdsAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(getUserByIdsAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'getUserById successful';
        state.data = action.payload;
      })
      .addCase(getUserByIdsAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'getUserById failed';
      });
  },
});

export const { resetGetUserByIdRequest, setConfirmation } =
  getUserByIdSlice.actions;

export default getUserByIdSlice.reducer;
