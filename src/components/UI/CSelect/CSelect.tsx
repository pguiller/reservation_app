import {
  Box,
  CircularProgress,
  FormControl,
  FormControlPropsSizeOverrides,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
  Tooltip,
  useTheme,
} from '@mui/material';
import React from 'react';
import { menuItem } from 'src/components/UI/types';
import { OverridableStringUnion } from '@mui/types';
import { cSelectStyles } from './styles';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';

type CSelectProps = {
  menuItems: menuItem[];
  value?: string;
  defaultValue?: string;
  label?: string;
  sx?: SxProps<Theme>;
  onChange?: () => void;
  setValue: any;
  labelId: string;
  color?:
    | 'error'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | undefined;
  size?:
    | OverridableStringUnion<'small' | 'medium', FormControlPropsSizeOverrides>
    | undefined;
  fetchStatus?: ReduxStatus;
  errorMessage?: string;
  disabled?: boolean;
};

const CSelect = ({
  menuItems,
  value,
  defaultValue,
  setValue,
  label,
  onChange,
  sx,
  labelId,
  size,
  color,
  fetchStatus,
  errorMessage = 'Une erreur est survenue veuillez réessayer.',
  disabled,
}: CSelectProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={[cSelectStyles(theme).wrapper, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <FormControl sx={cSelectStyles(theme).select} size={size}>
        <InputLabel id={labelId} color={color} />
        <Select
          fullWidth
          label={label}
          value={value}
          defaultValue={defaultValue}
          color={color}
          disabled={disabled}
          onChange={(e: SelectChangeEvent) => {
            setValue(e.target.value);
            onChange && onChange();
          }}
          labelId={labelId}
          renderValue={(valueDisplayed) => (
            <Box sx={cSelectStyles(theme).selectIconsWrapper}>
              {valueDisplayed}
              {valueDisplayed && fetchStatus !== null && (
                <>
                  {fetchStatus === ReduxStatus.Loading && (
                    <CircularProgress size={20} />
                  )}
                  {fetchStatus === ReduxStatus.Succeeded && (
                    <CheckIcon color={'success'} fontSize="small" />
                  )}
                  {fetchStatus === ReduxStatus.Failed && (
                    <Tooltip title={errorMessage}>
                      <ErrorIcon color="error" fontSize="small" />
                    </Tooltip>
                  )}
                </>
              )}
            </Box>
          )}
        >
          {menuItems.map((item) => (
            <MenuItem key={item.label} value={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CSelect;
