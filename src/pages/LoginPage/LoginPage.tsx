import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  Snackbar,
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
import {
  resetLoginRequest,
  resetLoginRequestStatus,
} from 'src/store/auth/authSlices/loginSlice';
import { resetResetPasswordRequest } from 'src/store/auth/authSlices/resetPasswordSlice';
import { resetRegisterRequest } from 'src/store/auth/authSlices/registerSlice';

const LoginPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const loginRequest = useAppSelector((state) => state.auth.login);
  const registerRequest = useAppSelector((state) => state.auth.register);
  const resetPasswordRequest = useAppSelector(
    (state) => state.auth.resetPassword,
  );

  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [code, setCode] = useState<'0000' | '0001'>('0000');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [resetingPassword, setResetingPassword] = useState(false);
  const [registerSnackbarOpen, setRegisterSnackbarOpen] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(resetLoginRequest());
    dispatch(resetResetPasswordRequest());
    dispatch(resetRegisterRequest());
  }, []);

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
    if (resetPasswordRequest.status === ReduxStatus.Succeeded) {
      setIsRegistering(false);
      setResetingPassword(false);
    }
  }, [resetPasswordRequest]);

  useEffect(() => {
    if (registerRequest.status === ReduxStatus.Succeeded) {
      setIsRegistering(false);
      setRegisterSnackbarOpen(true);
    }
  }, [registerRequest]);

  return (
    <>
      <Box sx={loginPageStyles(theme).container(menuImage)}>
        {!isMobile && (
          <Box sx={loginPageStyles(theme).title}>
            <Typography variant="h1">
              Anniversaire Philippe et Sylvie 2024
            </Typography>
          </Box>
        )}
        <Box sx={loginPageStyles(theme).loginContainer}>
          <Box sx={loginPageStyles(theme).boxLogin}>
            {isMobile && (
              <Typography variant="h1" sx={{ textAlign: 'center' }}>
                Anniversaire Philippe et Sylvie 2024
              </Typography>
            )}
            {isRegistering && !resetingPassword && (
              <Typography>Inscription</Typography>
            )}
            {isRegistering && (
              <CTextField
                label={'Prénom'}
                setValue={setFirstname}
                value={firstname}
                sx={{ width: '100%' }}
              />
            )}
            <CTextField
              label={'Nom'}
              setValue={setLastname}
              value={lastname}
              sx={{ width: '100%' }}
            ></CTextField>
            <CTextField
              label={'Mot de passe'}
              setValue={setPassword}
              value={password}
              type={showPassword ? 'text' : 'password'}
              sx={{ width: '100%' }}
              error={password.length < 8}
              helperText={password.length >= 8 ? '' : 'Minimum 8 caractères'}
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
            {!isRegistering && (
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
            )}
            {loginRequest.status === ReduxStatus.Failed && (
              <Alert
                severity="error"
                sx={{ fontFamily: 'unset', fontSize: '0.9em' }}
              >
                Nom ou mot de passe incorrect
              </Alert>
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
              disabled={password.length < 8}
              loading={
                loginRequest.status === ReduxStatus.Loading ||
                registerRequest.status === ReduxStatus.Loading
              }
              onClick={() => {
                isRegistering
                  ? resetingPassword
                    ? dispatch(
                        resetPasswordAsync({
                          firstname: firstname,
                          lastname: lastname,
                          mdp: password,
                          code: code,
                        }),
                      )
                    : dispatch(
                        registerAsync({
                          firstname: firstname,
                          lastname: lastname,
                          mdp: password,
                          code: code,
                        }),
                      )
                  : dispatch(
                      loginlAsync({ lastname: lastname, mdpentered: password }),
                    );
              }}
            >
              {isRegistering ? 'Valider' : 'Se connecter'}
            </CLoadingButton>
            <CButton onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? 'Annuler' : "S'inscrire"}
            </CButton>
            {resetPasswordRequest.status === ReduxStatus.Succeeded && (
              <Alert severity="success">Mot de passe modifié.</Alert>
            )}
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={registerSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setRegisterSnackbarOpen(false)}
        message="Compte enregistré"
      />
    </>
  );
};

export default LoginPage;
