import { SxProps } from '@mui/material';

interface CPieChartStyles {
  wrapper: SxProps;
  pieChart: SxProps;
  totalTypo: SxProps;
}

export const cPieChartStyles = (): CPieChartStyles => ({
  wrapper: {
    position: 'relative',
  },

  pieChart: {
    width: '50%',
    backgroundColor: 'red',
  },

  totalTypo: {
    position: 'absolute',
    top: '51%',
    left: '4.9em',
    transform: 'translate(-50%, -50%)',
  },
});
