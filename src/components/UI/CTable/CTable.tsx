import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  useTheme,
} from '@mui/material';
import React from 'react';
import { cTanleStyles } from './styles';
import { tableData } from '../types';

type CTableProps = {
  data: tableData[];
};

const CTable = ({ data }: CTableProps) => {
  const theme = useTheme();

  return (
    <TableContainer sx={cTanleStyles(theme).tableContainer}>
      <Table>
        <TableBody>
          {data.map((row) => (
            <TableRow sx={cTanleStyles(theme).tableRow} key={row.title}>
              <TableCell
                sx={cTanleStyles(theme).tableCell}
                component="th"
                scope="row"
              >
                {row.title}
              </TableCell>
              <TableCell sx={cTanleStyles(theme).tableCell}>
                {row.data}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CTable;
