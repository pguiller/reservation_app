import { Direction } from '@mui/material';
import { frFR as datePickerLocaleFrench } from '@mui/x-date-pickers';
import { frFR as dataGridLocaleFrench } from '@mui/x-data-grid';
import * as locales from '@mui/material/locale';

import 'dayjs/locale/fr';

type SupportedLocales = keyof typeof locales;

export interface MUILocaleData {
  muiCore: SupportedLocales;
  muiDatePicker: any;
  muiDataGrid: any;
  dayJSLanguage: string;
  title: string;
  direction: Direction;
}

const french: MUILocaleData = {
  muiCore: 'frFR' as SupportedLocales,
  muiDatePicker: datePickerLocaleFrench,
  muiDataGrid: dataGridLocaleFrench,
  dayJSLanguage: 'fr',
  title: 'French',
  direction: 'ltr',
};

export const supportedLocales: MUILocaleData[] = [french];
