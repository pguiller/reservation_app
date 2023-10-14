import axios from 'axios';
import { BACK_URL } from 'src/config';
import { AuthData } from 'src/utils/types/AuthData';
import { RegisterInfos } from 'src/utils/types/RegisterInfos';
import { UserInfos } from 'src/utils/types/UserInfos';

export const login = async (body: AuthData) => {
  const response = await axios.post<UserInfos>(
    `${BACK_URL}/authenticate-user`,
    body,
  );

  return response.data;
};

export const register = async (body: RegisterInfos) => {
  const response = await axios.post(`${BACK_URL}/register-user`, body);

  return response;
};

export const resetPassword = async (body: RegisterInfos) => {
  const response = await axios.post(`${BACK_URL}/change-password`, body);

  return response;
};
