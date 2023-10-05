import {
  Autocomplete,
  CircularProgress,
  TextField,
  useTheme,
} from '@mui/material';
import React from 'react';
import { CAutocompleteProps } from '../types';
import { cAutocompleteStyles } from './styles';

const CAutocomplete = <T,>({
  dataTestid,
  items,
  labelInput,
  inputValue,
  defaultValue,
  value,
  name,
  sx,
  freeSolo,
  isLoading,
  multiple,
  disabled,
  getOptionLabel,
  onChange,
  onClose,
  onInputChange,
  onHighlightChange,
  onClick,
  error,
}: CAutocompleteProps<T>) => {
  const theme = useTheme();

  return (
    <Autocomplete
      disabled={disabled}
      data-testid={dataTestid}
      value={value}
      freeSolo={freeSolo}
      autoSelect
      autoComplete
      disableClearable
      autoHighlight
      multiple={multiple}
      getOptionLabel={getOptionLabel}
      onChange={onChange}
      onClose={onClose}
      inputValue={inputValue}
      onInputChange={onInputChange}
      onHighlightChange={onHighlightChange}
      options={items}
      defaultValue={defaultValue}
      sx={[
        cAutocompleteStyles(theme).autocomplete,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      loading={isLoading}
      loadingText="Chargement en cours..."
      noOptionsText={'Aucune option'}
      renderInput={(params) => (
        <TextField
          onClick={onClick}
          data-testid="autocomplete-input"
          error={error}
          name={name}
          value={value}
          color="primary"
          {...params}
          label={labelInput}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {params.InputProps.endAdornment}
                {isLoading && (
                  <CircularProgress
                    data-testid="CircularProgress"
                    color="inherit"
                    size={20}
                  />
                )}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default CAutocomplete;
