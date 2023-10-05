import React, { useCallback, useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store/store';
import useMenuAnchors from 'src/hooks/useMenuAnchors';
import AppBarMenu from 'src/components/UI/AppBarMenu/AppBarMenu';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { menu1 } from 'src/utils/menu';
import useIsTablet from 'src/hooks/useIsTablet';
import CAccordionMenu from 'src/components/UI/CAccordionMenu/CAccordionMenu';
import {
  leftMenuOpened,
  switchThemeMode,
} from 'src/store/navigation/navigationSlice';
import { homePageStyles } from './styles';
import { useAppSelector } from 'src/hooks';
import { resetLoginRequest } from 'src/store/auth/authSlices/loginSlice';
import HomeIcon from '@mui/icons-material/Home';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { useNavigate } from 'react-router';
import { Stage } from 'src/utils/types/MenuStage';
import { getUserInfosAsync } from 'src/store/auth/authAsync';
import CSwitch from 'src/components/UI/CSwitch/CSwitch';
interface Props {
  children?: React.ReactNode;
}

const HomePage: React.FC<Props> = ({ children }) => {
  const { anchorEls, handleOpenMenu, handleCloseMenu } = useMenuAnchors();
  const dispatch = useDispatch<AppDispatch>();
  const isTablet = useIsTablet();
  const theme = useTheme();

  const mode = useAppSelector((state) => state.nav.themeMode);
  const [checked, setChecked] = React.useState(mode === 'dark');

  const menuOpen = useAppSelector((state) => state.nav.leftMenuOpened);
  const user = useAppSelector((state) => state.auth.login.user);
  const navigate = useNavigate();

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(switchThemeMode(mode === 'light' ? 'dark' : 'light'));
  };

  const displayTabletMenu = () => {
    dispatch(leftMenuOpened(!menuOpen));
  };

  const handleGetUserInfos = useCallback(() => {
    dispatch(getUserInfosAsync());
  }, [dispatch]);

  useEffect(() => {
    handleGetUserInfos();
  }, [handleGetUserInfos]);

  const roleHaveAccessMenu: Stage[] = menu1;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <AppBar data-testid="AppBar" position="static" component="nav">
        <Toolbar sx={homePageStyles(theme).toolBar}>
          <Box sx={homePageStyles(theme).container}>
            <Box sx={homePageStyles(theme).pagesContainer}>
              <IconButton
                onClick={() => navigate('/')}
                sx={homePageStyles(theme).buttonIcon}
              >
                <HomeIcon />
              </IconButton>
              {isTablet && (
                <>
                  <IconButton
                    onClick={() => displayTabletMenu()}
                    sx={homePageStyles(theme).buttonIcon}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Drawer
                    anchor="left"
                    open={menuOpen}
                    onClose={displayTabletMenu}
                    sx={homePageStyles(theme).drawer}
                  >
                    <CAccordionMenu />
                  </Drawer>
                </>
              )}
              {!isTablet && (
                <Box sx={homePageStyles(theme).menuContainer}>
                  <AppBarMenu
                    menuName="Menu1"
                    url="menu1"
                    menuItems={roleHaveAccessMenu}
                    anchorEl={anchorEls.menu1}
                    onOpen={(
                      event: React.MouseEvent<HTMLElement, MouseEvent>
                    ) => handleOpenMenu(event, 'menu1')}
                    onClose={() => handleCloseMenu('menu1')}
                  />
                  <AppBarMenu
                    menuName="Menu1"
                    url="menu1"
                    menuItems={roleHaveAccessMenu}
                    anchorEl={anchorEls.menu1}
                    onOpen={(
                      event: React.MouseEvent<HTMLElement, MouseEvent>
                    ) => handleOpenMenu(event, 'menu1')}
                    onClose={() => handleCloseMenu('menu1')}
                  />
                  <AppBarMenu
                    menuName="Menu1"
                    url="menu1"
                    menuItems={roleHaveAccessMenu}
                    anchorEl={anchorEls.menu1}
                    onOpen={(
                      event: React.MouseEvent<HTMLElement, MouseEvent>
                    ) => handleOpenMenu(event, 'menu1')}
                    onClose={() => handleCloseMenu('menu1')}
                  />
                </Box>
              )}
            </Box>
            <Box sx={homePageStyles(theme).userInfo}>
              <Typography>{user?.username}</Typography>
              <Box sx={homePageStyles(theme).switchTheme}>
                <CSwitch onChange={handleSwitchChange} checked={checked} />
                {theme.palette.mode === 'dark' ? (
                  <NightlightIcon />
                ) : (
                  <WbSunnyIcon />
                )}
              </Box>
              <IconButton
                sx={homePageStyles(theme).buttonIcon}
                onClick={() => {
                  navigate('/login'), dispatch(resetLoginRequest());
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={homePageStyles(theme).mainWrapper} component="main">
        {children}
      </Container>
    </Box>
  );
};

export default HomePage;
