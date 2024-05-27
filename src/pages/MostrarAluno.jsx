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
import Cadastro from "./Cadastro";
import { useEffect } from "react";
import { getAluno, getAlunoByReg } from "../services/alunos";
import { UpdateEditContext, UpdateEditProvider } from "../contexts/updateEditContext";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "calc(99vh - 130px)",
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
  const [registration, setRegistration] = useState("");
  const [query, setQuery] = useState("");

  const handleButtonClick = () => setOpenEdit(!openEdit);
  const handleDeleteClick = () => setOpenDelete(!openDelete);
  const handleNewClick = () => setOpenNew(!openNew);

  const [data, setData] = useState("");
  const [users, setUsers] = useState([data]);

  useEffect(() => {
    getAluno(setData);
  }, [selectedUser, openNew]);

  return (
    <ThemeProvider theme={theme}>
      <UpdateEditContext.Provider value={{ openEdit, setOpenEdit, openNew, setOpenNew, selectedUser, setSelectedUser }}>
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
              onChange={({ target }) =>{
                setQuery(target.value)
                getAlunoByReg(setData, target.value)
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
                <Typography id="modal-modal-title" variant="h6" component="h2">
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
                      onClick={ () => {
                      handleDeleteClick();
                      setSelectedUser(row)}}
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
        </div>

        <Modal
          open={openEdit}
          onClose={handleButtonClick}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Cadastro selected={selectedUser} openEdit={setOpenEdit} buttonName="Atualizar" />
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
                    handleDeleteClick();
                    const newUsers = users.filter(user => user.id !== selectedUser.id);
                      setUsers(newUsers)
                      console.log(users)
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


export default MostrarAluno;
