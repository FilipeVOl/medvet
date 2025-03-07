import { Outlet } from "react-router-dom";
import Header from "../Component/Header";
import Navbar from "../Component/Navbar";

export function DefaultLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20 overflow-x-hidden"> 
        <div className="flex">
          <Navbar />
          <main className="ml-60 w-full "> 
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}