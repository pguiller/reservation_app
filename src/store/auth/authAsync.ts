import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData } from 'src/utils/types/AuthData';
import { getUserInfos, login, logout } from './authAPI';

export const loginlAsync = createAsyncThunk(
  'menu/login',
  async (body: AuthData) => {
    const response = await login(body);

    return response;
  },
);
export const logoutlAsync = createAsyncThunk('menu/logout', async () => {
  const response = await logout();

  return response;
});

export const getUserInfosAsync = createAsyncThunk(
  'auth/current-user',
  async () => {
    const response = await getUserInfos();

    return response;
  },
);
