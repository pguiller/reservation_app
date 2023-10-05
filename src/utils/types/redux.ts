import { ReduxStatus } from './reduxStatusValues';

export type Error = string | null | undefined;

export interface AlertState {
  successMessage: string;
  errorMessage: string;
}

export interface NoDataResponse {
  status: ReduxStatus;
  error: Error;
  alert: AlertState;
}
