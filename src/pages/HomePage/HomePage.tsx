import React from 'react';
import {
  Box,
  Container,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { homePageStyles } from './styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';
import useIsMobile from 'src/hooks/useIsMobile';
import line from 'src/assets/images/line.png';
import logo from 'src/assets/images/logo512.png';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

interface Props {
  children?: React.ReactNode;
}

const HomePage: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isAdmin = true;

  return (
    <>
      <Box sx={homePageStyles(theme).header}>
        <Typography
          variant="h2"
          color={'secondary'}
          onClick={() => navigate('/')}
        >
          {!isMobile ? 'Sylvie & Philippe 2024' : 'S&P'}
        </Typography>
        <Box sx={homePageStyles(theme).iconsWrapper}>
          {isAdmin && (
            <IconButton onClick={() => navigate('/admin')}>
              <AdminPanelSettingsIcon color="secondary" />
            </IconButton>
          )}
          <IconButton onClick={() => navigate('/photos')}>
            <AddPhotoAlternateIcon color="secondary" />
          </IconButton>
          <IconButton onClick={() => navigate('/login')}>
            <LogoutIcon color="secondary" />
          </IconButton>
        </Box>
      </Box>
      <Container sx={homePageStyles(theme).mainWrapper} component="main">
        {children}
        <Box sx={homePageStyles(theme).footer}>
          <img src={logo} style={{ width: '3em' }} />
          <img src={line} style={{ width: '18em' }} />
          <Typography
            color={'secondary'}
            variant="body2"
            sx={{ textAlign: 'center' }}
          >
            Made with 💛 by Paul Guillermier & Bertrand Duhamel
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
