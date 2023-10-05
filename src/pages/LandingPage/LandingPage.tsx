import { Box, Typography, useTheme } from '@mui/material';
import fusee from 'src/assets/images/starship.png';
import sx from 'mui-sx';

import { landingPageStyles } from './styles';
import { useAppSelector } from 'src/hooks';

const LandingPage = () => {
  const theme = useTheme();
  const user = useAppSelector((state) => state.auth.login.user);

  return (
    <Box sx={landingPageStyles(theme).mainWrapper}>
      <Box sx={landingPageStyles(theme).cardContainer}>
        <Typography variant="h2" sx={landingPageStyles(theme).title}>
          Bonjour
          <Typography component="span" sx={landingPageStyles(theme).username}>
            {' '}
            {user?.username}
          </Typography>
        </Typography>
      </Box>
      <Box
        sx={sx(
          landingPageStyles(theme).cardContainer,
          landingPageStyles(theme).infosContainer
        )}
      >
        <Box sx={landingPageStyles(theme).infosText}>
          <Typography variant="h3" sx={landingPageStyles(theme).infosTitle}>
            {"Bienvenue sur l'application Boilerplate Free Réseau."}
          </Typography>
          <Typography variant="body2">
            {
              'Cette application intègre plusieurs modules (Redux, MUI) pour créer une nouvelle application.'
            }
          </Typography>
        </Box>
        <Box sx={landingPageStyles(theme).infosImage}>
          <img src={fusee} alt="fusee" />
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
