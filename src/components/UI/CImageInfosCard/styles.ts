import { SxProps, Theme } from '@mui/material';

interface CInfosCardStyles {
  card: SxProps;
  container: SxProps;
  infosContainer: SxProps;
  iconsContainer: SxProps;
}

export const cImageInfosCardStyles = (theme: Theme): CInfosCardStyles => ({
  card: {
    backgroundColor: theme.palette.primary.dark,
  },

  container: {
    display: 'flex',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },

  infosContainer: {
    display: 'flex',
    gap: theme.spacing(2),
    flexDirection: 'column',
  },

  iconsContainer: {
    display: 'flex',
    gap: theme.spacing(2),
  },
});
