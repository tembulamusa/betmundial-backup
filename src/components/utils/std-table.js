import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StdTable = (props) => {
    const {headers, data, pagination, emptymessage} = props;

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#24367e",
          color: "#ffffff",
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
       
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
      function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0),
        createData('Ice cream sandwich', 237, 9.0)
      ];
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {headers?.map((header, idx) => (
                                <>
                                    <StyledTableCell align="">{header}</StyledTableCell>
                                </>
                            ))}
                        </TableRow>                       
                    </TableHead>
                    <TableBody>
                        {data.map((row, idx) => (
                            <StyledTableRow key={idx}>
                            <StyledTableCell component="th" scope="row">
                                {row.date}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.amount}</StyledTableCell>
                            <StyledTableCell align="right">{row.betmundial_balance}</StyledTableCell>
                            </StyledTableRow>
                        ))}

                        {data.length == 0 && 
                            <StyledTableRow key={4}>
                            <StyledTableCell colSpan={12} component="th" scope="row">
                                {emptymessage}
                            </StyledTableCell>
                            </StyledTableRow>
                        }
                    </TableBody>
                </Table>
                </TableContainer>
        </>
    ) 
}

export default React.memo(StdTable);