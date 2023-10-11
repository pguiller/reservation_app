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
  Confirmation: boolean;
}

export interface AddMemberInfos {
  lastaname: string;
  firstname: string;
}

export interface DeleteMemberPayload {
  memberIds: number[];
}
