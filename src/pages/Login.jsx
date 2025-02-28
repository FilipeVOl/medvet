import React, { useContext, useState, useEffect } from "react";
import logoLogin from "../images/logoLogin.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Outlet, useNavigate } from "react-router-dom";
import { RecoveryContext } from "../contexts/recoveryContext";
import { validateCPF } from "../utils/validateCPF";
import { UserContext } from "../contexts/userContext";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

const Login = () => {
  const { setPage, setCPF } = useContext(RecoveryContext);
  const { saveUserAndToken, loadUserData } = useContext(UserContext);
  const [cpf, setCPFState] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUserData();
      navigate("/");
    }
  }, [navigate, loadUserData]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateCPF(cpf)) {
      muiSnackAlert("error", "CPF inválido.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3333/sessions", {
        cpf,
        password,
      });
      console.log("response session: ", response.data);

      const { token, user } = response.data;
      const { name, cpf: userCpf, role, created_at, email, phone } = user;
      const userData = {
        name,
        cpf: userCpf,
        role,
        created_at,
        email,
        phone,
      };
      console.log("userData: ", userData);

      localStorage.setItem("token", token);
      saveUserAndToken(userData, token);

      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      muiSnackAlert("error", "Erro ao fazer login. Verifique o CPF e a senha.");
    }
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

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={severity} sx={{ width: "100%" }} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
      <div className="font-Montserrat relative h-[100vh] bg-cover bg-[url('./images/backgroundLogin.png')] flex justify-center items-center">
        <div className="absolute inset-0 bg-[#BDD9BFCC] opacity-80 "></div>
        <div className="relative z-10 h-auto w-[50%] bg-white rounded-lg flex justify-center flex-col">
          <img
            src={logoLogin}
            alt="logo login"
            className="place-self-center mt-12"
          />
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "70%" } }}
            noValidate
            autoComplete="off"
          >
            <div className="flex flex-col justify-center items-center w-full gap-8 my-14">
              <TextField
                type="number"
                id="outlined-error"
                label="Usuário"
                onChange={(e) => setCPFState(e.target.value)}
                error={!validateCPF(cpf) && cpf !== ""}
                helperText={
                  !validateCPF(cpf) && cpf !== "" ? "CPF inválido." : ""
                }
                InputProps={{
                  style: {
                    backgroundColor: "#F2F2ED",
                    border: "none",
                    outline: "none",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                      boxShadow:
                        "0px 4px 4px 0px #00000005 inset, 0px 4px 4px 0px #00000026",
                    },
                    "&:hover fieldset": {
                      border: "none",
                      boxShadow:
                        "0px 4px 4px 0px #00000005 inset, 0px 4px 4px 0px #00000026",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                      boxShadow:
                        "0px 4px 4px 0px #00000005 inset, 0px 4px 4px 0px #00000026",
                    },
                  },
                }}
              />
              <TextField
                id="outlined-error-helper-text"
                label="Senha"
                type="password"
                value={password} // Add value prop
                onChange={(e) => setPassword(e.target.value)} // Add onChange handler
                // helperText="Senha Incorreta."
                InputProps={{
                  style: {
                    backgroundColor: "#F2F2ED",
                    border: "none",
                    outline: "none",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                      boxShadow:
                        "0px 4px 4px 0px #00000005 inset, 0px 4px 4px 0px #00000026",
                    },
                    "&:hover fieldset": {
                      border: "none",
                      boxShadow:
                        "0px 4px 4px 0px #00000005 inset, 0px 4px 4px 0px #00000026",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                      boxShadow:
                        "0px 4px 4px 0px #00000005 inset, 0px 4px 4px 0px #00000026",
                    },
                  },
                }}
                fullWidth
              />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEmail(email);
                  setPage("otp");
                }}
                className="outline-black decoration-2 underline underline-offset-8 transition-all duration-300 transform hover:scale-105 hover:decoration-[3px]"
              >
                <strong>Esqueceu a senha?</strong>
              </button>

              <button
                onClick={handleLogin} // Add onClick handler
                className="bg-[#144A36] hover:opacity-50  text-white font-bold rounded-[10px] h-[46px] w-[220px] transform duration-300 hover:scale-105"
              >
                Entrar
              </button>
            </div>
          </Box>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Login;
