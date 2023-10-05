import React from 'react';
import { cMenuButtonStyles } from './styles';
import { motion } from 'framer-motion';

import {
  Box,
  IconButton,
  IconButtonPropsColorOverrides,
  SxProps,
  Theme,
  useTheme,
} from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

interface CMenuButtonProps {
  onClick?: () => void;
  icon: React.ReactNode;
  severity?:
    | OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success',
        IconButtonPropsColorOverrides
      >
    | undefined;
  rotate?: number;
  sx?: SxProps<Theme>;
}

const CMenuButton: React.FC<CMenuButtonProps> = ({
  onClick,
  icon,
  severity = 'primary',
  rotate = 20,
  sx,
}) => {
  const theme = useTheme();

  const animateButton = {
    hover: {
      scale: 1.3,
      rotate: rotate,
      transition: {
        duration: 0.3,
        repeat: Infinity,
      },
    },
  };

  return (
    <Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <IconButton
        component={motion.button}
        variants={animateButton}
        whileHover="hover"
        sx={cMenuButtonStyles(theme).iconWrapper(severity)}
        onClick={onClick}
      >
        {icon}
      </IconButton>
    </Box>
  );
};

export default CMenuButton;
