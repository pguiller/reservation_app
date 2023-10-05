import { SxProps, Theme, alpha } from '@mui/material';
import { grey } from '@mui/material/colors';

interface CSwitchStyles {
  switch: SxProps;
}

export const cSwitchStyles = (theme: Theme): CSwitchStyles => ({
  switch: {
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: grey[900],
      '&:hover': {
        backgroundColor: alpha(grey[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: grey[800],
    },
  },
});
