import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addFakeUser,
  deleteUser,
  getUserByCreator,
  getUserById,
  getUsers,
  updateConfirmation,
} from './userAPI';
import { AddFakeUserPayload, UpdateConfirmationPayload } from './types';

export const getUsersAsync = createAsyncThunk('user/getUsers', async () => {
  const response = await getUsers();

  return response;
});

export const getUserByIdsAsync = createAsyncThunk(
  'user/getUserById',
  async (id: number) => {
    const response = await getUserById(id);

    return response;
  },
);

export const updateConfirmationAsync = createAsyncThunk(
  'user/updateConfirmation',
  async ({ id, body }: { id: number; body: UpdateConfirmationPayload }) => {
    const response = await updateConfirmation(id, body);

    return response;
  },
);

export const deleteUserAsync = createAsyncThunk(
  'user/deleteUser',
  async (id: number) => {
    const response = await deleteUser(id);

    return response;
  },
);

export const addFakeUserAsync = createAsyncThunk(
  'user/addFakeUser',
  async ({ body }: { body: AddFakeUserPayload }) => {
    const response = await addFakeUser(body);

    return response;
  },
);

export const getUserByCreatorAsync = createAsyncThunk(
  'user/getUserByCreator',
  async (id: number) => {
    const response = await getUserByCreator(id);

    return response;
  },
);
