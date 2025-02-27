import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(false);

  // Function to validate the token with the backend
  const validateToken = async (token) => {
    try {
      const response = await axios.get("http://localhost:3333/validate-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status === 200; // Token is valid
    } catch (error) {
      console.error("Erro ao validar token:", error);
      return false; // Token is invalid
    }
  };

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

      if (storedUser && storedToken) {
        // Validate the token with the backend
        const isValid = await validateToken(storedToken);

        if (isValid) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          setRefreshToken(storedRefreshToken);
        } else {
          // Token is invalid, clear local storage
          signOut();
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      signOut(); // Clear local storage if token validation fails
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  // Function to remove user data and tokens from local storage
  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true);

      // Clear state
      setUser(null);
      setToken(null);
      setRefreshToken(null);

      // Clear local storage
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

  // Load user data on component mount
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
