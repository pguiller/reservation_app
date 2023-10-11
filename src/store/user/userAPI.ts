import axios from 'axios';
import { store } from '../store';
import { BACK_URL } from 'src/config';
import { User } from 'src/utils/types/User';
import {
  AddMemberInfos,
  DeleteMemberPayload,
  UpdateConfirmationPayload,
} from './types';

export const getUsers = async () => {
  const { token } = store.getState().auth.login;
  const response = await axios.get<User[]>(
    `${BACK_URL}/get-all-users-with-members/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getUserById = async (id: number) => {
  const { token } = store.getState().auth.login;
  const response = await axios.get<User>(`${BACK_URL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateConfirmation = async (
  id: number,
  payload?: UpdateConfirmationPayload,
) => {
  const { token } = store.getState().auth.login;
  const response = await axios.put(
    `${BACK_URL}/update-confirmation/${id}/`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
};

export const addMember = async (id: number, payload: AddMemberInfos[]) => {
  const { token } = store.getState().auth.login;
  const response = await axios.post(`${BACK_URL}/add-members/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteUser = async (id: number) => {
  const { token } = store.getState().auth.login;
  const response = await axios.delete(`${BACK_URL}/delete-user/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const deleteMember = async (
  id: number,
  payload: DeleteMemberPayload,
) => {
  const { token } = store.getState().auth.login;
  const response = await axios.delete(`${BACK_URL}/delete-members/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });

  return response;
};
