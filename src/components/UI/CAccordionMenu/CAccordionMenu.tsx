import React from 'react';
import { menu1 } from 'src/utils/menu';
import CAccordion from './CAccordionitem';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { leftMenuOpened } from 'src/store/navigation/navigationSlice';
import {} from './styles';
import { Box, IconButton, useTheme } from '@mui/material';
import { cAccordionMenuStyles } from './styles';
import { Stage } from 'src/utils/types/MenuStage';
import { useAppSelector } from 'src/hooks';

const CAccordionMenu: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const user = useAppSelector((state) => state.auth.login.user);

  const roleHaveAccessMenu: Stage[] = user
    ? menu1.filter((stage) => stage.accessRoles.includes(user.role))
    : [];

  const handleAccordionExpantion = (panel: string) => () => {
    if (expanded === panel) {
      setExpanded(false);
    } else {
      setExpanded(panel);
    }
  };

  const handleCloseMenu = () => {
    dispatch(leftMenuOpened(false));
  };

  return (
    <>
      <Box sx={cAccordionMenuStyles(theme).iconContainer}>
        <IconButton onClick={() => handleCloseMenu()}>
          <CloseIcon />
        </IconButton>
      </Box>
      <CAccordion
        name="menu1"
        url="menu1"
        expanded={expanded}
        expandFunction={handleAccordionExpantion}
        items={roleHaveAccessMenu}
      />
    </>
  );
};

export default CAccordionMenu;
