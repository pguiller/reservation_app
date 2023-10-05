import { alpha } from '@mui/material/styles';
import { Color } from './Color';
import { amber, green, lightBlue, red } from '@mui/material/colors';

const withAlphas = (color: Color) => ({
  ...color,
  alpha4: alpha(color.main, 0.04),
  alpha8: alpha(color.main, 0.08),
  alpha12: alpha(color.main, 0.12),
  alpha30: alpha(color.main, 0.3),
  alpha50: alpha(color.main, 0.5),
});

export const neutral = {
  50: '#F8F9FA',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D2D6DB',
  400: '#9DA4AE',
  500: '#6C737F',
  600: '#4D5761',
  700: '#2F3746',
  800: '#1C2536',
  900: '#111927',
};

export const freeRed = withAlphas({
  lightest: '#fad0cf',
  light: '#ef5350',
  main: '#CC0A10',
  dark: '#8c0b0f',
  darkest: '#630e11',
  contrastText: '#FFFFFF',
});

export const success = withAlphas({
  lightest: green[50],
  light: green[200],
  main: green[400],
  dark: green[600],
  darkest: green[800],
  contrastText: '#FFFFFF',
});

export const successDark = withAlphas({
  lightest: '#203b21',
  light: '#325c34',
  main: green[400],
  dark: '#7acf7e',
  darkest: '#a8f0ab',
  contrastText: '#FFFFFF',
});

export const info = withAlphas({
  lightest: lightBlue[50],
  light: lightBlue[200],
  main: lightBlue[400],
  dark: lightBlue[600],
  darkest: lightBlue[800],
  contrastText: '#FFFFFF',
});

export const infoDark = withAlphas({
  lightest: '#0a3345',
  light: '#156082',
  main: lightBlue[400],
  dark: '#62c4f0',
  darkest: '#ade0f7',
  contrastText: '#FFFFFF',
});

export const warning = withAlphas({
  lightest: amber[50],
  light: amber[200],
  main: amber[400],
  dark: amber[600],
  darkest: amber[800],
  contrastText: '#FFFFFF',
});

export const warningDark = withAlphas({
  lightest: '#3d310a',
  light: '#8a6d16',
  main: amber[400],
  dark: '#f0ce67',
  darkest: '#f0e2b6',
  contrastText: '#FFFFFF',
});

export const error = withAlphas({
  lightest: red[50],
  light: red[200],
  main: red[400],
  dark: red[600],
  darkest: red[800],
  contrastText: '#FFFFFF',
});

export const errorDark = withAlphas({
  lightest: '#3b1313',
  light: '#962b29',
  main: red[400],
  dark: '#f78583',
  darkest: '#fac9c8',
  contrastText: '#FFFFFF',
});
