import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import imageHome1 from 'src/assets/images/386866363_1021114562564325_8677415148423753126_n.jpg';
import imageHome2 from 'src/assets/images/familleAnniv.jpg';
import imageHome3 from 'src/assets/images/IMG-20221227-WA0002.jpg';
import line from 'src/assets/images/line.png';

import { landingPageStyles } from './styles';
import CInfosCard from 'src/components/UI/CInfosCard/CInfosCard';
import EventIcon from '@mui/icons-material/Event';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ADRESS_EVENT } from 'src/config';
import { useEffect, useRef, useState } from 'react';
import CTextField from 'src/components/UI/CTextField/CTextField';
import CLoadingIconButton from 'src/components/UI/CLoadingIconButton/CLoadingIconButton';
import TableMorePeople from './TableMorePeople/TableMorePeople';
import { scrollTo } from 'src/utils/functions';
import CLoadingButton from 'src/components/UI/CLoadingButton/CLoadingButton';
import { AddressCardInfos } from 'src/utils/types/AddressCardInfos';
import { HOTELS_INFORMATIONS } from 'src/utils/hotelsInformations';
import CImageInfosCard from 'src/components/UI/CImageInfosCard/CImageInfosCard';
import { AppDispatch } from 'src/store/store';
import { useDispatch } from 'react-redux';
import {
  addFakeUserAsync,
  getUserByCreatorAsync,
  getUserByIdsAsync,
  updateConfirmationAsync,
} from 'src/store/user/userAsync';
import { useAppSelector } from 'src/hooks';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { addItemUserCreatorList } from 'src/store/user/userSlices/getUserByCreatorSlice';
import { resetAddFakeUserRequest } from 'src/store/user/userSlices/addFakeUser';

const LandingPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const addPersonRef = useRef(null);
  const hotelRef = useRef(null);

  const idUser = useAppSelector((state) => state.auth.login.userId);
  const getUserByIdRequest = useAppSelector((state) => state.user.getUserById);
  const getUserByIdCreatorRequest = useAppSelector(
    (state) => state.user.getUsersByCreator,
  );
  const addFakeUserRequest = useAppSelector((state) => state.user.addFakeUser);
  const updateConfirmation = useAppSelector(
    (state) => state.user.updateConfirmation,
  );

  const [copySnackbarOpen, setCopySnackbarOpen] = useState<boolean>(false);
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [availability, setAvailability] = useState<string | null>(null);
  const [availabilityNew, setAvailabilityNew] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    dej: false,
    balade: false,
    soiree: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.checked,
    });
  };

  const { dej, balade, soiree } = formState;

  useEffect(() => {
    dispatch(getUserByIdsAsync(idUser));
  }, []);

  useEffect(() => {
    if (getUserByIdRequest.status === ReduxStatus.Succeeded) {
      setAvailability(getUserByIdRequest.data.confirmation?.toString() ?? null);
      setFormState({
        dej: getUserByIdRequest.data.confirmation_dej,
        balade: getUserByIdRequest.data.confirmation_balade,
        soiree: getUserByIdRequest.data.confirmation_diner,
      });
      dispatch(getUserByCreatorAsync(idUser));
    }
  }, [getUserByIdRequest]);

  useEffect(() => {
    setAvailabilityNew(availability);
  }, [setFormState, availability]);

  useEffect(() => {
    if (addFakeUserRequest.status === ReduxStatus.Succeeded) {
      dispatch(
        addItemUserCreatorList({
          user: {
            id: addFakeUserRequest.data.id,
            lastname: lastname,
            firstname: firstname,
            confirmation: availability === 'true',
            confirmation_dej:
              availability === 'true' && dej === true ? true : null,
            confirmation_balade:
              availability === 'true' && balade === true ? true : null,
            confirmation_diner:
              availability === 'true' && soiree === true ? true : null,
          },
        }),
      );
      dispatch(resetAddFakeUserRequest());
      setFirstname('');
      setLastname('');
    }
  }, [addFakeUserRequest]);

  return (
    <>
      <Box sx={landingPageStyles(theme).firstWrapper}>
        <Box>
          <Typography variant="h6" color={'secondary'}>
            {
              'Philippe et Sylvie vous invitent à partager une journée à St Sauveur en Puisaye le samedi 25 mai 2024.'
            }
          </Typography>
          <Typography variant="h6" color={'secondary'}>
            {
              'Nos 60 ans sont passés, ce sera nos 35 ans de mariage, une bonne occasion de faire la fête avec tous vous tous parents & amis.'
            }
          </Typography>
        </Box>
        <img src={line} style={{ width: '18em' }} />
        <Box>
          <Typography
            variant="h2"
            color={'secondary'}
            sx={{ marginBottom: theme.spacing(3) }}
          >
            Inscription
          </Typography>
          <FormControl
            component="fieldset"
            sx={{ display: 'flex', gap: theme.spacing(2) }}
            variant="standard"
          >
            <FormGroup>
              <RadioGroup
                aria-labelledby="availability-radio-buttons-group"
                name="availability-radio-buttons-group"
                value={availability}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setAvailability(event.target.value);
                  if (event.target.value) {
                    setFormState({ dej: false, balade: false, soiree: false });
                  }
                }}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <FormControlLabel
                  value={'true'}
                  control={<Radio color="secondary" />}
                  label="Disponible"
                />
                <FormControlLabel
                  value={'false'}
                  control={<Radio color="secondary" />}
                  label="Indisponible"
                />
              </RadioGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={availability !== 'true'}
                    checked={dej}
                    onChange={handleChange}
                    name="dej"
                    color="secondary"
                  />
                }
                label="Déjeuner dans le jardin à partir de 12h30"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={availability !== 'true'}
                    checked={balade}
                    onChange={handleChange}
                    name="balade"
                    color="secondary"
                  />
                }
                label="Après-midi, une petite marche digestive"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={availability !== 'true'}
                    checked={soiree}
                    onChange={handleChange}
                    name="soiree"
                    color="secondary"
                  />
                }
                label="Soirée à partir de 19h : apéro, diner, soirée comme en 2019 !"
              />
            </FormGroup>
            <CLoadingButton
              variant="contained"
              color="secondary"
              disabled={
                (!dej && !balade && !soiree && availability === 'true') ||
                availability === null
              }
              loading={updateConfirmation.status === ReduxStatus.Loading}
              onClick={() =>
                dispatch(
                  updateConfirmationAsync({
                    id: idUser,
                    body: {
                      confirmation: availability === 'true',
                      confirmation_dej:
                        availability === 'true' && dej === true ? true : null,
                      confirmation_balade:
                        availability === 'true' && balade === true
                          ? true
                          : null,
                      confirmation_diner:
                        availability === 'true' && soiree === true
                          ? true
                          : null,
                    },
                  }),
                )
              }
            >
              Valider
            </CLoadingButton>
          </FormControl>
        </Box>
        <Box sx={landingPageStyles(theme).gridWrapper}>
          <CInfosCard>
            <Box sx={landingPageStyles(theme).adressWrapper}>
              <Typography>2 Rue du Bourg Gelé,</Typography>
              <Typography>89520 Saint-Sauveur-en-Puisaye</Typography>
            </Box>
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
              <Box
                sx={{
                  width: '100%',
                  gap: theme.spacing(2),
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
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
                {addFakeUserRequest.error ===
                  'Request failed with status code 409' && (
                  <Alert severity="error" sx={{ fontFamily: 'unset' }}>
                    Un utilisateur porte déjà ce nom.
                  </Alert>
                )}
              </Box>
              <CLoadingIconButton
                onClick={() =>
                  dispatch(
                    addFakeUserAsync({
                      body: {
                        idCreator: idUser,
                        firstname: firstname,
                        lastname: lastname,
                        confirmation: availabilityNew === 'true',
                        confirmation_dej:
                          getUserByIdRequest.data.confirmation_dej,
                        confirmation_balade:
                          getUserByIdRequest.data.confirmation_balade,
                        confirmation_diner:
                          getUserByIdRequest.data.confirmation_diner,
                      },
                    }),
                  )
                }
                disabled={firstname === '' || lastname === ''}
                isLoading={addFakeUserRequest.status === ReduxStatus.Loading}
                icon={<AddCircleIcon />}
                color={'secondary'}
              />
            </Box>
          </Box>
        </CInfosCard>
        {getUserByIdCreatorRequest.status === ReduxStatus.loading && (
          <CInfosCard>
            <TableMorePeople data={getUserByIdCreatorRequest.data} />
          </CInfosCard>
        )}
      </Box>
      <Box sx={landingPageStyles(theme).background(imageHome2)} />
      {/* ------------------------------------Troisimème wrapper------------------------------------ */}
      <Box sx={landingPageStyles(theme).secondWrapper} ref={hotelRef}>
        <Typography>{"À la recherche d'un hôtel ?"}</Typography>
        <Box sx={landingPageStyles(theme).hotelsWrapper}>
          {HOTELS_INFORMATIONS.map((hotel: AddressCardInfos) => (
            <CImageInfosCard key={hotel.id} infos={hotel} />
          ))}
        </Box>
      </Box>
      <Box sx={landingPageStyles(theme).background(imageHome3)} />
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
