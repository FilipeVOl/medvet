import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '../images/edit.svg';
import { DataGrid } from '@mui/x-data-grid';
import Novoaluno from '../images/novoaluno.png'
import IconButton from '@mui/material/IconButton';


const theme = createTheme({
  palette: {
    common: {
      azul: '#100F49',
    }
  }
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.azul,
    color: theme.palette.common.white,
    paddingLeft: '70px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingLeft: '70px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const columns = [
  { field: 'registration', headerName: 'Matrícula', width: 150 },
  { field: 'name', headerName: 'Nome', width: 250 },
  { field: 'phone', headerName: 'N° de telefone', width: 200 },
  { field: 'editIcon', headerName: '', width: 200 },
];

const rows = [
  { id: 1, registration: '2211377', name: 'Filipe Gideao', phone: '62-982595874' },
  { id: 2, registration: '2210108', name: 'Jeniffer Ferraz', phone: '62-992448809' },
  { id: 3, registration: '2211863', name: 'Leticia Reis', phone: '62-992286724' },
  { id: 4, registration: '2313031', name: 'Millena Cardoso', phone: '62-981929827' },
  { id: 5, registration: '2313031', name: 'Millena Cardoso', phone: '62-981929827' },
];

const MostrarAluno = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <h1 className="font-Montserrat p-20 h-10 text-2xl font-bold">Alunos cadastrados</h1>
        <div className="mid grid grid-cols-[2fr_1fr] ml-36">
          <div className='flex items-center'>
            <input
              placeholder='N° de matricula'
              name="searchRegist"
              type="text"
              className="relative border-border-gray border-[1px] rounded-md pl-2 h-9 w-[50%] indent-10 bg-search"
            />
            <SearchIcon className="absolute p-4" />
          </div>
          <div className='flex justify-end'>
            <Button
              sx={{
                backgroundColor: '#100F49',
                width: '200px',
                borderRadius: '0.5rem;',
              }}
              variant="contained"
            >
              <div className='flex flex-row justify-center mr-auto gap-8'>
                <img src={Novoaluno} alt="imagem do botao" />
                Novo aluno
              </div>
            </Button>
          </div>
        </div>
        <div className='ml-36 lg:w-auto sm:w-screen md:w-[400px] mt-16'>
          <TableContainer component={Paper}>
            <Table sx={{ 
              width: '100%'
            }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell 
                    style={{
                      width: `${column.width}`
                    }}
                    key={column.field}>{column.headerName}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.id}>
                      <StyledTableCell>{row.registration}</StyledTableCell>
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell>{row.phone}</StyledTableCell>
                      <IconButton style={{
                      }}> <img src={EditIcon} /></IconButton>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MostrarAluno;
