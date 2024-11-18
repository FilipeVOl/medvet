
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/userContext";
import { RouterWrapper } from "./RouterWrapper";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <RouterWrapper />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);