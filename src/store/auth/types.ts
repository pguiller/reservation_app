import { DecodedToken } from 'src/utils/types/DecodedToken';
import { UserInfos } from 'src/utils/types/UserInfos';
import { AlertState, Error } from 'src/utils/types/redux';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';

export interface AuthState {
  alert: AlertState;
  user: DecodedToken | null;
  error: Error;
  status: ReduxStatus;
  token: string | null;
}

export interface getUserInfosRequest {
  status: ReduxStatus;
  error: Error;
  alert: AlertState;
  data: UserInfos;
}
