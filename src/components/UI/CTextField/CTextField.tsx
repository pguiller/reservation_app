import React, { ReactNode, Ref } from 'react';
import { cTextFieldStyles } from './styles';
import { SxProps, TextField, Theme, useTheme } from '@mui/material';

interface CTextFieldProps {
  id?: string;
  multiline?: boolean;
  maxRows?: number;
  defaultValue?: string;
  label?: string;
  type?: string;
  value: string | number | File | null | undefined;
  inputRef?: Ref<any> | undefined;
  minValue?: number;
  maxValue?: number;
  setValue: any;
  // eslint-disable-next-line no-unused-vars
  setFile?: any;
  onChange?: () => void;
  endAdornment?: ReactNode;
  accept?: string;
  error?: boolean;
  helperText?: string;
  focused?: boolean;
  placeholder?: string;
  color?:
    | 'error'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | undefined;
  sx?: SxProps<Theme>;
}

const CTextField: React.FC<CTextFieldProps> = ({
  id,
  multiline = false,
  maxRows = 1,
  defaultValue,
  label,
  type,
  value,
  inputRef,
  minValue,
  maxValue,
  setValue,
  setFile,
  onChange,
  endAdornment,
  accept,
  error,
  helperText,
  focused = false,
  placeholder,
  color = 'primary',
  sx,
}) => {
  const theme = useTheme();

  return (
    <TextField
      id={id}
      focused={focused}
      sx={[cTextFieldStyles(theme).wrapper, ...(Array.isArray(sx) ? sx : [sx])]}
      label={label}
      type={type}
      multiline={multiline}
      maxRows={maxRows}
      defaultValue={defaultValue}
      value={value}
      color={color}
      error={error}
      helperText={helperText}
      inputRef={inputRef}
      placeholder={placeholder}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange();
        }
        if (event.target.files) {
          setFile(event.target.files[0]);
        }
        setValue(event.target.value);
      }}
      InputProps={{
        endAdornment: endAdornment,
        inputProps: { min: minValue, max: maxValue, accept: accept },
      }}
      InputLabelProps={{
        shrink: true,
        style: { color: theme.palette[color].main },
      }}
    />
  );
};

export default CTextField;
