import {
  Box,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import imageHome1 from 'src/assets/images/386866363_1021114562564325_8677415148423753126_n.jpg';
import imageHome2 from 'src/assets/images/familleAnniv.jpg';
import imageHome3 from 'src/assets/images/IMG-20221227-WA0002.jpg';
import imageHome4 from 'src/assets/images/IMG-20221227-WA0002.jpg';
import line from 'src/assets/images/line.png';

import { landingPageStyles } from './styles';
import CInfosCard from 'src/components/UI/CInfosCard/CInfosCard';
import EventIcon from '@mui/icons-material/Event';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ADRESS_EVENT } from 'src/config';
import { useRef, useState } from 'react';
import CTextField from 'src/components/UI/CTextField/CTextField';
import CLoadingIconButton from 'src/components/UI/CLoadingIconButton/CLoadingIconButton';
import TableMorePeople from './TableMorePeople/TableMorePeople';
import { MorePeopleData } from 'src/utils/types/MorePeopleData';
import { scrollTo } from 'src/utils/functions';

const fakeData: MorePeopleData[] = [
  {
    id: 0,
    firstname: 'Marie-Alix',
    lastname: 'Duhamel',
  },
  {
    id: 1,
    firstname: 'Bertrand',
    lastname: 'Duhamel',
  },
  {
    id: 2,
    firstname: 'Marion',
    lastname: 'Duhamel',
  },
];

const LandingPage = () => {
  const theme = useTheme();
  const addPersonRef = useRef(null);
  const hotelRef = useRef(null);
  const activityRef = useRef(null);

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
            <Tooltip title="Copier">
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(ADRESS_EVENT);
                  setCopySnackbarOpen(true);
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </CInfosCard>
          <CInfosCard icon={<EventIcon color={'secondary'} />}>
            25 mai 2024
          </CInfosCard>
          <CInfosCard>Valider sa venue</CInfosCard>
          <CInfosCard
            isButton
            icon={<PersonAddIcon />}
            onClick={() => scrollTo(addPersonRef)}
          >
            Vous êtes acccompagné.e ?
          </CInfosCard>
          <CInfosCard
            isButton
            icon={<LocalHotelIcon />}
            onClick={() => scrollTo(hotelRef)}
          >
            Un hébergement ?
          </CInfosCard>
          <CInfosCard
            isButton
            icon={<GolfCourseIcon />}
            onClick={() => scrollTo(activityRef)}
          >
            Une activité ?
          </CInfosCard>
        </Box>
      </Box>
      <Box sx={landingPageStyles(theme).background(imageHome1)} />
      {/* ------------------------------------Deuxième wrapper------------------------------------ */}
      <Box sx={landingPageStyles(theme).secondWrapper} ref={addPersonRef}>
        <CInfosCard>
          <Box sx={landingPageStyles(theme).addPersonWrapper}>
            <Typography variant="body1">
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
        <CInfosCard>
          <TableMorePeople data={fakeData} />
        </CInfosCard>
      </Box>
      <Box sx={landingPageStyles(theme).background(imageHome2)} />
      {/* ------------------------------------Troisimème wrapper------------------------------------ */}
      <Box sx={landingPageStyles(theme).secondWrapper} ref={hotelRef}>
        <Typography>{"À la recherche d'un hôtel ?"}</Typography>
      </Box>
      <Box sx={landingPageStyles(theme).background(imageHome3)} />
      {/* ------------------------------------Quatrième wrapper------------------------------------ */}
      <Box sx={landingPageStyles(theme).secondWrapper} ref={activityRef}>
        <Typography>{'Les recommandations de Sylvie'}</Typography>
      </Box>
      <Box sx={landingPageStyles(theme).background(imageHome4)} />
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
