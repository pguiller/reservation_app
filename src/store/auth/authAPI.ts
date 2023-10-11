import axios from 'axios';
import { BACK_URL } from 'src/config';
import { AuthData } from 'src/utils/types/AuthData';
import { RegisterInfos } from 'src/utils/types/RegisterInfos';

export const login = async (body: AuthData): Promise<string> => {
  const response = await axios.post<string>(
    `${BACK_URL}/authenticate-user`,
    body,
  );

  return response.headers['Authorization'].split(' ')[1];
};

export const register = async (body: RegisterInfos) => {
  const response = await axios.post(`${BACK_URL}/register-user`, body);

  return response;
};

export const resetPassword = async (body: RegisterInfos) => {
  const response = await axios.post(`${BACK_URL}/change-password`, body);

  return response;
};
