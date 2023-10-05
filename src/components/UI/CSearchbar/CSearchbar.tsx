import React from 'react';
import { cSearchbarStyles } from './styles';
import { Box, IconButton, SxProps, Theme, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CTextField from '../CTextField/CTextField';
import { menuItem } from 'src/components/UI/types';
import CSelect from '../CSelect/CSelect';

interface CSearchbarProps {
  id: string;
  defaultValue?: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  setValue: (value: string) => void;
  onChange?: () => void;
  options?: menuItem[];
  optionValue?: string;
  // eslint-disable-next-line no-unused-vars
  setOptionValue?: (value: string) => void;
  sx?: SxProps<Theme>;
}

const CSearchbar: React.FC<CSearchbarProps> = ({
  id,
  defaultValue,
  value,
  setValue,
  options,
  optionValue,
  setOptionValue,
  sx,
}) => {
  const theme = useTheme();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleOnSearching = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Box
      sx={[
        cSearchbarStyles(theme).searchbarWrapper,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {options && optionValue && optionValue && (
        <CSelect
          menuItems={options}
          value={optionValue}
          setValue={setOptionValue}
          labelId="search-data-table"
          sx={cSearchbarStyles(theme).selectSearchbarOption}
        />
      )}
      <CTextField
        id={id}
        sx={cSearchbarStyles(theme).textfieldWrapper}
        label={'Rechercher'}
        defaultValue={defaultValue}
        value={value}
        setValue={setValue}
        onChange={handleOnSearching}
        inputRef={inputRef}
        endAdornment={
          value === '' ? (
            <IconButton aria-label="search">
              <SearchIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="cancel"
              onClick={() => {
                setValue('');
              }}
            >
              <CloseIcon />
            </IconButton>
          )
        }
      />
    </Box>
  );
};

export default CSearchbar;
