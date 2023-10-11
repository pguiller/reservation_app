import { SxProps, Theme } from '@mui/material';

interface CButtonStyles {
  button: (
    // eslint-disable-next-line no-unused-vars
    color:
      | 'primary'
      | 'secondary'
      | 'error'
      | 'info'
      | 'warning'
      | 'success'
      | undefined,
  ) => SxProps;
}

export const cButtonStyles = (theme: Theme): CButtonStyles => ({
  button: (color) => ({
    border: `1px solid ${
      color ? theme.palette[color].main : theme.palette.primary.main
    }`,
    borderRadius: '24px',
    color: color === 'primary' ? 'white' : theme.palette.primary.main,
  }),
});
