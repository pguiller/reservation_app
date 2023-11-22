import { SxProps, Theme } from '@mui/material';

interface ErrorPageStyles {
  container: SxProps;
  oups: SxProps;
  text: SxProps;
  error: SxProps;
}

export const errorPageStyles = (theme: Theme): ErrorPageStyles => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(8),
    height: '100vh',
  },

  oups: {
    fontSize: '10rem',
    color: theme.palette.primary.main,
  },

  text: {
    fontSize: '2rem',
  },

  error: {
    fontSize: '1rem',
  },
});
