import { Box, IconButton, Snackbar, Typography, useTheme } from '@mui/material';
import imageHome1 from 'src/assets/images/386866363_1021114562564325_8677415148423753126_n.jpg';
import imageHome2 from 'src/assets/images/IMG-20221227-WA0002.jpg';
import line from 'src/assets/images/line.png';

import { landingPageStyles } from './styles';
import CInfosCard from 'src/components/UI/CInfosCard/CInfosCard';
import EventIcon from '@mui/icons-material/Event';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ADRESS_EVENT } from 'src/config';
import { useState } from 'react';
import CTextField from 'src/components/UI/CTextField/CTextField';
import CLoadingIconButton from 'src/components/UI/CLoadingIconButton/CLoadingIconButton';

const LandingPage = () => {
  const theme = useTheme();

  const [copySnackbarOpen, setCopySnackbarOpen] = useState<boolean>(false);
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');

  return (
    <>
      <Box sx={landingPageStyles(theme).firstWrapper}>
        <Typography variant="h6" color={'secondary'}>
          {
            "Cette année Sylvie et Philippe fêtent leur 35 années de mariage au cours d'une soirée, vous êtes conviés à venir trinquer ensemble le 25 mai 2024 à *adresse*."
          }
        </Typography>
        <img src={line} style={{ width: '18em' }} />
        <Box sx={landingPageStyles(theme).gridWrapper}>
          <CInfosCard>
            {ADRESS_EVENT}
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(ADRESS_EVENT);
                setCopySnackbarOpen(true);
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </CInfosCard>
          <CInfosCard icon={<EventIcon color={'secondary'} />}>
            25 mai 2024
          </CInfosCard>
          <CInfosCard>Valider sa venue</CInfosCard>
        </Box>
      </Box>
      <Box sx={landingPageStyles(theme).background(imageHome1)} />
      <Box sx={landingPageStyles(theme).secondWrapper}>
        <CInfosCard>
          <Box sx={landingPageStyles(theme).addPersonWrapper}>
            <Typography>
              Vous venez à plusieurs ? Ajouter des personnes ici
            </Typography>
            <Box sx={landingPageStyles(theme).textFieldNameButtonWrapper}>
              <Box sx={landingPageStyles(theme).textFieldNameWrapper}>
                <CTextField
                  value={firstname}
                  setValue={setFirstname}
                  label={'Prénom'}
                  color={'secondary'}
                  sx={landingPageStyles(theme).textFieldName}
                  focused
                />
                <CTextField
                  value={lastname}
                  setValue={setLastname}
                  label={'Nom'}
                  color={'secondary'}
                  sx={landingPageStyles(theme).textFieldName}
                  focused
                />
              </Box>
              <CLoadingIconButton
                onClick={undefined}
                isLoading={false}
                icon={<AddCircleIcon />}
                color={'secondary'}
              />
            </Box>
          </Box>
        </CInfosCard>
        <CInfosCard>Infos supp</CInfosCard>
        <CInfosCard>
          Liste des participants ajoutés + valider leur venue
        </CInfosCard>
      </Box>
      <Box sx={landingPageStyles(theme).background(imageHome2)} />
      <Snackbar
        open={copySnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setCopySnackbarOpen(false)}
        message="Adresse copiée."
      />
    </>
  );
};

export default LandingPage;
