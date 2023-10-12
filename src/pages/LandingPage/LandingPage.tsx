import {
  Box,
  FormControl,
  FormControlLabel,
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
import { useEffect, useRef, useState } from 'react';
import CTextField from 'src/components/UI/CTextField/CTextField';
import CLoadingIconButton from 'src/components/UI/CLoadingIconButton/CLoadingIconButton';
import TableMorePeople from './TableMorePeople/TableMorePeople';
import { MorePeopleData } from 'src/utils/types/MorePeopleData';
import { scrollTo } from 'src/utils/functions';
import CLoadingButton from 'src/components/UI/CLoadingButton/CLoadingButton';
import { AddressCardInfos } from 'src/utils/types/AddressCardInfos';
import { HOTELS_INFORMATIONS } from 'src/utils/hotelsInformations';
import CImageInfosCard from 'src/components/UI/CImageInfosCard/CImageInfosCard';
import { ACTIVITIES_INFORMATIONS } from 'src/utils/activitiesInformations';
import { AppDispatch } from 'src/store/store';
import { useDispatch } from 'react-redux';
import {
  addMemberAsync,
  getUserByIdsAsync,
  updateConfirmationAsync,
} from 'src/store/user/userAsync';
import { useAppSelector } from 'src/hooks';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { addMembersToUser } from 'src/store/user/userSlices/getUserByIdSlice';
import { resetAddMemberRequest } from 'src/store/user/userSlices/addMemberSlice';
import { Member } from 'src/utils/types/Member';

const LandingPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const addPersonRef = useRef(null);
  const hotelRef = useRef(null);
  const activityRef = useRef(null);

  const idUser = useAppSelector((state) => state.auth.login.userId);
  const getUserByIdRequest = useAppSelector((state) => state.user.getUserById);
  const addMemberRequest = useAppSelector((state) => state.user.addMember);

  const [copySnackbarOpen, setCopySnackbarOpen] = useState<boolean>(false);
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [availability, setAvailability] = useState<string>('');
  const membersArray: MorePeopleData[] = getUserByIdRequest.data.members.map(
    (member: Member) => ({
      id: member.Id,
      firstname: member.firstname,
      lastname: member.lastname,
    }),
  );

  useEffect(() => {
    dispatch(getUserByIdsAsync(idUser));
  }, []);

  useEffect(() => {
    console.log(getUserByIdRequest);
  }, [getUserByIdRequest]);

  useEffect(() => {
    if (addMemberRequest.status === ReduxStatus.Succeeded) {
      dispatch(
        addMembersToUser({
          member: { firstname: firstname, lastname: lastname },
        }),
      );
      dispatch(resetAddMemberRequest());
      membersArray.push({
        id: membersArray.length,
        firstname: firstname,
        lastname: lastname,
      });
      setFirstname('');
      setLastname('');
    }
  }, [addMemberRequest]);

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
          <CInfosCard>
            <FormControl>
              <Typography>Valider sa venue</Typography>
              <RadioGroup
                aria-labelledby="availability-radio-buttons-group"
                name="availability-radio-buttons-group"
                value={availability}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setAvailability(event.target.value)
                }
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
            </FormControl>
            <CLoadingButton
              variant="contained"
              color="secondary"
              loading={false}
              onClick={() =>
                dispatch(
                  updateConfirmationAsync({
                    id: idUser,
                    body: {
                      Confirmation: availability === 'true',
                    },
                  }),
                )
              }
            >
              Valider
            </CLoadingButton>
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
                onClick={() =>
                  dispatch(
                    addMemberAsync({
                      id: idUser,
                      body: [{ firstname: firstname, lastname: lastname }],
                    }),
                  )
                }
                isLoading={addMemberRequest.status === ReduxStatus.Loading}
                icon={<AddCircleIcon />}
                color={'secondary'}
              />
            </Box>
          </Box>
        </CInfosCard>
        {getUserByIdRequest.data.members.length > 0 && (
          <CInfosCard>
            <TableMorePeople data={membersArray} />
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
      {/* ------------------------------------Quatrième wrapper------------------------------------ */}
      <Box sx={landingPageStyles(theme).secondWrapper} ref={activityRef}>
        <Typography>{'Les recommandations de Sylvie'}</Typography>
        <Box sx={landingPageStyles(theme).hotelsWrapper}>
          {ACTIVITIES_INFORMATIONS.map((activity: AddressCardInfos) => (
            <CImageInfosCard key={activity.id} infos={activity} />
          ))}
        </Box>
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
