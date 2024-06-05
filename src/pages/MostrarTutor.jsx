import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "../images/edit.svg";
import TrashIcon from "../images/trash.svg";
import Novoprofessor from "../images/novoaluno.png";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import Tutor from "../pages/TelaNovoTutor";
import { getTutores } from "../services/tutores";
import tutores from "../mocks/tutor.mock";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  palette: {
    common: {
      azul: "#100F49",
    },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.azul,
    color: theme.palette.common.white,
    paddingLeft: "70px",
    width: "900px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingLeft: "70px",
    width: "900px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const columns = [
  { field: "name", headerName: "Nome" },
  { field: "phone", headerName: "N° de Telefone" },
  { field: "editIcon", headerName: "" },
];

// TENTAR FAZER LÓGICA DE DELETAR DO ROW, UTILIZANDO STATES

const MostrarTutor = () => {
  const [linha, setLinha] = useState("");
  const SpliceLinha = (index) => {
    const dataLinha = [...linha];
    dataLinha.splice(index, 1);
    setLinha(dataLinha);
    console.log(linha);
  };
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleButtonClick = () => setOpenEdit(!openEdit);
  const handleDeleteClick = () => setOpenDelete(!openDelete);
  let [data, setData] = useState("");
  useEffect(() => {
    getTutores(setData);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="container w-full">
        <h1 className="font-Montserrat p-20 h-10 text-2xl font-bold">
          Tutores cadastrados
        </h1>
        <div className="mid grid grid-cols-[2fr_1fr] ml-36 sm:w-[80%]">
          <div className="flex items-center">
            <input
              placeholder="N° de matricula"
              name="searchRegist"
              type="text"
              className="relative border-border-gray border-[1px] rounded-md pl-2 h-9 w-[50%] indent-10 bg-search"
            />
            <SearchIcon className="absolute p-4" />
          </div>

          <div className="flex justify-end">
            <Button
              sx={{
                backgroundColor: "#100F49",
                width: "200px",
                borderRadius: "0.5rem;",
                "&:hover": {
                  backgroundColor: "#2C2B60",
                },
              }}
              variant="contained"
            >
              <div className="flex flex-row justify-center mr-auto gap-8">
                <img src={Novoprofessor} alt="imagem do botao" />
                Novo Tutor
              </div>
            </Button>
          </div>
        </div>
        <div className="ml-36 sm:w-[80%] mt-16">
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  {columns.map((column) =>
                    // <StyledTableCell
                    // key={column.field}>{column.headerName}
                    // </StyledTableCell>
                    column.field == "editIcon" ? (
                      <StyledTableCell
                        style={{
                          width: "100px",
                        }}
                        key={column.field}
                      >
                        {column.headerName}
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell key={column.field}>
                        {column.headerName}
                      </StyledTableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {tutores.map((linha) => (
                  <StyledTableRow key={linha.id}>
                    <StyledTableCell>{linha.name}</StyledTableCell>
                    <StyledTableCell>{linha.phone}</StyledTableCell>
                    <Modal
                      open={openEdit}
                      onClose={handleButtonClick}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          <Tutor buttonName="Atualizar" />
                        </Typography>
                      </Box>
                    </Modal>

                    <Modal
                      open={openDelete}
                      style={{
                        borderRadius: '0.375rem'
                      }}
                      onClose={handleDeleteClick}
                      aria-labelledby="modal-modal-deletetitle"
                      aria-describedby="modal-modal-description2"
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "500px",
                          height: "20%",
                          bgcolor: "background.paper",
                          border: "2px solid #000",
                          boxShadow: 24,
                          p: 4,
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "27px",
                          }}
                          className="font-Montserrat flex flex-col gap-12"
                          id="modal-modal-deletetitle"
                          variant="h6"
                          component="h1"
                        >
                          Excluir cadastro?
                          <p>Tem certeza de que quer excluir?</p>
                          <div className="grid grid-cols-2">
                            <IconButton
                              style={{
                                backgroundColor: "white",
                                width: "200px",
                                borderRadius: "6px",
                                border: "1px solid black",
                                color: "black",
                                "&:hover": {
                                  backgroundColor: "#2C2B60",
                                },
                              }}
                              onClick={handleDeleteClick}
                            >
                              Voltar
                            </IconButton>
                            <IconButton
                              onClick={SpliceLinha}
                              style={{
                                backgroundColor: "#100F49",
                                width: "200px",
                                borderRadius: "6px",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "#2C2B60",
                                },
                              }}
                            >
                              Excluir
                            </IconButton>
                          </div>
                        </Typography>
                      </Box>
                    </Modal>

                    <IconButton onClick={handleButtonClick}>
                      <img src={EditIcon} />
                    </IconButton>

                    <IconButton onClick={handleDeleteClick}>
                      {/* axios.delete(`http://localhost:3333/deletealuno/${row.id}`)
                      function removeRow () {
                      const dataC = [...data]
                         dataC.splice(TableBody.data, 0)
                      console.log(dataC)
                      } */}

                      <img src={TrashIcon} />
                    </IconButton>
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

export default MostrarTutor;
