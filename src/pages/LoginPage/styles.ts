import { SxProps, Theme } from '@mui/material';

interface LoginPageStyles {
  // eslint-disable-next-line no-unused-vars
  container: (image: string) => SxProps;
  boxLogin: SxProps;
  loginContainer: SxProps;
  title: SxProps;
}

export const loginPageStyles = (theme: Theme): LoginPageStyles => ({
  container: (image) => ({
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    objectFit: 'cover',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '50px',
  }),
  loginContainer: {
    backgroundColor:
      'rgba(255, 255, 255, 0.3)' /* Couleur de fond transparente */,
    backdropFilter: 'blur(10px)' /* Flou du fond */,
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    maxWidth: '80%,',
    [theme.breakpoints.down('sm')]: {
      height: '100vh',
      width: '100vw',
    },
  },

  boxLogin: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: theme.spacing(2),
    '& button': {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      '& h1': {
        fontSize: '2rem',
      },
    },
  },

  title: {
    marginTop: '10em',
    textAlign: 'center',
    backgroundColor:
      'rgba(255, 255, 255, 0.1)' /* Couleur de fond transparente */,
    backdropFilter: 'blur(2px)' /* Flou du fond */,
    padding: '20px',
    width: '100vw',
    borderRadius: '10px',
    color: theme.palette.primary.main,
  },
});
