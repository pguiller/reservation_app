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

interface Props {
  children?: React.ReactNode;
}

const HomePage: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <>
      <Box sx={homePageStyles(theme).header}>
        <Typography variant="h2" color={'secondary'}>
          {!isMobile ? 'Sylvie & Philippe 2024' : 'S&P'}
        </Typography>
        <IconButton
          sx={homePageStyles(theme).logoutIcon}
          onClick={() => navigate('/login')}
        >
          <LogoutIcon color="secondary" />
        </IconButton>
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
