import medvetlogo from "../assets/medvetlogo.svg";
import userLogo from "../assets/user.svg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";
import { IconButton, Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Swal from "sweetalert2";

export default function Header() {
  const { token, signOut, user } = useContext(UserContext);
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

        <div className="perfil-container flex justify-end items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="perfil-box">
              <h2 className="font-bold text-[#144A36]">
                {user?.name || "Nome"}
              </h2>
              <p className="text-gray-600 text-sm">{user?.role || "Título"}</p>
            </div>
          </div>

          {token && (
            <>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: "30px", alignSelf: "center" }}
              />
              <IconButton
                onClick={() => {
                  Swal.fire({
                    title: "Deseja realmente sair?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Sim",
                    cancelButtonText: "Cancelar",
                    confirmButtonColor: "#144A36",
                    cancelButtonColor: "#000",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleSignOut();
                    }
                  });
                }}
                sx={{
                  color: "#144A36",
                  "&:hover": {
                    backgroundColor: "rgba(20, 74, 54, 0.1)",
                  },
                }}
                size="small"
              >
                <LogoutIcon />
              </IconButton>
            </>
          )}
        </div>
      </div>
    </>
  );
}
