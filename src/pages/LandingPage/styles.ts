import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

interface LandingPageStyles {
  // eslint-disable-next-line no-unused-vars
  background: (image: string) => SxProps;
  firstWrapper: SxProps;
  secondWrapper: SxProps;
  gridWrapper: SxProps;
  addPersonWrapper: SxProps;
  textFieldNameWrapper: SxProps;
  textFieldNameButtonWrapper: SxProps;
  textFieldName: SxProps;
  hotelsWrapper: SxProps;
}

// eslint-disable-next-line no-unused-vars
export const landingPageStyles = (theme: Theme): LandingPageStyles => ({
  background: (image) => ({
    backgroundImage: `url(${image})`,
    minHeight: '80vh',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [theme.breakpoints.down('md')]: {
      backgroundAttachment: 'scroll',
      minHeight: '40vh',
    },
    [theme.breakpoints.down('sm')]: {
      backgroundAttachment: 'scroll',
      minHeight: '30vh',
    },
  }),

  firstWrapper: {
    paddingBlock: theme.spacing(8),
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    paddingInline: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    textAlign: 'center',
    gap: theme.spacing(8),
    [theme.breakpoints.down('md')]: {
      height: 'unset',
    },
  },

  gridWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    width: '100%',
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },

  secondWrapper: {
    paddingBlock: '64px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    paddingInline: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },

  addPersonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '100%',
  },

  textFieldNameButtonWrapper: {
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
    width: '100%',
  },

  textFieldNameWrapper: {
    display: 'flex',
    gap: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },

  textFieldName: {
    width: '100%',
    '& input': {
      color: theme.palette.secondary.main,
    },
  },

  hotelsWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
});
