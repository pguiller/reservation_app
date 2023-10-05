import { SxProps, Theme } from '@mui/material';

interface CAutocompleteStyles {
  autocomplete: SxProps;
}

export const cAutocompleteStyles = (theme: Theme): CAutocompleteStyles => ({
  autocomplete: {
    marginTop: theme.spacing(2),
  },
});
