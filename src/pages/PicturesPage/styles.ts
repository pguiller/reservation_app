import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

interface PicturesPageStyles {
  mainWrapper: SxProps;
}

export const picturesPageStyles = (theme: Theme): PicturesPageStyles => ({
  mainWrapper: {
    padding: theme.spacing(4, 2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
});
