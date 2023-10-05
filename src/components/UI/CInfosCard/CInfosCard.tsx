import React from 'react';
import { cInfosCardStyles } from './styles';
import {
  Box,
  Button,
  CircularProgress,
  SxProps,
  Theme,
  useTheme,
} from '@mui/material';

interface CInfosCardProps {
  children?: React.ReactNode;
  isButton?: boolean;
  onClick?: any;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const CInfosCard: React.FC<CInfosCardProps> = ({
  children,
  isButton = false,
  onClick,
  icon,
  loading,
  disabled = false,
  sx,
}) => {
  const theme = useTheme();

  return (
    <>
      {isButton ? (
        <Button
          sx={[
            cInfosCardStyles(theme).card,
            cInfosCardStyles(theme).button(disabled),
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
          {loading ? (
            <CircularProgress
              sx={cInfosCardStyles(theme).circularProgress}
              size={20}
            />
          ) : (
            icon
          )}
        </Button>
      ) : (
        <Box
          sx={[
            cInfosCardStyles(theme).card,
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          {children}
        </Box>
      )}
    </>
  );
};

export default CInfosCard;
