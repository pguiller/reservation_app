import { SxProps, Theme } from '@mui/material';

interface HomePageStyles {
  mainWrapper: SxProps;
  header: SxProps;
  iconsWrapper: SxProps;
  footer: SxProps;
}

export const homePageStyles = (theme: Theme): HomePageStyles => ({
  mainWrapper: {
    width: '100%',
    maxWidth: '100%!important',
    boxSizing: 'border-box',
    margin: 'auto',
    paddingInline: '0!important',
  },

  header: {
    position: 'fixed',
    width: '100%',
    height: '64px',
    backgroundColor: `${theme.palette.primary.main}40` /* Couleur de fond transparente */,
    backdropFilter: 'blur(10px)' /* Flou du fond */,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  iconsWrapper: {
    position: 'fixed',
    right: theme.spacing(3),
    display: 'flex',
    gap: theme.spacing(1),
  },

  footer: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
  },
});
