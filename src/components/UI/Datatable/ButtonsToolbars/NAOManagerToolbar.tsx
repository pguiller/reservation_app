import React from 'react';
import { Button } from '@mui/material';

interface NAOManagerToolbarProps {
  isEditing: boolean;
  onSubmit: () => void;
  onDelete: (() => void) | undefined;
}

const NAOManagerToolbar: React.FC<NAOManagerToolbarProps> = ({
  isEditing = false,
  onSubmit,
  onDelete,
}) => (
  <>
    {!isEditing && (
      <Button
        onClick={onSubmit}
        variant="contained"
        color="primary"
        type="submit"
      >
        Valider
      </Button>
    )}
    {isEditing && (
      <Button variant="contained" onClick={onDelete}>
        Supprimer
      </Button>
    )}
  </>
);

export default NAOManagerToolbar;
