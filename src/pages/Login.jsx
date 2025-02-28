import React, { useContext, useState, useEffect } from "react";
import logoLogin from "../images/logoLogin.svg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Outlet, useNavigate } from "react-router-dom";
import { RecoveryContext } from "../contexts/recoveryContext";
import { validateCPF } from "../utils/validateCPF";
import { UserContext } from "../contexts/userContext";
import axios from "axios";
import InputMask from "react-input-mask";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Snackbar, Alert } from "@mui/material";

const Login = () => {
  const { setPage } = useContext(RecoveryContext);
  const { saveUserAndToken, loadUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const [cpf, setCPFState] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rememberedCPF = localStorage.getItem("rememberedCPF");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    if (token) {
      loadUserData();
      navigate("/");
    }
    if (rememberedCPF && rememberedPassword) {
      setCPFState(rememberedCPF);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, [navigate, loadUserData]);

  const formatCPF = (cpf) => {
    return cpf.replace(/[^\d]/g, "");
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("A senha é obrigatória");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("A senha deve conter no mínimo 6 caracteres");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
    if (event.target.checked) {
      localStorage.setItem("rememberedCPF", cpf);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedCPF");
      localStorage.removeItem("rememberedPassword");
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const muiSnackAlert = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpenAlert(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const formattedCPF = formatCPF(cpf);

    if (!validateCPF(formattedCPF)) {
      muiSnackAlert("error", "CPF inválido.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3333/sessions", {
        cpf: formattedCPF,
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
      saveUserAndToken(userData, token, token);

      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      muiSnackAlert("error", "Erro ao fazer login. Verifique o CPF e a senha.");
    }
  };

  return (
    <div className="font-Montserrat relative min-h-screen bg-cover bg-[url('./images/backgroundLogin.png')] flex justify-center items-center p-4">
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={severity}
          sx={{ width: "100%" }}
          onClose={handleCloseAlert}
        >
          {message}
        </Alert>
      </Snackbar>
      <div className="absolute inset-0 bg-[#BDD9BFCC] opacity-80"></div>
      <div className="relative z-10 w-full max-w-[600px] bg-white rounded-lg flex justify-center flex-col p-4">
        <img
          src={logoLogin}
          alt="logo login"
          className="place-self-center mt-8 w-auto max-h-[120px] md:max-h-[150px]"
        />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: {
                xs: "90%",
                sm: "80%",
                md: "70%",
              },
            },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="flex flex-col justify-center items-center w-full gap-3 my-10">
            <InputMask
              mask="999.999.999-99"
              value={cpf}
              onChange={(e) => setCPFState(e.target.value)}
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  label="CPF"
                  required
                  error={!validateCPF(formatCPF(cpf)) && cpf !== ""}
                  helperText={
                    !validateCPF(formatCPF(cpf)) && cpf !== ""
                      ? "CPF inválido."
                      : ""
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
                      "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#d32f2f !important",
                      },
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#144A36 !important",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#144A36",
                    },
                    "& .MuiInputLabel-root.Mui-error": {
                      color: "#d32f2f",
                    },
                    "& .MuiFormHelperText-root.Mui-error": {
                      color: "#d32f2f",
                    },
                  }}
                />
              )}
            </InputMask>
            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              error={!!passwordError}
              helperText={passwordError}
              required
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
                  "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d32f2f !important",
                  },
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#144A36 !important",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#144A36",
                },
                "& .MuiInputLabel-root.Mui-error": {
                  color: "#d32f2f",
                },
                "& .MuiFormHelperText-root.Mui-error": {
                  color: "#d32f2f",
                },
              }}
              fullWidth
            />
            <div className="w-full pt-0 flex justify-start px-4 lg:px-[15%] sm:px-[15%] md:px-[25%]">
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMe}
                    size="small"
                    sx={{
                      color: "#144A36",
                      "&.Mui-checked": {
                        color: "#144A36",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: 20,
                      },
                    }}
                  />
                }
                label={
                  <span className="text-xs text-gray-600">
                    Lembrar usuário e senha
                  </span>
                }
                className="m-0"
              />
              {/*
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPage("otp");
                    }}
                    className="text-sm outline-black decoration-2 underline underline-offset-8 transition-all duration-300 transform hover:scale-105 hover:decoration-[3px]"
                  >
                    <strong>Esqueceu a senha?</strong>
                  </button>*/}
            </div>

            <button
              onClick={handleLogin}
              className="bg-[#144A36] hover:opacity-50 text-white font-bold rounded-[10px] h-[46px] w-full sm:w-[220px] transform duration-300 hover:scale-105 mt-2"
            >
              Entrar
            </button>
          </div>
        </Box>
      </div>
      <Outlet />
    </div>
  );
};
export default Login;
