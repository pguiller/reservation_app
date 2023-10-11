import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

interface AdminPageStyles {
  mainWrapper: SxProps;
  statsWrapper: SxProps;
  addUserCard: SxProps;
  addUserWrapper: SxProps;
}

export const adminPageStyles = (theme: Theme): AdminPageStyles => ({
  mainWrapper: {
    padding: theme.spacing(4, 2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },

  statsWrapper: {
    display: 'grid',
    gap: theme.spacing(2),
    gridTemplateColumns: '1fr 1fr 1fr',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },

  addUserCard: {
    display: 'flex',
    gap: theme.spacing(2),
  },

  addUserWrapper: {
    display: 'flex',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
});
