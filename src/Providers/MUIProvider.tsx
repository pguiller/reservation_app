import {
  createTheme,
  ThemeProvider,
  Theme,
  darkScrollbar,
} from '@mui/material';
import { createContext, useMemo, useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MUILocaleData, supportedLocales } from './SupportedLocales';
import { useAppSelector } from 'src/hooks';
import { switchThemeMode } from 'src/store/navigation/navigationSlice';
import { AppDispatch } from 'src/store/store';
import { useDispatch } from 'react-redux';
import { createPalette } from 'src/theme/create-palette';
import grey from '@mui/material/colors/grey';

declare module '@mui/material/styles' {
  interface ThemeOptions {
    overrides?: {
      MuiCssBaseline?: {
        '@global'?: {
          body?: {
            backgroundColor?: string;
          };
        };
      };
    };
  }
}

export const MUIWrapperContext = createContext({
  toggleColorMode: () => {
    console.log('Toggle color mode called!');
  },
  setLocale: (locale: MUILocaleData) => {
    console.log('Set locale called with locale:', locale);
  },
  locale: supportedLocales[0],
});

export default function MUIWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector((state) => state.nav.themeMode);
  const [locale, setLocale] = useState<MUILocaleData>(supportedLocales[0]);
  const muiWrapperUtils = useMemo(
    () => ({
      toggleColorMode: () => {
        dispatch(switchThemeMode(mode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );
  const palette = createPalette(mode);

  useEffect(() => {
    document.dir = locale.direction;
  }, [locale.direction]);

  const theme: Theme = useMemo(
    () =>
      createTheme(
        {
          overrides: {
            MuiCssBaseline: {
              '@global': {
                body: {
                  backgroundColor: '#f5f5f5',
                },
              },
            },
          },
          direction: locale.direction,
          palette,
          typography: {
            // fontFamily: "'Open Sans', sans-serif",
            fontSize: 14,
            h1: {
              fontWeight: 600,
              fontSize: '2.5rem',
              lineHeight: 1.2,
              letterSpacing: '-0.01562em',
            },
            h2: {
              fontWeight: 600,
              fontSize: '2rem',
              lineHeight: 1.3,
              letterSpacing: '-0.00833em',
            },
            h3: {
              fontWeight: 600,
              fontSize: '1.75rem',
              lineHeight: 1.4,
              letterSpacing: '0em',
            },
            h4: {
              fontWeight: 600,
              fontSize: '1.5rem',
              lineHeight: 1.5,
              letterSpacing: '0.00735em',
            },
            h5: {
              fontWeight: 600,
              fontSize: '1.25rem',
              lineHeight: 1.5,
              letterSpacing: '0em',
            },
            h6: {
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: 1.6,
              letterSpacing: '0.0075em',
            },
            body1: {
              fontWeight: 700,
              fontSize: '1rem',
              lineHeight: 1.5,
              letterSpacing: '0.00938em',
            },
            body2: {
              fontWeight: 400,
              fontSize: '0.875rem',
              lineHeight: 1.43,
              letterSpacing: '0.01071em',
            },
          },
          shape: {
            borderRadius: 3,
          },

          breakpoints: {
            values: {
              xs: 0,
              sm: 600,
              md: 960,
              lg: 1280,
              xl: 1920,
            },
          },

          components: {
            MuiCssBaseline: {
              styleOverrides: {
                html: {
                  ...darkScrollbar(
                    mode === 'light'
                      ? {
                          track: grey[200],
                          thumb: grey[400],
                          active: grey[400],
                        }
                      : undefined
                  ),
                  scrollbarWidth: 'thin',
                },
              },
            },
          },

          transitions: {
            duration: {
              shortest: 150,
              shorter: 200,
              short: 250,
              // most basic recommended timing
              standard: 300,
              // this is to be used in complex animations
              complex: 375,
              // recommended when something is entering screen
              enteringScreen: 225,
              // recommended when something is leaving screen
              leavingScreen: 195,
            },
            easing: {
              // This is the most common easing curve.
              easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
              // Objects enter the screen at full velocity from off-screen and
              // slowly decelerate to a resting point.
              easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
              // Objects leave the screen at full velocity. They do not decelerate when off-screen.
              easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
              // The sharp curve is used by objects that may return to the screen at any time.
              sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
            },
          },

          mixins: {
            toolbar: {
              minHeight: 56,
              '@media (min-width:0px) and (orientation: landscape)': {
                minHeight: 48,
              },
              '@media (min-width:600px)': {
                minHeight: 64,
              },
            },
          },
        },
        locale.muiCore as any,
        locale.muiDatePicker,
        locale.muiDataGrid
      ),
    [mode, locale]
  );

  return (
    <MUIWrapperContext.Provider
      value={{
        toggleColorMode: muiWrapperUtils.toggleColorMode,
        locale,
        setLocale,
      }}
    >
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={locale.dayJSLanguage}
          localeText={locale.muiDatePicker}
        >
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </MUIWrapperContext.Provider>
  );
}
