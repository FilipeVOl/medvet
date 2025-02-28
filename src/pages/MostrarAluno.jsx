import React, { useState } from "react";
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
import Novoaluno from "../images/novoaluno.png";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Cadastro from "./Cadastro";
import { useEffect } from "react";
import { getAluno, getAlunoByReg, patchAluno } from "../services/alunos";
import {
  UpdateEditContext,
  UpdateEditProvider,
} from "../contexts/updateEditContext";
import { Snackbar, Alert } from "@mui/material";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "calc(100vh - 50px)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// melhorias
// fazer paginação com fix do banco de dados de numberofPages

const theme = createTheme({
  palette: {
    common: {
      verde: "#144A36",
    },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.verde,
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
  { field: "registration", headerName: "Matricula" },
  { field: "name", headerName: "Nome" },
  { field: "phone", headerName: "N° de telefone" },
  { field: "editIcon", headerName: "" },
];

const MostrarAluno = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [status_delete, setStatusDelete] = useState(false);
  const [registration, setRegistration] = useState("");
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [signal, setSignal] = useState(true);

  const handleButtonClick = () => setOpenEdit(!openEdit);
  const handleDeleteClick = () => setOpenDelete(!openDelete);
  const handleNewClick = () => setOpenNew(!openNew);

  const [data, setData] = useState("");

  useEffect(() => {
    getAlunoByReg(query).then((data) => {
      setFilteredData(data);
    });
  }, [selectedUser, query, signal]);

  const handlePage = (event, value) => {
    setCurrPage(value);
  };

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  const muiSnackAlert = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleDelete = (row) => {
    Swal.fire({
      title: "Excluir cadastro?",
      text: "Tem certeza que quer excluir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#144A36",
      cancelButtonColor: "#D5D0C7",
      confirmButtonText: "Excluir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        patchAluno(
          setStatusDelete,
          row.id,
          muiSnackAlert,
          "Aluno excluído com sucesso!"
        )
          .then(() => {
            setFilteredData((prevData) =>
              prevData.filter((item) => item.id !== row.id)
            );
          })
          .catch((error) => {
            console.error("Erro ao excluir aluno:", error);
            muiSnackAlert("error", "Erro ao excluir aluno.");
          });
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <UpdateEditContext.Provider
        value={{
          openEdit,
          setOpenEdit,
          openNew,
          setOpenNew,
          selectedUser,
          setSelectedUser,
        }}
      >
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity={severity}
            sx={{ width: "100%" }}
            onClose={handleClose}
          >
            {message}
          </Alert>
        </Snackbar>
        <div className="container">
          <h1 className="font-Montserrat p-20 h-10 text-2xl font-bold">
            Alunos cadastrados
          </h1>
          <div className="mid grid grid-cols-[2fr_1fr] ml-36 sm:w-[80%]">
            <div className="flex items-center">
              <input
                placeholder="N° de matricula"
                name="searchRegist"
                type="text"
                onChange={({ target }) => {
                  setQuery(target.value);
                }}
                className="relative border-border-gray border-[1px] rounded-md pl-2 h-9 w-[50%] indent-10 bg-search"
              />
              <SearchIcon
                style={{
                  color: "gray",
                }}
                className="absolute translate-x-4"
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleNewClick}
                sx={{
                  backgroundColor: "#D5D0C7",
                  width: "200px",
                  borderRadius: "0.5rem;",
                  "&:hover": {
                    backgroundColor: "#144A36",
                  },
                }}
                variant="contained"
              >
                <div className="flex flex-row justify-center mr-auto gap-8">
                  <img src={Novoaluno} alt="imagem do botao" />
                  Novo aluno
                </div>
              </Button>

              <Modal
                open={openNew}
                onClose={handleNewClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    <Cadastro buttonName="Cadastrar" />
                  </Typography>
                </Box>
              </Modal>
            </div>
          </div>
          <div className="ml-36 sm:w-[80%] mt-16">
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) =>
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
                  {console.log(filteredData)}
                  {filteredData &&
                    filteredData
                      .filter((row) => !row.status_delete)
                      .map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell>{row.registration}</StyledTableCell>
                          <StyledTableCell>{row.name}</StyledTableCell>
                          <StyledTableCell>{row.phone}</StyledTableCell>
                          <IconButton
                            className="edit-button"
                            onClick={() => {
                              handleButtonClick();
                              setSelectedUser(row);
                            }}
                          >
                            <img src={EditIcon} />
                          </IconButton>

                          <IconButton
                            className="delete-button"
                            onClick={() => {
                              // handleDeleteClick();
                              // setSelectedUser(row);
                              handleDelete(row);
                            }}
                          >
                            <img src={TrashIcon} className=" text-black" />
                          </IconButton>
                        </StyledTableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack
              className="flex justify-center items-center mt-4"
              spacing={2}
            >
              <Pagination count={1} onChange={handlePage} />
            </Stack>
          </div>

          <Modal
            open={openEdit}
            onClose={handleButtonClick}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <Cadastro
                  selected={selectedUser}
                  openEdit={setOpenEdit}
                  buttonName="Atualizar"
                />
              </Typography>
            </Box>
          </Modal>
        </div>
      </UpdateEditContext.Provider>
    </ThemeProvider>
  );
};

export default MostrarAluno;
