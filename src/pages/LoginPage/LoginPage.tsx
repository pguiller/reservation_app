import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { AppDispatch, store } from 'src/store/store';
import { useDispatch } from 'react-redux';
import { loginlAsync } from 'src/store/auth/authAsync';
import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router';
import useIsTabletPortait from 'src/hooks/useIsTablet';
import { loginPageStyles } from './styles';
import { useEffect, useState } from 'react';
import { ReactComponent as Freelogo } from 'src/assets/images/Free_logo.svg';
import { AuthData } from 'src/utils/types/AuthData';

const initialValues: AuthData = {
  username: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Le mail est obligatoire'),
  password: Yup.string().required('Le mot de passe est obligatoire'),
});
const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isTablet = useIsTabletPortait();
  const theme = useTheme();

  const [wrongPassword, setWrongPassword] = useState(false);

  const onSubmit = async (
    values: AuthData,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      await dispatch(loginlAsync(values));
      setWrongPassword(false);
      setSubmitting(false);
      resetForm();
      navigate('/');
    } catch (error) {
      setSubmitting(false);
      setWrongPassword(true);
    }
  };

  useEffect(() => {
    const authState = store.getState().auth;

    if (authState.login.status === 'failed') {
      setWrongPassword(true);
    } else {
      setWrongPassword(false);
    }
  }, [store.getState().auth]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      isInitialError={false}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        isSubmitting,
        isValid,
        touched,
        errors,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Image xs={false} sm={false} md={7} />
            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '90%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  {isTablet && (
                    <Box sx={loginPageStyles(theme).logoTablet}>
                      <Freelogo />
                    </Box>
                  )}
                  <Typography variant="h1" sx={loginPageStyles(theme).appName}>
                    Application Boilerplate
                  </Typography>
                  <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    CONNEXION
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Mail"
                      name="username"
                      autoComplete="username"
                      value={values.username}
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                      onChange={handleChange}
                    />

                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Mot de passe"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={values.password}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      onChange={handleChange}
                    />

                    <LoadingButton
                      fullWidth
                      sx={{ mt: 3, mb: 2 }}
                      type="submit"
                      variant="contained"
                      disabled={!isValid}
                      loading={isSubmitting}
                    >
                      CONNEXION
                    </LoadingButton>
                    {wrongPassword && (
                      <Typography sx={loginPageStyles(theme).errorMessage}>
                        Mail ou mot de passe incorrecte.
                      </Typography>
                    )}
                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                </Box>
                <Box sx={loginPageStyles(theme).versionWrapper}>
                  <Typography
                    sx={loginPageStyles(theme).textColor}
                    variant="body2"
                  >
                    Version : 1.1.0
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://portail.free.fr/">
        Free
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Image = ({
  xs = false,
  sm = false,
  md = false,
}: {
  xs?: boolean | number;
  sm?: boolean | number;
  md?: boolean | number;
}) => (
  <Grid
    item
    xs={xs}
    sm={sm}
    md={md}
    sx={{
      backgroundImage:
        'url(https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Free_logo.svg/640px-Free_logo.svg.png)',
      backgroundRepeat: 'no-repeat',
      backgroundColor: (t) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
      backgroundPosition: 'center',
    }}
  />
);

export default LoginPage;
