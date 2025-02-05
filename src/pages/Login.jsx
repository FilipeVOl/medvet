import React, { useContext, useState, useEffect } from "react";
import logoLogin from "../images/logoLogin.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Outlet, useNavigate } from "react-router-dom";
import { RecoveryContext, RecoveryProvider } from "../contexts/recoveryContext";
import { validateCPF } from "../utils/validateCPF"; // Import CPF validation function
import { UserContext } from "../contexts/userContext"; // Import UserContext
import axios from "axios"; // Import axios for making HTTP requests
import { ToastContainer, toast } from "react-toastify"; // Import toast for showing notifications

const Login = () => {
    const { setPage, setCPF } = useContext(RecoveryContext);
    const { saveUserAndToken, loadUserData } = useContext(UserContext); // Get saveUserAndToken and loadUserData from UserContext
    const [cpf, setCPFState] = useState("");
    const [password, setPassword] = useState(""); // Add state for password
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            loadUserData(); // Load user data from local storage
            navigate("/"); // Redirect to home if token exists
        }
    }, [navigate, loadUserData]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3333/sessions", { cpf, password });
            const { userData, token, refreshToken } = response.data;
            saveUserAndToken(userData, token, refreshToken);
            localStorage.setItem("token", token); // Save token to localStorage
            navigate("/"); // Redirect to home after login
            console.log(token);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            toast.error("Erro ao fazer login. Verifique o CPF e a senha.");
        }
    };


    return (
        <div className="font-Montserrat relative h-[100vh] bg-cover bg-[url('./images/backgroundLogin.png')] flex justify-center items-center">
            <ToastContainer />
            <div className="absolute inset-0 bg-[#BDD9BFCC] opacity-80 "></div>
            <div className="relative z-10 h-auto w-[50%] bg-white rounded-lg flex justify-center flex-col">
                <img src={logoLogin} alt="logo login" className="place-self-center mt-12" />
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
                            helperText={!validateCPF(cpf) && cpf !== "" ? "CPF inválido." : ""}
                            InputProps={{
                                style: { backgroundColor: "#F2F2ED", border: "none", outline: "none" }
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        border: "none",
                                        boxShadow: "0px 4px 4px 0px #00000005 inset, 0px 4px 4px 0px #00000026"
                                    },
                                    "&:hover fieldset": {
                                        border: "none",
                                        boxShadow: "0px 4px 4px 0px #00000005 inset, 0px 4px 4px 0px #00000026"
                                    },
                                    "&.Mui-focused fieldset": {
                                        border: "none",
                                        boxShadow: "0px 4px 4px 0px #00000005 inset, 0px 4px 4px 0px #00000026"
                                    }
                                }
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
                                style: { backgroundColor: "#F2F2ED", border: "none", outline: "none" }
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        border: "none",
                                        boxShadow: "0px 4px 4px 0px #00000005 inset, 0px 4px 4px 0px #00000026"
                                    },
                                    "&:hover fieldset": {
                                        border: "none",
                                        boxShadow: "0px 4px 4px 0px #00000005 inset, 0px 4px 4px 0px #00000026"
                                    },
                                    "&.Mui-focused fieldset": {
                                        border: "none",
                                        boxShadow: "0px 4px 4px 0px #00000005 inset, 0px 4px 4px 0px #00000026"
                                    }
                                }
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
                            className="bg-[#144A36] hover:opacity-50  text-white font-bold rounded-[10px] h-[46px] w-[220px] transform duration-300 hover:scale-105">Entrar</button>
                    </div>
                </Box>
            </div>
            <Outlet />
        </div>
    );
};

export default Login;
