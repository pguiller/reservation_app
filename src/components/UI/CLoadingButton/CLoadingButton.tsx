import React from 'react';
import { cButtonStyles } from './styles';
import { SxProps, Theme, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface CLoadingButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'contained' | 'text' | 'outlined';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success';
  sx?: SxProps<Theme>;
}

const CLoadingButton: React.FC<CLoadingButtonProps> = ({
  children,
  variant,
  color = 'primary',
  loading,
  disabled,
  onClick,
  sx,
}) => {
  const theme = useTheme();

  return (
    <LoadingButton
      sx={[
        cButtonStyles(theme).button(color),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      variant={variant}
      onClick={() => onClick()}
      loading={loading}
      disabled={disabled}
      color={color}
    >
      {children}
    </LoadingButton>
  );
};

export default CLoadingButton;
