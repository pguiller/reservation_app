import { SxProps, Theme } from '@mui/material';

interface CMenuButtonStyles {
  iconWrapper: (
    // eslint-disable-next-line no-unused-vars
    severity: 'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success'
  ) => SxProps;
}

export const cMenuButtonStyles = (theme: Theme): CMenuButtonStyles => ({
  iconWrapper: (severity) => ({
    borderRadius: '50%',
    backgroundColor: theme.palette[severity].main,
    height: '36px',
    width: '36px',
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.standard,
    }),
    '&:hover': {
      backgroundColor: theme.palette[severity].dark,
    },
    '& svg': {
      color: 'white',
    },
  }),
});
