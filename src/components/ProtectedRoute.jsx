import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { LinearProgress } from "@mui/material";

export const ProtectedRoute = () => {
  const { token, isLoadingUserStorageData } = useContext(UserContext);
  if (isLoadingUserStorageData) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  return token ? <Outlet /> : <Navigate to="/login" />;
};
