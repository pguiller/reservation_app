import { SxProps, Theme } from '@mui/material';

interface CTableStyles {
  tableContainer: SxProps;
  tableRow: SxProps;
  tableCell: SxProps;
}

export const cTanleStyles = (theme: Theme): CTableStyles => ({
  tableContainer: {
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
  },

  tableRow: {
    height: '10px',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '& td': {
      textAlign: 'end',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },

  tableCell: {
    height: '10px',
  },
});
