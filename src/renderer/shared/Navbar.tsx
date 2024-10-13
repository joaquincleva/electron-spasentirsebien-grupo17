"use client";
import { useState } from "react";
import LogoFlor from "@/src/renderer/public/img/loto-flor.png";
import { LogOut, Menu } from "lucide-react";
import { Route } from "../interfaces/Route.interface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import ProfileMenu from "./UserProfile";

const routes: Route[] = [
  { title: "Servicios", route: "/servicios" },
  { title: "Noticias", route: "/noticias" },
  { title: "Imágenes", route: "/imagenes" },
  { title: "Consultas", route: "/consultas" },
  { title: "Sobre nosotros", route: "/about" },
  { title: "Mi perfil", route: "/perfil" },
  { title: "Usuarios", route: "/usuarios" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const {pathname} = useLocation()

  return (
    <nav className="border-b-2">
      <div className="z-50 w-full flex justify-between items-center px-10">
        <button
          onClick={() => {
            setOpenMenuMobile(!openMenuMobile);
          }}
          className="text-black focus:outline-none md:hidden flex items-center"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div
          className={`flex items-center ${
            authUser ? "ml-10" : "ml-5"
          } md:ml-0 gap-5`}
        >
          <Link to={"/"}>
            <img src={LogoFlor} alt="Logo SPA Sentirse bien" width={"80"} />
          </Link>
          <div className="hidden font-bold md:flex md:items-center gap-3">
            {routes
              .filter((item) => {
                return authUser?.rol === "admin"
                  ? true
                  : item.title === "Usuarios"
                  ? false
                  : !authUser && item.title === "Mi perfil"
                  ? false
                  : true;
              })
              .map((item: Route, index: number) => (
                <Link
                  className={`hover:underline text-center md:text-xs lg:text-lg cursor-pointer ${pathname.startsWith(item.route) && "underline text-pink-400 font-extrabold"}`}
                  key={index}
                  to={item.route}
                >
                  {item.title}
                </Link>
              ))}
          </div>
        </div>
        <div className="relative flex h-20 items-center  justify-between pl-5">
          <div className="flex items-center justify-between w-full md:items-stretch md:justify-start ">
            <div className="flex md:w-full justify-end">
              {authUser ? (
                <div className="flex items-center h-full text-red-500">
                  <ProfileMenu />
                  <LogOut
                    onClick={() => {
                      setAuthUser(null);
                      localStorage.removeItem("user");
                    }}
                    className="h-6 w-6 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="flex items-center h-full gap-4">
                  <Link
                    to="/auth/register"
                    className="text-pink-600 font-bold hover:bg-secondary hover:text-primary cursor-pointer underline"
                  >
                    Registrate
                  </Link>
                  <Link
                    to="/auth/login"
                    className="text-white bg-green-700 rounded text-sm md:text-base p-2 px-3 hover:bg-secondary hover:text-primary cursor-pointer"
                  >
                    Iniciar sesión
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {openMenuMobile && (
        <div className="md:hidden p-5">
          <div className="flex flex-col gap-4">
            {routes
              .filter((item) => {
                return authUser?.rol === "admin"
                  ? true
                  : item.title === "Usuarios"
                  ? false
                  : !authUser && item.title === "Mi perfil"
                  ? false
                  : true;
              })
              .map((item: Route, index: number) => (
                <p
                  className={`hover:underline cursor-pointer ${pathname.startsWith(item.route) && "underline text-pink-400 font-extrabold"}`}
                  key={index}
                  onClick={() => navigate(item.route)}
                >
                  {item.title}
                </p>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
