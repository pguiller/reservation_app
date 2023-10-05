/* eslint-disable no-unused-vars */
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteValue,
  SxProps,
  Theme,
} from '@mui/material';
import {
  GridCallbackDetails,
  GridColDef,
  GridFilterModel,
  GridInputSelectionModel,
  GridRowParams,
  GridSelectionModel,
} from '@mui/x-data-grid';
import { Dispatch, ReactNode, SetStateAction, SyntheticEvent } from 'react';

type OptionalHTMLElement = HTMLElement | null;

export interface menuItem {
  id: number;
  label: string;
}

export interface AppBarMenuProps<T> {
  url: string | string[];
  useIconButton?: boolean;
  menuName?: string;
  anchorEl: OptionalHTMLElement;
  onOpen: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onClose: () => void;
  menuItems: T[];
}

export interface AccordionMenuProps<T> {
  url: string | string[];
  expanded: string | false;
  expandFunction: any;
  name: string;
  items: T[];
}

export interface tableData {
  title: string;
  data: string;
}

export interface DataTablePropsActions {
  exportedCSVFileName?: string;
  toolbarButtons?: ReactNode;
  hasFilter?: boolean;
  hasExport?: boolean;
}

export interface DataTableProps<T> extends DataTablePropsActions {
  sx?: SxProps;
  columns: GridColDef[];
  rows: T[] | any;
  pageSize?: number;
  rowsPerPageOptions?: number[];
  loading?: boolean;
  pagination?: boolean;
  filterModel?: GridFilterModel;
  isRowSelectable?: ((params: GridRowParams<any>) => boolean) | undefined;
  hasToolbar?: boolean;
  title?: string;
  hasCheckboxSelection?: boolean;
  onSelectionModelChange?: (
    selectionModel: GridSelectionModel,
    details: GridCallbackDetails
  ) => void;
  selectionModel?: GridInputSelectionModel | undefined;
  disableSelectionOnClick?: boolean;
}

export interface CustomToolbarProps<T> extends DataTablePropsActions {
  title?: string;
}

type Value<T> = NonNullable<string | T> | (string | T)[] | undefined;
type EventHandler = (event: SyntheticEvent<Element, Event>) => void;

export type ValueAutocompleteOnChange<T> = AutocompleteValue<
  T,
  boolean | undefined,
  boolean | undefined,
  boolean | undefined
>;

type AutocompleteOnChange<T> = (
  event: React.SyntheticEvent,
  value: ValueAutocompleteOnChange<T>,
  reason: AutocompleteChangeReason
) => void;

export interface CAutocompleteProps<T> {
  items: T[];
  labelInput: string;
  inputValue: string;
  defaultValue?: string;
  value?: Value<T>;
  name: string;
  error?: boolean;
  freeSolo?: boolean;
  isLoading?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  dataTestid?: string;
  getOptionLabel: (option: string | T) => string;
  onChange?: AutocompleteOnChange<T>;
  onClose?: EventHandler;
  onInputChange?: (event: any, newInputValue: any) => void;
  onHighlightChange?: EventHandler;
  onClick?: EventHandler;
  sx?: SxProps<Theme>;
}

export interface PieChartData {
  label: string;
  value: number;
}

export interface LineChartData {
  label: string;
  data: number[];
}
