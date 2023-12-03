import { Direction } from '@mui/material';
import { frFR as dataGridLocaleFrench } from '@mui/x-data-grid';
import * as locales from '@mui/material/locale';

type SupportedLocales = keyof typeof locales;

export interface MUILocaleData {
  muiCore: SupportedLocales;
  muiDataGrid: any;
  title: string;
  direction: Direction;
}

const french: MUILocaleData = {
  muiCore: 'frFR' as SupportedLocales,
  muiDataGrid: dataGridLocaleFrench,
  title: 'French',
  direction: 'ltr',
};

export const supportedLocales: MUILocaleData[] = [french];
