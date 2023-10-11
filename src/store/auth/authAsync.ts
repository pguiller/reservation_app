import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData } from 'src/utils/types/AuthData';
import { login, register, resetPassword } from './authAPI';
import { RegisterInfos } from 'src/utils/types/RegisterInfos';

export const loginlAsync = createAsyncThunk(
  'menu/login',
  async (body: AuthData) => {
    const response = await login(body);

    return response;
  },
);

export const registerAsync = createAsyncThunk(
  'menu/register',
  async (body: RegisterInfos) => {
    const response = await register(body);

    return response;
  },
);

export const resetPasswordAsync = createAsyncThunk(
  'menu/resetPassword',
  async (body: RegisterInfos) => {
    const response = await resetPassword(body);

    return response;
  },
);
