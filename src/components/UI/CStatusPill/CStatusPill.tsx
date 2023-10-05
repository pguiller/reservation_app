import React from 'react';
import { Box, SxProps, Theme, useTheme } from '@mui/material';
import { cStatusPillStyles } from './styles';

interface CStatusPillProps {
  children?: React.ReactNode;
  severity: 'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success';
  sx?: SxProps<Theme>;
}

const CStatusPill: React.FC<CStatusPillProps> = ({
  children,
  severity,
  sx,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={[
        cStatusPillStyles(theme).pill(severity),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};

export default CStatusPill;
