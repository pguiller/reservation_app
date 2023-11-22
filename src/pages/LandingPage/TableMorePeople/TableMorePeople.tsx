import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  useTheme,
  TableHead,
  Box,
  Tooltip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { tableMorePeopleStyles } from './styles';
import { MorePeopleData } from 'src/utils/types/MorePeopleData';
import CLoadingIconButton from 'src/components/UI/CLoadingIconButton/CLoadingIconButton';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store/store';
import { deleteUserAsync } from 'src/store/user/userAsync';
import { useAppSelector } from 'src/hooks';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { removeItemUserCreatorList } from 'src/store/user/userSlices/getUserByCreatorSlice';

type TableMorePeopleProps = {
  data: MorePeopleData[];
};

const TableMorePeople = ({ data }: TableMorePeopleProps) => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const deleteUserRequest = useAppSelector((state) => state.user.deleteUser);
  const getUserByIdCreatorRequest = useAppSelector(
    (state) => state.user.getUsersByCreator,
  );

  const [idClicked, setIdClicked] = useState<number>(0);

  useEffect(() => {
    if (deleteUserRequest.status === ReduxStatus.Succeeded) {
      dispatch(
        removeItemUserCreatorList(
          getUserByIdCreatorRequest.data.findIndex(
            (user) => user.id === idClicked,
          ),
        ),
      );
    }
  }, [deleteUserRequest]);

  useEffect(() => {
    if (getUserByIdCreatorRequest.status === ReduxStatus.Succeeded) {
      dispatch(deleteUserAsync(idClicked));
    }
  }, [idClicked]);

  return (
    <TableContainer sx={tableMorePeopleStyles(theme).tableContainer}>
      <Table>
        <TableHead sx={tableMorePeopleStyles(theme).tableHeader}>
          <TableRow>
            <TableCell sx={{ width: '45%' }}>Prénom</TableCell>
            <TableCell sx={{ width: '45%' }}>Nom</TableCell>
            <TableCell sx={{ width: '10%' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow sx={tableMorePeopleStyles(theme).tableRow} key={row.id}>
              <TableCell sx={tableMorePeopleStyles(theme).tableCell}>
                <Tooltip title={row.firstname}>
                  <Box sx={tableMorePeopleStyles(theme).textContainer}>
                    {row.firstname}
                  </Box>
                </Tooltip>
              </TableCell>
              <TableCell sx={tableMorePeopleStyles(theme).tableCell}>
                <Tooltip title={row.lastname}>
                  <Box sx={tableMorePeopleStyles(theme).textContainer}>
                    {row.lastname}
                  </Box>
                </Tooltip>
              </TableCell>
              <TableCell sx={tableMorePeopleStyles(theme).tableCell}>
                <CLoadingIconButton
                  onClick={() => {
                    setIdClicked(row.id);
                  }}
                  isLoading={deleteUserRequest.status === ReduxStatus.Loading}
                  icon={<PersonRemoveIcon color="secondary" />}
                  tooltip={'Supprimer'}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableMorePeople;
