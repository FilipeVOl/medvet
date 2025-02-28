import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

export const ProtectedRoute = () => {
  const { token, isLoadingUserStorageData } = useContext(UserContext);
  if (isLoadingUserStorageData) {
    return <div>Carregando...</div>; // Show a loading spinner or message
  }

  return token ? <Outlet /> : <Navigate to="/login" />;
};
