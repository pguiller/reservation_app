import { SxProps, Theme } from '@mui/material';

interface HomePageStyles {
  mainWrapper: SxProps;
  // eslint-disable-next-line no-unused-vars
  header: (isTransparent: boolean) => SxProps;
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

  header: (isTransparent) => ({
    position: 'fixed',
    width: '100%',
    height: '64px',
    backgroundColor: isTransparent
      ? `${theme.palette.primary.main}40`
      : theme.palette.primary.main /* Couleur de fond transparente */,
    backdropFilter: 'blur(10px)' /* Flou du fond */,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  }),

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
