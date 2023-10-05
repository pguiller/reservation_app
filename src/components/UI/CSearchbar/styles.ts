import { SxProps, Theme } from '@mui/material';

interface CSearchbarStyles {
  searchbarWrapper: SxProps;
  textfieldWrapper: SxProps;
  selectSearchbarOption: SxProps;
}

export const cSearchbarStyles = (theme: Theme): CSearchbarStyles => ({
  searchbarWrapper: {
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: theme.spacing(2),
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },

  textfieldWrapper: {
    flex: 1,
  },

  selectSearchbarOption: {
    width: '20%',
    '& > div': {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
});
