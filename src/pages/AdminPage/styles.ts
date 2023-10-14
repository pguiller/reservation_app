import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

interface AdminPageStyles {
  mainWrapper: SxProps;
  statsWrapper: SxProps;
  addUserCard: SxProps;
  addUserWrapper: SxProps;
  textFieldName: SxProps;
  card: SxProps;
}

export const adminPageStyles = (theme: Theme): AdminPageStyles => ({
  mainWrapper: {
    padding: theme.spacing(10, 2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    minHeight: 'calc(100vh - 201px)',
  },

  statsWrapper: {
    display: 'grid',
    gap: theme.spacing(2),
    gridTemplateColumns: '1fr 1fr 1fr',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },

  card: {
    backgroundColor: theme.palette.primary.lightest,
    color: theme.palette.primary.main,
  },

  addUserCard: {
    display: 'flex',
    gap: theme.spacing(2),
    backgroundColor: theme.palette.primary.lightest,
    color: theme.palette.primary.main,
  },

  addUserWrapper: {
    display: 'grid',
    width: '100%',
    gap: theme.spacing(2),
    gridTemplateColumns: '1fr 1fr 1fr',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },

  textFieldName: {
    width: '100%',
  },
});
