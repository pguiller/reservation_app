import { SxProps, Theme } from '@mui/material';

interface CDatePickerStyles {
  container: SxProps;
  link: SxProps;
}

export const cDatePickerStyles = (theme: Theme): CDatePickerStyles => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },

  link: {
    cursor: 'pointer',
    marginLeft: theme.spacing(1),
  },
});
