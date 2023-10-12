import { AlertState, Error } from 'src/utils/types/redux';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';

export interface AuthState {
  alert: AlertState;
  error: Error;
  status: ReduxStatus;
  token: string | null;
  userId: number;
}
