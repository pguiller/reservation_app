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
import React from 'react';
import { tableMorePeopleStyles } from './styles';
import { MorePeopleData } from 'src/utils/types/MorePeopleData';
import CLoadingIconButton from 'src/components/UI/CLoadingIconButton/CLoadingIconButton';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

type TableMorePeopleProps = {
  data: MorePeopleData[];
};

const TableMorePeople = ({ data }: TableMorePeopleProps) => {
  const theme = useTheme();

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
                  onClick={() => console.log('coucou')}
                  isLoading={false}
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
