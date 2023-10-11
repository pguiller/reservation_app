import React from 'react';
import { CircularProgress, Fab, SxProps, Theme } from '@mui/material';

interface CFabProps {
  icon: React.ReactNode;
  onClick: () => void;
  title?: string;
  color?: 'primary' | 'secondary';
  variant?: 'circular' | 'extended';
  loading?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
}

const CFab: React.FC<CFabProps> = ({
  icon,
  onClick,
  title,
  color = 'primary',
  variant = 'circular',
  loading = false,
  disabled = false,
  size = 'medium',
  sx,
}) => (
  <Fab
    sx={[...(Array.isArray(sx) ? sx : [sx])]}
    color={color}
    variant={variant}
    disabled={loading || disabled}
    size={size}
    onClick={() => onClick()}
  >
    {loading ? (
      <CircularProgress
        color={color === 'primary' ? 'secondary' : 'primary'}
        size={20}
      />
    ) : (
      <>
        {icon}
        {title}
      </>
    )}
  </Fab>
);

export default CFab;
