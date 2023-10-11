import { Box, Typography, useTheme } from '@mui/material';
import { picturesPageStyles } from './styles';
import CFab from 'src/components/UI/CFab/CFab';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const PicturesPage = () => {
  const theme = useTheme();

  return (
    <>
      <Box sx={picturesPageStyles(theme).mainWrapper}>
        <Typography variant="h1" color={'secondary'}>
          Photos
        </Typography>
      </Box>
      <CFab
        icon={<AddPhotoAlternateIcon />}
        onClick={() => console.log('coucou')}
      ></CFab>
    </>
  );
};

export default PicturesPage;
