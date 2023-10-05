import React from 'react';
import { cButtonStyles } from './styles';
import { Button, SxProps, Theme, useTheme } from '@mui/material';

interface CButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  variant?: 'contained' | 'text' | 'outlined';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success';
  sx?: SxProps<Theme>;
}

const CButton: React.FC<CButtonProps> = ({
  children,
  variant,
  color,
  onClick,
  sx,
}) => {
  const theme = useTheme();

  return (
    <Button
      sx={[
        cButtonStyles(theme).button(color),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      variant={variant}
      onClick={() => onClick()}
    >
      {children}
    </Button>
  );
};

export default CButton;
