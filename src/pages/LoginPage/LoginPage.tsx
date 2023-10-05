import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from '@mui/material';
import { loginPageStyles } from './styles';
import { useState } from 'react';
import menuImage from 'src/assets/images/386887307_695367802472679_7084235322245899369_n.jpg';
import CTextField from 'src/components/UI/CTextField/CTextField';
import CButton from 'src/components/UI/CButton/CButton';
import CLoadingButton from 'src/components/UI/CLoadingButton/CLoadingButton';
import { useNavigate } from 'react-router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useIsMobile from 'src/hooks/useIsMobile';

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <>
      <Box sx={loginPageStyles(theme).container(menuImage)}>
        {!isMobile && (
          <Box sx={loginPageStyles(theme).title}>
            <Typography variant="h1">Anniversaire Dudu 2024</Typography>
          </Box>
        )}
        <Box sx={loginPageStyles(theme).loginContainer}>
          <Box sx={loginPageStyles(theme).boxLogin}>
            {isMobile && (
              <Typography variant="h1" sx={{ textAlign: 'center' }}>
                Anniversaire Dudu 2024
              </Typography>
            )}
            {isRegistering && <Typography>Inscription</Typography>}
            <CTextField
              label={'Mail'}
              setValue={setMail}
              value={mail}
              sx={{ width: '100%' }}
            ></CTextField>
            <CTextField
              label={'Mot de passe'}
              setValue={setPassword}
              value={password}
              type={showPassword ? 'text' : 'password'}
              sx={{ width: '100%' }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff color="primary" />
                    ) : (
                      <Visibility color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            ></CTextField>
            {isRegistering && (
              <>
                <CTextField
                  label={'Prénom'}
                  setValue={setFirstName}
                  value={firstName}
                  sx={{ width: '100%' }}
                ></CTextField>
                <CTextField
                  label={'Nom'}
                  setValue={setLastName}
                  value={lastName}
                  sx={{ width: '100%' }}
                ></CTextField>
              </>
            )}
            <CLoadingButton
              variant="contained"
              onClick={() =>
                isRegistering ? setIsRegistering(false) : navigate('/')
              }
            >
              {isRegistering ? 'Valider' : 'Se connecter'}
            </CLoadingButton>
            <CButton onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? 'Annuler' : "S'inscrire"}
            </CButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
