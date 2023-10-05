import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';

const useIsMobile: () => boolean = () => {
  const { breakpoints } = useTheme();

  return useMediaQuery(breakpoints.down('sm'));
};

export default useIsMobile;
