import { SxProps, Theme } from '@mui/material';

interface CTextFieldStyles {
  wrapper: SxProps;
}

export const cTextFieldStyles = (theme: Theme): CTextFieldStyles => ({
  wrapper: {
    color: theme.palette.primary.main,
  },
});
