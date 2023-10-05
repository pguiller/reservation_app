import { SxProps, Theme } from '@mui/material';

interface CImportTextfieldStyles {
  wrapper: SxProps;
  textfield: SxProps;
  button: SxProps;
}

export const cImportTextfieldStyles = (
  theme: Theme
): CImportTextfieldStyles => ({
  wrapper: {
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
  },

  textfield: {
    width: '-webkit-fill-available',
  },

  button: {
    height: theme.spacing(6),
  },
});
