import { SxProps, Theme } from '@mui/material';

interface CCircularProgressStyles {
  // eslint-disable-next-line no-unused-vars
  loaderContainer: (isModal: boolean) => SxProps;
  loader: SxProps;
}

export const cCircularProgressStyles = (
  theme: Theme
): CCircularProgressStyles => ({
  loaderContainer: (isModal) => ({
    flex: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: isModal ? 'unset' : '90vh',
    display: 'flex',
  }),
  loader: {
    height: 400,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
  },
});
