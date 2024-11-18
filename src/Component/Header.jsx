import medvetlogo from "../assets/medvetlogo.svg";
import userLogo from "../assets/user.svg";
import uniLogo from "../assets/unilogo.svg";
import { Link, useNavigate } from "react-router-dom";
import Login from "../images/login.svg"
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";

export default function Header() {
  const { token, signOut } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <>
      <div className="header-container justify-between grid grid-cols-2 items-center shadow-md pt-4 py-5 px-8 fixed w-full z-20 bg-[#FFFEF9]">
        <img
          onClick={() => navigate("/cadastro")}
          className="med-logo cursor-pointer"
          src={medvetlogo}
          alt="logo"
        />

        <div className="perfil-container flex justify-end items-center ">
          <img src={userLogo} alt="foto do usuario" className="userlogo mr-6" />

          <div className="perfil-box">
            <h2 className="font-bold">Nome</h2>
            <p className="text-gray-med">Título</p>
          </div>
          {token && (
            <img 
              src={Login} 
              alt="iconLogin" 
              className="h-8 pl-4 cursor-pointer" 
              onClick={handleSignOut} 
            />
          )}
          

          <div className="uni-container flex w-1/4 justify-end">
            <img src={uniLogo} alt="logo da universidade" />
          </div>
        </div>
      </div>
    </>
  );
}