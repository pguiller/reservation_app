import { SxProps, Theme } from '@mui/material';

interface CAccordionMenuStyles {
  iconContainer: SxProps;
  buttonIcon: SxProps;
}

export const cAccordionMenuStyles = (theme: Theme): CAccordionMenuStyles => ({
  iconContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
  },

  buttonIcon: {
    padding: theme.spacing(1),
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: '#00000008', // 0.08 opacity
      cursor: 'pointer',
    },
  },
});
