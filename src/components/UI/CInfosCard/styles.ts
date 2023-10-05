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
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    minHeight: 50,
    display: 'flex',
    alignItems: 'center',
  },
  button: (disabled) => ({
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white',
    backgroundColor: disabled
      ? theme.palette.action.disabled
      : theme.palette.primary.main,
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.standard,
    }),
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
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
