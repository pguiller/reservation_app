import {
  Box,
  ClickAwayListener,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { motion, useCycle } from 'framer-motion';
import { bubbleMenuStyles } from './styles';
import CMenuButton from '../CMenuButton/CMenuButton';

type BubbleMenuprops = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
};

const animateMenu = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 18px 18px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(18px at 27px 27px)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const BubbleMenu = ({ sx, children, title, icon }: BubbleMenuprops) => {
  const theme = useTheme();

  const [isOpen, toggleOpen] = useCycle(false, true);
  const height = 1000;

  return (
    <ClickAwayListener onClickAway={() => (isOpen ? toggleOpen() : null)}>
      <Box
        sx={[
          bubbleMenuStyles(theme).wrapper,
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <motion.nav
          animate={isOpen ? 'open' : 'closed'}
          onClick={() => toggleOpen()}
          custom={height}
        >
          <CMenuButton
            icon={icon}
            rotate={20}
            sx={bubbleMenuStyles(theme).button}
          />
          <Box
            component={motion.div}
            variants={animateMenu}
            sx={bubbleMenuStyles(theme).menuWrapper}
          >
            <Box sx={bubbleMenuStyles(theme).titleWrapper}>
              <Typography sx={bubbleMenuStyles(theme).title}>
                {title}
              </Typography>
            </Box>
            <Box sx={bubbleMenuStyles(theme).childrenWrapper}>{children}</Box>
          </Box>
        </motion.nav>
      </Box>
    </ClickAwayListener>
  );
};

export default BubbleMenu;
