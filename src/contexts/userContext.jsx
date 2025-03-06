import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(false);
  const navigate = useNavigate();

  // Function to validate the token with the backend
  const validateToken = async (token) => {
    try {
      const response = await axios.get("http://localhost:3333/validate-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Token validation response:", response);
      return response.status === 200;
    } catch (error) {
      // Token is expired, try refreshing it
      if (error.response && error.response.status === 401) {
        const newToken = await refreshAccessToken();
        return newToken !== null;
      }
      return false;
    }
  };

  // Function to refresh the access token
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("http://localhost:3333/token/refresh", {
        refreshToken: localStorage.getItem("refreshToken"),
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      return token;
    } catch (error) {
      console.error("Erro ao atualizar token:", error);
      signOut();
      return null;
    }
  };

  // Function to save user data and tokens in local storage
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

  // Function to load user data and tokens from local storage
  const loadUserData = async () => {
    try {
      setIsLoadingUserStorageData(true);

      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      console.log("Loading user data...");
      console.log("Stored Token:", storedToken);
      console.log("Stored User:", storedUser);

      if (storedUser && storedToken) {
        const isValid = await validateToken(storedToken);
        console.log("Token is valid:", isValid);

        if (isValid) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          setRefreshToken(storedRefreshToken);
        } else {
          console.log("Token is invalid, signing out...");
          signOut();
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      signOut();
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

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  // Load user data on component mount
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    await loadUserData();
    setIsLoading(false);
  };

  // Redirect to login if no token is found (ProtectedRoute lida com isso já)
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center">
        <LinearProgress color="success" />
      </div>
    );
  }

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
