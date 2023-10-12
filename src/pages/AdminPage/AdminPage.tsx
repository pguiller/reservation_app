import { Box, Typography, useTheme } from '@mui/material';
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
import { getUsersAsync } from 'src/store/user/userAsync';

const fakeRowsUsers = [
  {
    id: 1,
    firstname: 'Paul',
    lastname: 'Guillermier',
    availability: 'Disponible',
  },
  {
    id: 2,
    firstname: 'Bertrand',
    lastname: 'Duhamel',
    availability: 'Indisponible',
  },
  {
    id: 3,
    firstname: 'Marie-Alix',
    lastname: 'Duhamel',
    availability: 'Non répondu',
  },
  {
    id: 4,
    firstname: 'Paul',
    lastname: 'Guillermier',
    availability: 'Indisponible',
  },
  {
    id: 5,
    firstname: 'Paul',
    lastname: 'Guillermier',
    availability: 'Non répondu',
  },
  {
    id: 6,
    firstname: 'Paul',
    lastname: 'Guillermier',
    availability: 'Non répondu',
  },
  {
    id: 7,
    firstname: 'Paul',
    lastname: 'Guillermier',
    availability: 'Non répondu',
  },
  {
    id: 8,
    firstname: 'Paul',
    lastname: 'Guillermier',
    availability: 'Non répondu',
  },
  {
    id: 9,
    firstname: 'Paul',
    lastname: 'Guillermier',
    availability: 'Non répondu',
  },
  {
    id: 10,
    firstname: 'Bertrand',
    lastname: 'Duhamel',
    availability: 'Indisponible',
  },
  {
    id: 11,
    firstname: 'Bertrand',
    lastname: 'Duhamel',
    availability: 'Indisponible',
  },
  {
    id: 12,
    firstname: 'Bertrand',
    lastname: 'Duhamel',
    availability: 'Indisponible',
  },
  {
    id: 13,
    firstname: 'Bertrand',
    lastname: 'Duhamel',
    availability: 'Indisponible',
  },
  {
    id: 14,
    firstname: 'Bertrand',
    lastname: 'Duhamel',
    availability: 'Indisponible',
  },
];

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
    width: 220,
    headerName: 'Réponse',
    type: 'string',
    renderCell: (params: GridCellParams) => {
      // eslint-disable-next-line no-unused-vars
      const updatedRow = { ...params.row, availability: params.value };
      const selectedValue = 'Non répondu';
      // const selectedValue = selectedModifyOptions[params.row.id] || 'Non répondu';
      const defaultAvailability = true;

      return (
        <CSelect
          menuItems={availabiltySlectOptions}
          setValue={selectedValue || defaultAvailability}
          labelId={'modify-availability-select'}
          size="small"
        />
      );
    },
  },
  {
    field: 'delete',
    sortable: false,
    width: 70,
    headerName: 'Supprimer',
    disableExport: true,
    type: 'string',
    renderCell: (params: GridCellParams) => (
      <CLoadingIconButton
        isLoading={false}
        icon={<PersonRemoveIcon />}
        onClick={() => {
          console.log(params.row);
        }}
      />
    ),
  },
];

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

  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [availability, setAvailability] = useState<string>('Non répondu');

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  return (
    <Box sx={adminPageStyles(theme).mainWrapper}>
      <Typography variant="h2" color={'secondary'} sx={{ fontSize: '3rem' }}>
        Administration
      </Typography>
      <Box sx={adminPageStyles(theme).statsWrapper}>
        <CInfosCard>
          <Typography variant="body1">{"Nombre d'invités"}</Typography>
          <Typography variant="h5">{'100'}</Typography>
        </CInfosCard>
        <CInfosCard>
          <Typography variant="body1">{'Réponses positives'}</Typography>
          <Typography variant="h5">{'80'}</Typography>
        </CInfosCard>
        <CInfosCard>
          <Typography variant="body1">{'Réponses en attente'}</Typography>
          <Typography variant="h5">{'15'}</Typography>
        </CInfosCard>
      </Box>
      <CInfosCard sx={adminPageStyles(theme).addUserCard}>
        <Box sx={adminPageStyles(theme).addUserWrapper}>
          <CTextField
            sx={adminPageStyles(theme).textFieldName}
            value={firstname}
            setValue={setFirstname}
            label="Prénom"
            color="secondary"
            focused
          />
          <CTextField
            sx={adminPageStyles(theme).textFieldName}
            value={lastname}
            setValue={setLastname}
            label="Nom"
            color="secondary"
            focused
          />
          <CSelect
            menuItems={availabiltySlectOptions}
            label="Disponibilité"
            value={availability}
            setValue={setAvailability}
            labelId={'availability'}
            color="secondary"
          />
        </Box>
        <CLoadingIconButton
          onClick={() => console.log('coucou')}
          isLoading={false}
          icon={<PersonAddIcon color="secondary" />}
        />
      </CInfosCard>
      <DataTable
        columns={columnsUsers}
        rows={fakeRowsUsers}
        pageSize={10}
        rowsPerPageOptions={[5]}
        loading={false}
      />
    </Box>
  );
};

export default AdminPage;
