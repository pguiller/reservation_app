import React from 'react';
import { cLoadingIconButtonStyles } from './styles';
import {
  Box,
  CircularProgress,
  IconButton,
  IconButtonPropsColorOverrides,
  SxProps,
  Theme,
  useTheme,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { OverridableStringUnion } from '@mui/types';

interface CLoadingIconButtonProps {
  onClick: any;
  isLoading: boolean;
  isSuccess?: boolean;
  icon: React.ReactNode;
  color?:
    | OverridableStringUnion<
        | 'error'
        | 'inherit'
        | 'default'
        | 'primary'
        | 'secondary'
        | 'info'
        | 'success'
        | 'warning',
        IconButtonPropsColorOverrides
      >
    | undefined;
  sx?: SxProps<Theme>;
}

const CLoadingIconButton: React.FC<CLoadingIconButtonProps> = ({
  onClick,
  isLoading,
  isSuccess = false,
  icon,
  color = 'primary',
  sx,
}) => {
  const theme = useTheme();

  return (
    <Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      {isLoading ? (
        <CircularProgress
          sx={cLoadingIconButtonStyles(theme).loader}
          size={14}
        />
      ) : isSuccess ? (
        <DoneIcon color="primary" />
      ) : (
        <IconButton onClick={onClick} color={color}>
          {icon}
        </IconButton>
      )}
    </Box>
  );
};

export default CLoadingIconButton;
