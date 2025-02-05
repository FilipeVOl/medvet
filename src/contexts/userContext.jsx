import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(false);

  // Função para salvar os dados do usuário e tokens no armazenamento local
  const saveUserAndToken = async (userData, token, refreshToken) => {
    try {
      setIsLoadingUserStorageData(true);
      setUser(userData);
      setToken(token);
      setRefreshToken(refreshToken);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.error("Erro ao salvar usuário e token:", error);
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  // Função para carregar os dados do usuário e tokens do armazenamento local
  const loadUserData = async () => {
    try {
      setIsLoadingUserStorageData(true);

      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      // Atualizar o estado caso existam dados armazenados
      if (storedUser && storedToken) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Erro ao analisar JSON do usuário:", error);
        }
        setToken(storedToken);
        setRefreshToken(storedRefreshToken);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  // Função para remover os dados do usuário e tokens do armazenamento local
  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true);

      // Limpar o estado
      setUser(null);
      setToken(null);
      setRefreshToken(null);

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        refreshToken,
        isLoadingUserStorageData,
        saveUserAndToken,
        loadUserData,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
