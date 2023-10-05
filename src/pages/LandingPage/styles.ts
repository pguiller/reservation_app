import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

interface LandingPageStyles {
  mainWrapper: SxProps;
  cardContainer: SxProps;
  title: SxProps;
  username: SxProps;
  infosContainer: SxProps;
  infosTitle: SxProps;
  infosText: SxProps;
  infosImage: SxProps;
}

export const landingPageStyles = (theme: Theme): LandingPageStyles => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },

  cardContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
  },

  title: {
    fontWeight: 500,
    textAlign: 'center',
    marginBlock: theme.spacing(3),
  },

  username: {
    fontWeight: 'bold',
    fontSize: '1em',
    color: theme.palette.primary.main,
  },

  infosContainer: {
    display: 'flex',
    gap: theme.spacing(3),
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  infosTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.main,
  },

  infosText: {
    '& p': {
      textAlign: 'justify',
    },
  },

  infosImage: {
    '& > img': {
      width: 200,
    },
  },
});
