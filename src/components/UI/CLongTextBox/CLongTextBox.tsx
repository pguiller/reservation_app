import React from 'react';
import { Box, SxProps, Theme, useTheme } from '@mui/material';
import { cLongtextBoxStyles } from './styles';

interface CLongtextBoxProps {
  children?: React.ReactNode;
  maxLineCount?: number;
  sx?: SxProps<Theme>;
}

const CLongTextBox: React.FC<CLongtextBoxProps> = ({
  children,
  maxLineCount,
  sx,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={[
        cLongtextBoxStyles(theme).card(maxLineCount),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};

export default CLongTextBox;
