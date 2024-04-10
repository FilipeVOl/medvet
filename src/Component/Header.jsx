import medvetlogo from "../assets/medvetlogo.svg";
import userLogo from "../assets/user.svg";
import uniLogo from "../assets/unilogo.svg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <div className="header-container justify-between grid grid-cols-2 w-screen items-center shadow-md p-5">
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

          <div className="uni-container flex w-1/4 justify-end">
            <img src={uniLogo} alt="logo da universidade" />
          </div>
        </div>
      </div>
    </>
  );
}
