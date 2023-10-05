import { SxProps, Theme } from '@mui/material';

interface DataTableStyles {
  table: SxProps;
  toolbarWrapper: SxProps;
  title: SxProps;
  toolbarTitleWrapper: SxProps;
  toolbar: SxProps;
  noDataErrorContainer: SxProps;
  noDataText: SxProps;
}

export const dataTableStyles = (theme: Theme): DataTableStyles => ({
  table: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexGrow: 1,
    border: `1px solid ${theme.palette.divider}`,
  },

  toolbarWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: '53px',
    alignItems: 'center',
    '& div:only-child': {
      marginLeft: 'auto',
    },
  },

  title: {
    padding: theme.spacing(1),
    textTransform: 'uppercase',
  },

  toolbarTitleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },

  toolbar: {
    display: 'flex',
    gap: theme.spacing(2),
    padding: theme.spacing(1),
  },

  noDataErrorContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },

  noDataText: {
    margin: 'auto',
  },
});
