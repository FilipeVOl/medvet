import React from 'react'
import Button from '@mui/material/Button';
import Novoaluno from '../images/novoaluno.png'
import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Search from '../images/search.png'

const theme = createTheme({
    palette: {
        common: {
            azul: '#100F49',
        }
    }
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.azul,
      color: theme.palette.common.white,
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

  function createData(registration, name, phone) {
    return { registration, name, phone };
  }

  const rows = [
    createData('2211377', 'Filipe Gideao', '62-982595874'),
    createData('2210108', 'Jeniffer Ferraz', '62-992448809'),
    createData('2211863', 'Leticia Reis', '62-992286724'),
    createData('2313031', 'Millena Cardoso', '62-981929827'),
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
             className="relative border-border-gray border-[1px] rounded-md pl-2 h-9 max-w-[50%] indent-10 bg-search">
            </input>
            <img src={Search} className="absolute p-4" alt="" />
            </div>

        <div>
        <Button sx={{
        backgroundColor: '#100F49',
        width: '200px',
        borderRadius: '0.5rem;'
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

        {/* <div className="header grid grid-cols-[1fr_2fr_1fr] gap-32 bg-border-blue text-white rounded-md">
            <p className='ml-10 font-Montserrat'>Matrícula</p>
            <p className='font-Montserrat'>Nome</p>
            <p className='font-Montserrat'>N° de telefone</p>
        </div> */}
        
<div className='ml-36 lg:w-[840px] sm:w-[600px] mt-16'>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 600, }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Matricula</StyledTableCell>
            <StyledTableCell align="right">Nome</StyledTableCell>
            <StyledTableCell align="right">N° de telefone</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.registration}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
</div>
</ThemeProvider>
)
}

export default MostrarAluno