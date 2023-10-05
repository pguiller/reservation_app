import { SxProps, Theme } from '@mui/material';

interface CModalStyles {
  modal: SxProps;
  titleWrapper: SxProps;
  title: SxProps;
  contentWrapper: SxProps;
  buttonWrapper: SxProps;
  footerWrapper: SxProps;
  button: SxProps;
  error: SxProps;
}

export const cModalStyles = (theme: Theme): CModalStyles => ({
  modal: {
    [theme.breakpoints.only('xs')]: {
      height: '100%',
      width: '100%',
      margin: 0,
      maxHeight: '100%',
      borderRadius: '0',
    },
    maxWidth: 'unset',
  },

  titleWrapper: {
    padding: theme.spacing(2),
    minWidth: '40vw',
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    color: theme.palette.primary.main,
  },

  contentWrapper: {
    overflow: 'hidden',
    paddingTop: `${theme.spacing(2)}!important`,
  },

  footerWrapper: {
    padding: theme.spacing(0, 2, 2, 2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    alignItems: 'center',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: theme.spacing(1),
    width: '100%',
  },

  button: {
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.standard,
    }),
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.standard,
      }),
      cursor: 'pointer',
    },
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});
