import React from 'react';
import { cModalStyles } from './styles';
import {
  Alert,
  Box,
  Breakpoint,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';

interface CModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  hasButton?: boolean;
  hasCancelButton?: boolean;
  hasSubmitButton?: boolean;
  buttonTitle?: string;
  buttonOnClick?: () => void;
  buttonIsLoading?: boolean;
  buttonIsDisabled?: boolean;
  error: boolean;
  errorMessage: string;
  size?: false | Breakpoint | undefined;
  sx?: SxProps<Theme>;
}

const CModal: React.FC<CModalProps> = ({
  children,
  isOpen,
  onClose,
  modalTitle,
  hasButton = true,
  hasCancelButton = true,
  hasSubmitButton = true,
  buttonTitle,
  buttonOnClick,
  buttonIsLoading,
  buttonIsDisabled,
  error,
  errorMessage,
  size = 'md',
  sx,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      maxWidth={size}
      sx={[cModalStyles(theme).modal, ...(Array.isArray(sx) ? sx : [sx])]}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <>
        <DialogTitle sx={cModalStyles(theme).titleWrapper}>
          <Box>
            <Typography variant="h4" sx={cModalStyles(theme).title}>
              {modalTitle}
            </Typography>
          </Box>
          <IconButton onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={cModalStyles(theme).contentWrapper}>
          {children}
        </DialogContent>
        {hasButton && (
          <>
            <Box sx={cModalStyles(theme).footerWrapper}>
              {error && (
                <Alert sx={cModalStyles(theme).error} severity="warning">
                  {errorMessage}
                </Alert>
              )}
              <Box sx={cModalStyles(theme).buttonWrapper}>
                {hasCancelButton && (
                  <Button onClick={() => onClose()}>Annuler</Button>
                )}
                {hasSubmitButton && (
                  <LoadingButton
                    variant="contained"
                    loading={buttonIsLoading}
                    onClick={buttonOnClick}
                    sx={cModalStyles(theme).button}
                    disabled={buttonIsDisabled}
                  >
                    {buttonTitle}
                  </LoadingButton>
                )}
              </Box>
            </Box>
          </>
        )}
      </>
    </Dialog>
  );
};

export default CModal;
