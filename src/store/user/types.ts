import { User } from 'src/utils/types/User';
import { AlertState, Error } from 'src/utils/types/redux';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';

export interface GetUsersRequest {
  status: ReduxStatus;
  error: Error;
  alert: AlertState;
  data: User[];
}

export interface GetUserByIdRequest {
  status: ReduxStatus;
  error: Error;
  alert: AlertState;
  data: User;
}

export interface UpdateConfirmationPayload {
  confirmation: boolean | null;
  confirmation_dej: boolean | null;
  confirmation_balade: boolean | null;
  confirmation_diner: boolean | null;
}

export interface AddFakeUserPayload {
  idCreator: number;
  firstname: string;
  lastname: string;
  confirmation: boolean | null;
  confirmation_dej: boolean;
  confirmation_balade: boolean;
  confirmation_diner: boolean;
}

export interface GetUserByCreatorRequest {
  status: ReduxStatus;
  error: Error;
  alert: AlertState;
  data: User[];
}

export interface CreateFakeUserRequest {
  status: ReduxStatus;
  error: Error;
  alert: AlertState;
  data: { id: number };
}
