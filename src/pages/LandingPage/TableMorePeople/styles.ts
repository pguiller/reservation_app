import { SxProps, Theme } from '@mui/material';

interface TableMorePeopleStyles {
  tableContainer: SxProps;
  tableRow: SxProps;
  tableCell: SxProps;
  tableHeader: SxProps;
  textContainer: SxProps;
}

export const tableMorePeopleStyles = (theme: Theme): TableMorePeopleStyles => ({
  tableContainer: {
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    '& th': {
      textAlign: 'center',
    },
  },

  tableRow: {
    height: '10px',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '& td': {
      textAlign: 'center',
      color: 'white',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },

  tableCell: {
    height: '10px',
    '&:last-child': {
      textAlign: 'end',
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  tableHeader: {
    '& th': {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.darkest,
      fontSize: '1.3rem',
    },
  },

  textContainer: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('sm')]: {
      width: '18vw',
    },
  },
});
