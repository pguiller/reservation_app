import { Alert, Box, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { adminPageStyles } from './styles';
import CInfosCard from 'src/components/UI/CInfosCard/CInfosCard';
import CTextField from 'src/components/UI/CTextField/CTextField';
import CLoadingIconButton from 'src/components/UI/CLoadingIconButton/CLoadingIconButton';
import CSelect from 'src/components/UI/CSelect/CSelect';
import { menuItem } from 'src/components/UI/types';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DataTable from 'src/components/UI/Datatable/DataTable';
import { GridColDef, GridCellParams } from '@mui/x-data-grid';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { AppDispatch } from 'src/store/store';
import { useDispatch } from 'react-redux';
import {
  addFakeUserAsync,
  deleteMemberAsync,
  deleteUserAsync,
  getUsersAsync,
  updateConfirmationAsync,
} from 'src/store/user/userAsync';
import { useAppSelector } from 'src/hooks';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { createUSersMembersData } from 'src/utils/functions';
import { UserData } from 'src/utils/types/UserData';
import { resetAddFakeUserRequest } from 'src/store/user/userSlices/addFakeUser';

const availabiltySlectOptions: menuItem[] = [
  {
    id: 0,
    label: 'Non répondu',
  },
  {
    id: 1,
    label: 'Disponible',
  },
  {
    id: 2,
    label: 'Indisponible',
  },
];

const AdminPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const getUsersRequest = useAppSelector((state) => state.user.getUser);
  const addFakeUserRequest = useAppSelector((state) => state.user.addFakeUser);
  const deleteUserRequest = useAppSelector((state) => state.user.deleteUser);
  const deleteMemberRequest = useAppSelector(
    (state) => state.user.deleteMember,
  );

  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [availability, setAvailability] = useState<string>('Non répondu');
  const [dataRows, setDataRows] = useState<UserData[]>([]);
  const [selectedModifyOption, setSelectedModifyOption] = useState<
    Record<number, string>
  >({});
  const [ghestNumber, setGhestNumber] = useState<number>(0);
  const [ghestNumberAvailable, setGhestNumberAvailable] = useState<number>(0);
  const [ghestNumberWaiting, setGhestNumberWaiting] = useState<number>(0);

  const columnsUsers: GridColDef[] = [
    {
      field: 'firstname',
      headerName: 'Prénom',
      type: 'string',
      valueGetter: (params: GridCellParams) => params.row.firstname,
      flex: 1,
    },
    {
      field: 'lastname',
      headerName: 'Nom',
      type: 'string',
      valueGetter: (params: GridCellParams) => params.row.lastname,
      flex: 1,
    },
    {
      field: 'availability',
      sortable: true,
      flex: 1,
      headerName: 'Réponse',
      type: 'string',
      renderCell: (params: GridCellParams) => {
        const selectedValue = selectedModifyOption[params.row.id];
        const defaultAvailability =
          dataRows.length > 0
            ? dataRows[params.row.id - 1].confirmation === true
              ? 'Disponible'
              : dataRows[params.row.id - 1].confirmation === false
              ? 'Indisponible'
              : 'Non répondu'
            : 'Non répondu';

        return (
          <CSelect
            sx={{ width: '100%' }}
            menuItems={availabiltySlectOptions}
            value={selectedValue || defaultAvailability}
            disabled={params.row.isMember}
            setValue={(newValue: string) => {
              setSelectedModifyOption((prevState) => ({
                ...prevState,
                [params.row.id]: newValue,
              }));
              dispatch(
                updateConfirmationAsync({
                  id: params.row.idTable,
                  body: {
                    Confirmation:
                      newValue === 'Disponible'
                        ? true
                        : newValue === 'Indisponible'
                        ? false
                        : null,
                  },
                }),
              );
            }}
            labelId={'modify-availability-select'}
            size="small"
          />
        );
      },
    },
    {
      field: 'delete',
      sortable: false,
      width: 100,
      headerName: 'Supprimer',
      disableExport: true,
      type: 'string',
      renderCell: (params: GridCellParams) => (
        <CLoadingIconButton
          isLoading={false}
          icon={<PersonRemoveIcon />}
          disabled={false}
          onClick={() => {
            params.row.isMember
              ? dispatch(deleteMemberAsync(params.row.idTable))
              : dispatch(deleteUserAsync(params.row.idTable));
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  useEffect(() => {
    if (getUsersRequest.status === ReduxStatus.Succeeded) {
      setDataRows(createUSersMembersData(getUsersRequest.data));
    }
  }, [getUsersRequest]);

  useEffect(() => {
    if (addFakeUserRequest.status === ReduxStatus.Succeeded) {
      dispatch(getUsersAsync());
      setFirstname('');
      setLastname('');
    }
  }, [addFakeUserRequest]);

  useEffect(() => {
    if (deleteMemberRequest.status === ReduxStatus.Succeeded) {
      dispatch(getUsersAsync());
    }
  }, [deleteMemberRequest]);

  useEffect(() => {
    if (deleteUserRequest.status === ReduxStatus.Succeeded) {
      dispatch(getUsersAsync());
    }
  }, [deleteUserRequest]);

  useEffect(() => {
    setGhestNumber(dataRows.length);
    setGhestNumberAvailable(
      dataRows
        .map((row) => row.confirmation)
        .filter((confirmation) => confirmation === true).length,
    );
    setGhestNumberWaiting(
      dataRows
        .map((row) => row.confirmation)
        .filter((confirmation) => confirmation === null).length,
    );
  }, [dataRows]);

  return (
    <Box sx={adminPageStyles(theme).mainWrapper}>
      <Typography variant="h2" sx={{ fontSize: '3rem' }}>
        Administration
      </Typography>
      <Box sx={adminPageStyles(theme).statsWrapper}>
        <CInfosCard sx={adminPageStyles(theme).card}>
          <Typography variant="body1">{'Invités'}</Typography>
          <Typography variant="h5">{ghestNumber}</Typography>
        </CInfosCard>
        <CInfosCard sx={adminPageStyles(theme).card}>
          <Typography variant="body1">
            {ghestNumberAvailable > 1 ? 'Disponibles' : 'Disponible'}
          </Typography>
          <Typography variant="h5">{ghestNumberAvailable}</Typography>
        </CInfosCard>
        <CInfosCard sx={adminPageStyles(theme).card}>
          <Typography variant="body1">{'En attente'}</Typography>
          <Typography variant="h5">{ghestNumberWaiting}</Typography>
        </CInfosCard>
      </Box>
      <CInfosCard sx={adminPageStyles(theme).addUserCard}>
        <Box sx={adminPageStyles(theme).addUserWrapper}>
          <CTextField
            sx={adminPageStyles(theme).textFieldName}
            value={firstname}
            setValue={setFirstname}
            label="Prénom"
          />
          <CTextField
            sx={adminPageStyles(theme).textFieldName}
            value={lastname}
            setValue={setLastname}
            label="Nom"
          />
          <CSelect
            menuItems={availabiltySlectOptions}
            label="Disponibilité"
            value={availability}
            setValue={setAvailability}
            labelId={'availability'}
          />
        </Box>
        <CLoadingIconButton
          onClick={() => {
            dispatch(resetAddFakeUserRequest());
            if (firstname !== '' && lastname !== '') {
              dispatch(
                addFakeUserAsync({
                  body: {
                    firstname: firstname,
                    lastname: lastname,
                    confirmation:
                      availability === 'Disponible'
                        ? true
                        : availability === 'Indisponible'
                        ? false
                        : null,
                  },
                }),
              );
            }
          }}
          isLoading={addFakeUserRequest.status === ReduxStatus.Loading}
          icon={<PersonAddIcon />}
        />
      </CInfosCard>
      {addFakeUserRequest.error === 'Request failed with status code 409' && (
        <Alert severity="error" sx={{ fontFamily: 'unset' }}>
          Un utilisateur porte déjà ce nom.
        </Alert>
      )}
      {addFakeUserRequest.error === 'Request failed with status code 500' && (
        <Alert severity="error" sx={{ fontFamily: 'unset' }}>
          Une erreur est survenue.
        </Alert>
      )}
      {addFakeUserRequest.status === ReduxStatus.Succeeded && (
        <Alert severity="success" sx={{ fontFamily: 'unset' }}>
          Invité créé.
        </Alert>
      )}
      <DataTable
        sx={{ fontFamily: 'unset' }}
        columns={columnsUsers}
        rows={dataRows}
        pageSize={30}
        rowsPerPageOptions={[5]}
        loading={false}
      />
    </Box>
  );
};

export default AdminPage;
