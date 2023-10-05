/* eslint-disable no-unused-vars */
export type AnchorEls = {
  [key: string]: HTMLElement | null;
};
export type HandleOpenMenu = (
  event: React.MouseEvent<HTMLElement>,
  menu: string
) => void;

export type HandleCloseMenu = (menu: string) => void;

export interface UseMenuReturn {
  anchorEls: AnchorEls;
  handleOpenMenu: HandleOpenMenu;
  handleCloseMenu: HandleCloseMenu;
}

export interface UseFetchProps<T> {
  status: string;
  data: T[];
  action: any;
}

export type UseFetchByParamsProps = {
  status: string;
  param?: string | any;
  action: any;
};
