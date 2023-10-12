import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

interface AdminPageStyles {
  mainWrapper: SxProps;
  statsWrapper: SxProps;
  addUserCard: SxProps;
  addUserWrapper: SxProps;
  textFieldName: SxProps;
}

export const adminPageStyles = (theme: Theme): AdminPageStyles => ({
  mainWrapper: {
    padding: theme.spacing(8, 2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
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
    width: '100%',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  textFieldName: {
    width: '100%',
    '& input': {
      color: theme.palette.secondary.main,
    },
  },
});
