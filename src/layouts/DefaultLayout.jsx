import { Outlet } from "react-router-dom";
import Header from "../Component/Header";
import Navbar from "../Component/Navbar";

export function DefaultLayout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
