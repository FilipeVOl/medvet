import { Outlet } from "react-router-dom";
import Header from "../Component/Header";
import Navbar from "../Component/Navbar";

export function DefaultLayout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-72"></div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
