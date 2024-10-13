"use client"
import BackgroundImage from "../../../public/img/background.jpg";
import UserCreateAccountForm from "./createAccountForm";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../Context/AuthContext";

export default function CreateAccountPage() {

  const {authUser} = useAuthContext()
  const navigate = useNavigate()
  useEffect(() => {

    const timer = setTimeout(() => {
      if (authUser) {
        navigate("/");
      }
    }, 1000);

    return () => clearTimeout(timer);
    //eslint-disable-next-line
  }, [authUser]);

  return (
    <div className="overflow-x-hidden">
      <div className="container relative animate-translate-to-left h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div
          className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"
          style={{
            backgroundImage: `url("./../../../public/img/background.jpg")`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Crear Cuenta
              </h1>
              <p className="text-sm text-muted-foreground">
                Registrate para aprovechar todos los beneficios
              </p>
            </div>
            <UserCreateAccountForm />
            <p className="px-4  text-sm text-muted-foreground text-center">
              ¿Ya estás registrado?
              <Link to="/auth/login" className="text-primary ml-2">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>

     
      </div>
    </div>
  );
}
