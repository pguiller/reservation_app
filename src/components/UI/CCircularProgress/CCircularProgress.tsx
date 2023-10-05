import { Box, CircularProgress, useTheme } from '@mui/material';
import React from 'react';
import { cCircularProgressStyles } from './styles';

interface CCircularProgressProps {
  isModal?: boolean;
}

const CCircularProgress = ({ isModal = false }: CCircularProgressProps) => {
  const theme = useTheme();

  return (
    <Box sx={cCircularProgressStyles(theme).loaderContainer(isModal)}>
      <CircularProgress sx={cCircularProgressStyles(theme).loader} />
    </Box>
  );
};

export default CCircularProgress;
