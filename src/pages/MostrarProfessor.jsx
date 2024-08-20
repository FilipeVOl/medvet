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
import { useEffect } from "react";
import { getProfessores, getProfByReg } from "../services/professores";
import Professor from "./Professor";
import {
  UpdateEditContext,
} from "../contexts/updateEditContext";
import { patchTutor } from "../services/tutores";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "calc(100vh - 50px)",
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
  { field: "registration", headerName: "CRMV" },
  { field: "name", headerName: "Nome" },
  { field: "phone", headerName: "N° de telefone" },
  { field: "editIcon", headerName: "" },
];

const MostrarProf = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [registration, setRegistration] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const handleButtonClick = () => setOpenEdit(!openEdit);
  const handleDeleteClick = () => setOpenDelete(!openDelete);
  const handleNewClick = () => setOpenNew(!openNew);

  const [data, setData] = useState("");
  const [users, setUsers] = useState([data]);

  useEffect(() => {
    getProfessores(setData, currPage, itemsPerPage);
    console.log(totalItems)
  }, [selectedUser, openNew, currPage]);

  const handlePage = (event, value) => {
    setCurrPage(value);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

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
        <div className="container">
          {showToast && (
            <div className="animate-fadeIn opacity-0 absolute top-32 right-0 m-4">
              <div
                class="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
                role="alert"
                tabindex="-1"
                aria-labelledby="hs-toast-success-example-label"
              >
                <div class="flex p-4">
                  <div class="shrink-0">
                    <svg
                      class="shrink-0 size-4 text-teal-500 mt-0.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                    </svg>
                  </div>
                  <div class="ms-3">
                    <p
                      id="hs-toast-success-example-label"
                      class="text-sm text-gray-700 dark:text-neutral-400"
                    >
                      Professor excluído com sucesso
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <h1 className="font-Montserrat p-20 h-10 text-2xl font-bold">
            Professores cadastrados
          </h1>
          <div className="mid grid grid-cols-[2fr_1fr] ml-36 sm:w-[80%]">
            <div className="flex items-center">
              <input
                placeholder="N° de matricula"
                name="searchRegist"
                type="text"
                onChange={({ target }) => {
                  setQuery(target.value);
                  getProfByReg(setData, target.value);
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
                  backgroundColor: "#100F49",
                  width: "200px",
                  borderRadius: "0.5rem;",
                  "&:hover": {
                    backgroundColor: "#2C2B60",
                  },
                }}
                variant="contained"
              >
                <div className="flex flex-row justify-center mr-auto gap-2">
                  <img src={Novoaluno} alt="imagem do botao" />
                  <h1 className="whitespace-nowrap">Novo Professor</h1>
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
                    <Professor buttonName="Cadastrar" />
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
                  {Object.values(data).map((row) => (
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
                          handleDeleteClick();
                          setSelectedUser(row);
                        }}
                      >
                        {/* // axios.delete(`http://localhost:3333/deletealuno/${row.id}`)
                      // function removeRow () {
                      //   const dataC = [...data]
                      //   dataC.splice(TableBody.data, 0)
                      //   console.log(dataC)
                      // } */}

                        <img src={TrashIcon} />
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
              <Pagination count={currPage} onChange={handlePage} />
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
                <Professor buttonName="Atualizar" />
              </Typography>
            </Box>
          </Modal>

          <Modal
            open={openDelete}
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
                height: "1/3",
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
                    onClick={() => {
                      console.log(selectedUser.id);
                      handleDeleteClick();
                      patchTutor(selectedUser.id);
                      setShowToast(true);
                    }}
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
        </div>
      </UpdateEditContext.Provider>
    </ThemeProvider>
  );
};

export default MostrarProf;
