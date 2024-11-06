import React from "react";
import logoLogin from "../images/logoLogin.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Login = () => {
return (
    <div className="font-Montserrat relative h-[100vh] bg-cover bg-[url('./images/backgroundLogin.png')] flex justify-center items-center">
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
                        id="outlined-error"
                        label="Usuário"
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
                    <TextField
                        id="outlined-error-helper-text"
                        label="Password"
                        type="password"
                        helperText="Incorrect password."
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

                    <a className="outline-black decoration-2 underline underline-offset-8 transition-all duration-300 transform hover:scale-105 hover:decoration-[3px]" href="/login"><strong>Esqueceu a senha?</strong></a>

                    <button className="bg-[#144A36] hover:opacity-50  text-white font-bold rounded-[10px] h-[46px] w-[220px] transform duration-300 hover:scale-105">Entrar</button>
                </div>
            </Box>
        </div>
    </div>
);
};

export default Login;
