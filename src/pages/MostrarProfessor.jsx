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
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { getProfByReg } from "../services/professores";
import Professor from "./Professor";
import { UpdateEditContext } from "../contexts/updateEditContext";
import { patchProf } from "../services/professores";
import { Snackbar, Alert } from "@mui/material";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

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
  { field: "registration", headerName: "CRMV" },
  { field: "name", headerName: "Nome" },
  { field: "phone", headerName: "N° de telefone" },
  { field: "editIcon", headerName: "" },
];

const MostrarProf = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [status_delete, setStatusDelete] = useState("");
  const [registration, setRegistration] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [query, setQuery] = useState("");
  const handleButtonClick = () => setOpenEdit(!openEdit);
  const handleDeleteClick = () => setOpenDelete(!openDelete);
  const handleNewClick = () => setOpenNew(!openNew);
  const [signal, setSignal] = useState(true);

  const [data, setData] = useState("");

  useEffect(() => {
    getProfByReg(query).then((data) => {
      setFilteredData(data);
    });
  }, [selectedUser, openNew, query, signal]);

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
      text: "Tem certeza de que quer excluir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#100F49",
      cancelButtonColor: "#D5D0C7",
      confirmButtonText: "Excluir",
      cancelButtonText: "Voltar",
    }).then((result) => {
      if (result.isConfirmed) {
        patchProf(setStatusDelete, row.id, muiSnackAlert, "Professor excluído");
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
        <div className="container pl-14 pr-8">
          <h1 className="font-Montserrat p-16 h-10 text-2xl font-bold">
            Professores cadastrados
          </h1>
          <div className="mid grid grid-cols-[2fr_1fr] ml-14 sm:w-[80%]">
            <div className="flex items-center relative"> {/* Added relative positioning */}
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
                sx={{
                  position: "absolute",
                  left: "10px",
                  color: "gray",
                  fontSize: "20px",
                }}
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
                <div className="flex flex-row justify-center mr-auto gap-2">
                  <PersonAddIcon />
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
          <div className="ml-14 sm:w-[80%] mt-16">
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
                            <EditIcon sx={{ color: "#144A36" }} />
                          </IconButton>

                          <IconButton
                            className="delete-button"
                            onClick={() => {
                              // setSelectedUser(row);
                              handleDelete(row);
                            }}
                          >
                            <DeleteIcon sx={{ color: "#d32f2f" }} />
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
              <Pagination count={data.numberOfPages} onChange={handlePage} />
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

          {/* <Modal
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
                      patchProf(
                        setStatusDelete,
                        selectedUser.id,
                        muiSnackAlert
                      );
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
          </Modal> */}
        </div>
      </UpdateEditContext.Provider>
    </ThemeProvider>
  );
};

export default MostrarProf;
