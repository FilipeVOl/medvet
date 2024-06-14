import { Outlet } from "react-router-dom";
import Header from "../Component/Header";
import Navbar from "../Component/Navbar";

export function DefaultLayout() {
  return (
    <div>
      <Header />
      <div className="h-20"></div>
      <div className="flex">
        <div className="top w-96"></div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}