import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addFakeUser,
  addMember,
  deleteMember,
  deleteUser,
  getUserById,
  getUsers,
  updateConfirmation,
} from './userAPI';
import {
  AddFakeUserPayload,
  AddMemberInfos,
  DeleteMemberPayload,
  UpdateConfirmationPayload,
} from './types';

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

export const addMemberAsync = createAsyncThunk(
  'user/addMember',
  async ({ id, body }: { id: number; body: AddMemberInfos[] }) => {
    const response = await addMember(id, body);

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

export const deleteMemberAsync = createAsyncThunk(
  'user/deletemember',
  async ({ id, body }: { id: number; body: DeleteMemberPayload }) => {
    const response = await deleteMember(id, body);

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
