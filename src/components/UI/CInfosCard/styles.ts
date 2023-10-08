import { SxProps, Theme } from '@mui/material';

interface CInfosCardStyles {
  card: SxProps;
  // eslint-disable-next-line no-unused-vars
  button: (disabled: boolean) => SxProps;
  circularProgress: SxProps;
}

export const cInfosCardStyles = (theme: Theme): CInfosCardStyles => ({
  card: {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
    minHeight: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: (disabled) => ({
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.primary.main,
    backgroundColor: disabled
      ? theme.palette.action.disabled
      : theme.palette.secondary.main,
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.standard,
    }),
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.standard,
      }),
      cursor: 'pointer',
    },
  }),
  circularProgress: {
    color: 'white',
  },
});
