import { SxProps, Theme } from '@mui/material';

interface BubbleMenuStyles {
  wrapper: SxProps;
  button: SxProps;
  menuWrapper: SxProps;
  titleWrapper: SxProps;
  title: SxProps;
  childrenWrapper: SxProps;
}

export const bubbleMenuStyles = (theme: Theme): BubbleMenuStyles => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
    position: 'absolute',
    zIndex: 4,
  },

  button: {
    zIndex: 7,
    position: 'absolute',
  },

  menuWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '300px',
    background: 'white',
    borderRadius: theme.shape.borderRadius,
    zIndex: 5,
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    height: '58px',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
  },

  title: {
    color: 'white',
  },

  childrenWrapper: {
    backgroundColor: 'white',
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
});
