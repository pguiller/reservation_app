import { SxProps, Theme } from '@mui/material';

interface CInfosCardStyles {
  card: SxProps;
  container: SxProps;
  imageContainer: SxProps;
  infosContainer: SxProps;
  iconsContainer: SxProps;
}

export const cImageInfosCardStyles = (theme: Theme): CInfosCardStyles => ({
  card: {
    backgroundColor: theme.palette.primary.dark,
  },

  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
  },

  imageContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    '& img': {
      height: 'auto',
      maxWidth: '100%',
      [theme.breakpoints.down('sm')]: {
        height: '100%',
        maxWidth: 'auto',
      },
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
