import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

interface LandingPageStyles {
  // eslint-disable-next-line no-unused-vars
  background: (image: string) => SxProps;
  firstWrapper: SxProps;
  secondWrapper: SxProps;
  gridWrapper: SxProps;
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
    },
  }),

  firstWrapper: {
    height: '50vh',
    paddingBlock: '128px',
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
    height: '60vh',
    paddingTop: '64px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    paddingInline: theme.spacing(4),
  },
});
