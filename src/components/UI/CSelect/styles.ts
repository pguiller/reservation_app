import { SxProps, Theme } from '@mui/material';

interface CSelectStyles {
  wrapper: SxProps;
  select: SxProps;
  selectIconsWrapper: SxProps;
}

export const cSelectStyles = (theme: Theme): CSelectStyles => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',

    '& legend': {
      height: 'unset',
      '& > span': {
        opacity: 1,
      },
    },
  },

  select: {
    width: 'inherit',
  },

  selectIconsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
});
