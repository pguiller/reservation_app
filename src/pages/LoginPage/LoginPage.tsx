import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from '@mui/material';
import { loginPageStyles } from './styles';
import { useEffect, useState } from 'react';
import menuImage from 'src/assets/images/386887307_695367802472679_7084235322245899369_n.jpg';
import CTextField from 'src/components/UI/CTextField/CTextField';
import CButton from 'src/components/UI/CButton/CButton';
import CLoadingButton from 'src/components/UI/CLoadingButton/CLoadingButton';
import { useNavigate } from 'react-router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useIsMobile from 'src/hooks/useIsMobile';
import { AppDispatch } from 'src/store/store';
import { useDispatch } from 'react-redux';
import {
  loginlAsync,
  registerAsync,
  resetPasswordAsync,
} from 'src/store/auth/authAsync';
import { useAppSelector } from 'src/hooks';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { resetLoginRequestStatus } from 'src/store/auth/authSlices/loginSlice';

const LoginPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const loginRequest = useAppSelector((state) => state.auth.login);
  const registerRequest = useAppSelector((state) => state.auth.register);
  const restPasswordRequest = useAppSelector(
    (state) => state.auth.resetPassword,
  );

  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [code, setCode] = useState<'0000' | '0001'>('0000');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [resetingPassword, setResetingPassword] = useState(false);

  useEffect(() => {
    if (loginRequest.status === ReduxStatus.Succeeded) {
      navigate('/');
      dispatch(resetLoginRequestStatus());
    }
  }, [loginRequest]);

  useEffect(() => {
    if (loginRequest.status === ReduxStatus.Failed) {
      dispatch(resetLoginRequestStatus());
    }
  }, [isRegistering]);

  useEffect(() => {
    if (restPasswordRequest.status === ReduxStatus.Succeeded) {
      setIsRegistering(false);
      setResetingPassword(false);
    }
  }, [restPasswordRequest]);

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
            {isRegistering && (
              <CTextField
                label={'Prénom'}
                setValue={setFirstName}
                value={firstName}
                sx={{ width: '100%' }}
              />
            )}
            <CTextField
              label={'Nom'}
              setValue={setLastName}
              value={lastName}
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
            />
            <Box sx={{ width: '100%' }}>
              <Typography
                variant="body2"
                sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => {
                  setResetingPassword(true);
                  setIsRegistering(true);
                }}
              >
                Mot de passe oublié ?
              </Typography>
            </Box>
            {loginRequest.status === ReduxStatus.Failed && (
              <Typography variant="body2" color={'error'}>
                Nom ou mot de passe incorrect
              </Typography>
            )}
            {restPasswordRequest.status === ReduxStatus.Succeeded && (
              <Typography variant="body2">Mot de passe modifié.</Typography>
            )}
            {isRegistering && (
              <CTextField
                label={'Code invité'}
                setValue={setCode}
                value={code}
                sx={{ width: '100%' }}
              />
            )}
            <CLoadingButton
              variant="contained"
              loading={
                loginRequest.status === ReduxStatus.Loading ||
                registerRequest.status === ReduxStatus.Loading
              }
              onClick={() => {
                isRegistering
                  ? resetingPassword
                    ? dispatch(
                        resetPasswordAsync({
                          firstname: firstName,
                          lastname: lastName,
                          mdp: password,
                          code: code,
                        }),
                      )
                    : dispatch(
                        registerAsync({
                          firstname: firstName,
                          lastname: lastName,
                          mdp: password,
                          code: code,
                        }),
                      )
                  : dispatch(
                      loginlAsync({ lastname: lastName, mdpentered: password }),
                    );
              }}
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
