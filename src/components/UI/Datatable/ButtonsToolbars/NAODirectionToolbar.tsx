import React from 'react';
import { Button } from '@mui/material';

interface NAODirectionToolbarProps {
  isEditing: boolean;
  onSubmit: () => void;
  onReject: () => void;
}

const NAODirectionToolbar: React.FC<NAODirectionToolbarProps> = ({
  isEditing = false,
  onSubmit,
  onReject,
}) => (
  <>
    {isEditing && (
      <>
        <Button onClick={onSubmit} variant="contained" color="success">
          Approuver
        </Button>
        <Button variant="contained" onClick={onReject}>
          Refuser
        </Button>
      </>
    )}
  </>
);

export default NAODirectionToolbar;
