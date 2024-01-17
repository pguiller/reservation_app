import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
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
  deleteUserAsync,
  getUsersAsync,
  updateConfirmationAsync,
} from 'src/store/user/userAsync';
import { useAppSelector } from 'src/hooks';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { resetAddFakeUserRequest } from 'src/store/user/userSlices/addFakeUser';
import { User } from 'src/utils/types/User';
import CStatusPill from 'src/components/UI/CStatusPill/CStatusPill';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { updateConfirmationItemUserList } from 'src/store/user/userSlices/getUsersSlice';

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

  const idUser = useAppSelector((state) => state.auth.login.userId);
  const getUsersRequest = useAppSelector((state) => state.user.getUser);
  const addFakeUserRequest = useAppSelector((state) => state.user.addFakeUser);
  const deleteUserRequest = useAppSelector((state) => state.user.deleteUser);
  const updateUserRequest = useAppSelector(
    (state) => state.user.updateConfirmation,
  );

  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [availability, setAvailability] = useState<string>('Non répondu');
  const [dataRows, setDataRows] = useState<User[]>([]);
  const [selectedModifyOption, setSelectedModifyOption] = useState<
    Record<number, string>
  >({});
  const [isEditingId, setIsEditingId] = useState<number | null>(null);
  const [ghestNumber, setGhestNumber] = useState({
    totalNumber: 0,
    availableNumber: 0,
    waitingNumber: 0,
    dejNumber: 0,
    baladeNumber: 0,
    soireeNumber: 0,
  });
  const [formState, setFormState] = useState({
    dej: false,
    balade: false,
    soiree: false,
  });

  const initialRowFormState = {
    dejRow: false,
    baladeRow: false,
    soireeRow: false,
  };
  const [rowFormState, setRowFormState] = useState(initialRowFormState);

  const { dej, balade, soiree } = formState;
  const { dejRow, baladeRow, soireeRow } = rowFormState;
  const {
    totalNumber,
    availableNumber,
    waitingNumber,
    dejNumber,
    baladeNumber,
    soireeNumber,
  } = ghestNumber;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowFormState({
      ...rowFormState,
      [event.target.name]: event.target.checked,
    });
  };

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
      field: 'confirmation',
      sortable: true,
      flex: 1,
      headerName: 'Réponse',
      type: 'string',
      renderCell: (params: GridCellParams) => {
        const selectedValue = selectedModifyOption[params.row.id];
        const defaultAvailability =
          dataRows.length > 0
            ? dataRows[dataRows.findIndex((user) => user.id === params.row.id)]
                .confirmation === true
              ? 'Disponible'
              : dataRows[
                  dataRows.findIndex((user) => user.id === params.row.id)
                ].confirmation === false
              ? 'Indisponible'
              : 'Non répondu'
            : 'Non répondu';

        const severity =
          defaultAvailability === 'Indisponible'
            ? 'error'
            : defaultAvailability === 'Disponible'
            ? 'success'
            : 'warning';

        return (
          <>
            {isEditingId === params.row.id && (
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
                  if (newValue !== 'Disponible') {
                    setRowFormState(initialRowFormState);
                  }
                }}
                labelId={'modify-availability-select'}
                size="small"
              />
            )}
            {isEditingId !== params.row.id && (
              <CStatusPill severity={severity}>
                {defaultAvailability}
              </CStatusPill>
            )}
          </>
        );
      },
    },
    {
      field: 'confirmation_dej',
      sortable: true,
      flex: 1,
      headerName: 'Déjeuner',
      type: 'string',
      renderCell: (params: GridCellParams) => {
        let dispoDej = 'Non répondu';
        let severity: 'warning' | 'success' | 'error' = 'warning';
        let disabled: boolean =
          params.row.confirmation === null || params.row.confirmation === false;

        if (params.row.confirmation) {
          dispoDej = params.row.confirmation_dej
            ? 'Disponible'
            : 'Indisponible';
          severity = params.row.confirmation_dej ? 'success' : 'error';
        } else if (params.row.confirmation !== null) {
          severity = 'error';
          dispoDej = 'Indisponible';
        }

        if (selectedModifyOption[params.row.id]) {
          disabled = !(selectedModifyOption[params.row.id] === 'Disponible');
        }

        return (
          <>
            {isEditingId !== params.row.id && (
              <CStatusPill severity={severity}>{dispoDej}</CStatusPill>
            )}
            {isEditingId === params.row.id && (
              <Checkbox
                checked={dejRow}
                onChange={handleRowChange}
                name="dejRow"
                disabled={disabled}
              />
            )}
          </>
        );
      },
    },
    {
      field: 'confirmation_balade',
      sortable: true,
      flex: 1,
      headerName: 'Après-midi',
      type: 'string',
      renderCell: (params: GridCellParams) => {
        let dispoBalade = 'Non répondu';
        let severity: 'warning' | 'success' | 'error' = 'warning';
        let disabled: boolean =
          params.row.confirmation === null || params.row.confirmation === false;

        if (params.row.confirmation) {
          dispoBalade = params.row.confirmation_balade
            ? 'Disponible'
            : 'Indisponible';
          severity = params.row.confirmation_balade ? 'success' : 'error';
        } else if (params.row.confirmation !== null) {
          severity = 'error';
          dispoBalade = 'Indisponible';
        }

        if (selectedModifyOption[params.row.id]) {
          disabled = !(selectedModifyOption[params.row.id] === 'Disponible');
        }

        return (
          <>
            {isEditingId !== params.row.id && (
              <CStatusPill severity={severity}>{dispoBalade}</CStatusPill>
            )}
            {isEditingId === params.row.id && (
              <Checkbox
                checked={baladeRow}
                onChange={handleRowChange}
                name="baladeRow"
                disabled={disabled}
              />
            )}
          </>
        );
      },
    },
    {
      field: 'confirmation_soiree',
      sortable: true,
      flex: 1,
      headerName: 'Soirée',
      type: 'string',
      renderCell: (params: GridCellParams) => {
        let dispoSoiree = 'Non répondu';
        let severity: 'warning' | 'success' | 'error' = 'warning';
        let disabled: boolean =
          params.row.confirmation === null || params.row.confirmation === false;

        if (params.row.confirmation) {
          dispoSoiree = params.row.confirmation_diner
            ? 'Disponible'
            : 'Indisponible';
          severity = params.row.confirmation_diner ? 'success' : 'error';
        } else if (params.row.confirmation !== null) {
          severity = 'error';
          dispoSoiree = 'Indisponible';
        }

        if (selectedModifyOption[params.row.id]) {
          disabled = !(selectedModifyOption[params.row.id] === 'Disponible');
        }

        return (
          <>
            {isEditingId !== params.row.id && (
              <CStatusPill severity={severity}>{dispoSoiree}</CStatusPill>
            )}
            {isEditingId === params.row.id && (
              <Checkbox
                checked={soireeRow}
                onChange={handleRowChange}
                name="soireeRow"
                disabled={disabled}
              />
            )}
          </>
        );
      },
    },
    {
      field: 'edit',
      flex: 1,
      headerName: 'Éditer',
      type: 'string',
      renderCell: (params: GridCellParams) => (
        <>
          {isEditingId !== params.row.id && (
            <IconButton
              onClick={() => {
                setIsEditingId(params.row.id);
                setRowFormState({
                  dejRow:
                    params.row.confirmation === null ||
                    params.row.confirmation === false
                      ? null
                      : params.row.confirmation_dej,
                  baladeRow:
                    params.row.confirmation === null ||
                    params.row.confirmation === false
                      ? null
                      : params.row.confirmation_balade,
                  soireeRow:
                    params.row.confirmation === null ||
                    params.row.confirmation === false
                      ? null
                      : params.row.confirmation_diner,
                });
              }}
            >
              <EditIcon />
            </IconButton>
          )}
          {isEditingId === params.row.id && (
            <Box>
              <IconButton
                onClick={() => {
                  setRowFormState(initialRowFormState);
                  setIsEditingId(null);
                }}
              >
                <CancelIcon color="error" />
              </IconButton>
              <IconButton
                color="success"
                onClick={() => {
                  dispatch(
                    updateConfirmationAsync({
                      id: params.row.id,
                      body: {
                        confirmation: selectedModifyOption[params.row.id]
                          ? selectedModifyOption[params.row.id] === 'Disponible'
                            ? true
                            : selectedModifyOption[params.row.id] ===
                              'Indisponible'
                            ? false
                            : null
                          : params.row.confirmation,
                        confirmation_dej:
                          selectedModifyOption[params.row.id] === 'Indisponible'
                            ? false
                            : selectedModifyOption[params.row.id] ===
                              'Non Répondu'
                            ? null
                            : dejRow !== null
                            ? dejRow
                            : false,
                        confirmation_balade:
                          selectedModifyOption[params.row.id] === 'Indisponible'
                            ? false
                            : selectedModifyOption[params.row.id] ===
                              'Non Répondu'
                            ? null
                            : baladeRow !== null
                            ? baladeRow
                            : false,
                        confirmation_diner:
                          selectedModifyOption[params.row.id] === 'Indisponible'
                            ? false
                            : selectedModifyOption[params.row.id] ===
                              'Non Répondu'
                            ? null
                            : soireeRow !== null
                            ? soireeRow
                            : false,
                      },
                    }),
                  );
                }}
              >
                <CheckCircleIcon />
              </IconButton>
            </Box>
          )}
        </>
      ),
    },
    {
      field: 'delete',
      sortable: false,
      width: 100,
      headerName: 'Supprimer',
      disableExport: true,
      type: 'string',
      renderCell: (params: GridCellParams) => (
        <>
          {params.row.id !== idUser && (
            <CLoadingIconButton
              isLoading={deleteUserRequest.status === ReduxStatus.Loading}
              icon={<PersonRemoveIcon />}
              onClick={() => {
                dispatch(deleteUserAsync(params.row.id));
              }}
            />
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  useEffect(() => {
    if (getUsersRequest.status === ReduxStatus.Succeeded) {
      setDataRows(getUsersRequest.data);
    }
  }, [getUsersRequest]);

  useEffect(() => {
    if (addFakeUserRequest.status === ReduxStatus.Succeeded) {
      dispatch(getUsersAsync());
      setFirstname('');
      setLastname('');
      setFormState({ dej: false, balade: false, soiree: false });
    }
  }, [addFakeUserRequest]);

  useEffect(() => {
    if (deleteUserRequest.status === ReduxStatus.Succeeded) {
      dispatch(getUsersAsync());
    }
  }, [deleteUserRequest]);

  useEffect(() => {
    if (updateUserRequest.status === ReduxStatus.Succeeded) {
      let confirmationValue = null;

      if (
        selectedModifyOption[
          getUsersRequest.data[
            getUsersRequest.data.findIndex((user) => user.id === isEditingId)
          ].id
        ]
      ) {
        confirmationValue =
          selectedModifyOption[
            getUsersRequest.data[
              getUsersRequest.data.findIndex((user) => user.id === isEditingId)
            ].id
          ] === 'Disponible'
            ? true
            : selectedModifyOption[
                getUsersRequest.data[
                  getUsersRequest.data.findIndex(
                    (user) => user.id === isEditingId,
                  )
                ].id
              ] === 'Indisponible'
            ? false
            : null;
      } else {
        confirmationValue =
          getUsersRequest.data[
            getUsersRequest.data.findIndex((user) => user.id === isEditingId)
          ].confirmation;
      }
      dispatch(
        updateConfirmationItemUserList({
          id: isEditingId,
          confirmation: confirmationValue,
          confirmation_dej: dejRow,
          confirmation_balade: baladeRow,
          confirmation_diner: soireeRow,
        }),
      );
      setIsEditingId(null);
    }
  }, [updateUserRequest]);

  useEffect(() => {
    setGhestNumber({
      totalNumber: dataRows.length,
      availableNumber: dataRows
        .map((row) => row.confirmation)
        .filter((confirmation) => confirmation === true).length,
      waitingNumber: dataRows
        .map((row) => row.confirmation)
        .filter((confirmation) => confirmation === null).length,
      dejNumber: dataRows
        .map((row) => row.confirmation_dej)
        .filter((confirmation) => confirmation).length,
      baladeNumber: dataRows
        .map((row) => row.confirmation_balade)
        .filter((confirmation) => confirmation).length,
      soireeNumber: dataRows
        .map((row) => row.confirmation_diner)
        .filter((confirmation) => confirmation).length,
    });
  }, [dataRows]);

  return (
    <Box sx={adminPageStyles(theme).mainWrapper}>
      <Typography variant="h2" sx={{ fontSize: '3rem' }}>
        Administration
      </Typography>
      <Box sx={adminPageStyles(theme).statsWrapper}>
        <CInfosCard sx={adminPageStyles(theme).card}>
          <Typography variant="body1">{'Invités'}</Typography>
          <Typography variant="h5">{totalNumber}</Typography>
        </CInfosCard>
        <CInfosCard sx={adminPageStyles(theme).card}>
          <Typography variant="body1">
            {availableNumber > 1 ? 'Disponibles' : 'Disponible'}
          </Typography>
          <Typography variant="h5">{availableNumber}</Typography>
        </CInfosCard>
        <CInfosCard sx={adminPageStyles(theme).card}>
          <Typography variant="body1">{'En attente'}</Typography>
          <Typography variant="h5">{waitingNumber}</Typography>
        </CInfosCard>
        <CInfosCard sx={adminPageStyles(theme).card}>
          <Typography variant="body1">{'Déjeuner'}</Typography>
          <Typography variant="h5">{dejNumber}</Typography>
        </CInfosCard>
        <CInfosCard sx={adminPageStyles(theme).card}>
          <Typography variant="body1">{'Balade'}</Typography>
          <Typography variant="h5">{baladeNumber}</Typography>
        </CInfosCard>
        <CInfosCard sx={adminPageStyles(theme).card}>
          <Typography variant="body1">{'Soirée'}</Typography>
          <Typography variant="h5">{soireeNumber}</Typography>
        </CInfosCard>
      </Box>
      <CInfosCard sx={adminPageStyles(theme).addUserCard}>
        <Box sx={{ width: '100%' }}>
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
              sx={adminPageStyles(theme).textFieldName}
              menuItems={availabiltySlectOptions}
              label="Disponibilité"
              value={availability}
              setValue={setAvailability}
              labelId={'availability'}
            />
          </Box>
          <FormGroup sx={adminPageStyles(theme).checkboxWrapper}>
            <FormControlLabel
              control={
                <Checkbox checked={dej} onChange={handleChange} name="dej" />
              }
              label="Déjeuner"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={balade}
                  onChange={handleChange}
                  name="balade"
                  color="primary"
                />
              }
              label="Après-midi"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={soiree}
                  onChange={handleChange}
                  name="soiree"
                />
              }
              label="Soirée"
              color="primary"
            />
          </FormGroup>
        </Box>
        <CLoadingIconButton
          onClick={() => {
            dispatch(resetAddFakeUserRequest());
            if (firstname !== '' && lastname !== '') {
              let confirmation = null;
              if (availability === 'Disponible') {
                confirmation = true;
              }
              if (availability === 'Indisponible') {
                confirmation = false;
              }
              dispatch(
                addFakeUserAsync({
                  body: {
                    idCreator: idUser,
                    firstname: firstname,
                    lastname: lastname,
                    confirmation: confirmation,
                    confirmation_dej: dej,
                    confirmation_balade: balade,
                    confirmation_diner: soiree,
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
      {getUsersRequest.status === ReduxStatus.Succeeded && (
        <DataTable
          sx={{ fontFamily: 'unset' }}
          columns={columnsUsers}
          rows={dataRows}
          pageSize={30}
          rowsPerPageOptions={[5]}
          loading={false}
        />
      )}
    </Box>
  );
};

export default AdminPage;
