import { Switch, SxProps, useTheme } from '@mui/material';
import React from 'react';
import { cSwitchStyles } from './styles';

type CSwitchProps = {
  checked: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps;
};

const CSwitch = ({ checked, onChange, sx }: CSwitchProps) => {
  const theme = useTheme();

  return (
    <Switch
      sx={[cSwitchStyles(theme).switch, ...(Array.isArray(sx) ? sx : [sx])]}
      checked={checked}
      onChange={onChange}
    />
  );
};

export default CSwitch;
