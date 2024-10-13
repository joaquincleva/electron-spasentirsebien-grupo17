"use client";
import LogoFlor from "@/src/renderer/public/img/loto-flor.png";
import Facebook from "@/src/renderer/public/img/facebook.png";
import Twitter from "@/src/renderer/public/img/twitter.png";
import Instagram from "@/src/renderer/public/img/instagram.png";
import Github from "@/src/renderer/public/img/github.png";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { Service } from "../interfaces/Service.interface";
import { serviceGetAllServices } from "../services/services.service";
import { useAuthContext } from "../Context/AuthContext";
import { useToast } from "./hooks/use-toast";

const Footer = () => {
  
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {authUser} = useAuthContext()
  const {toast} = useToast()


  useEffect(() => {
    const usersFetch: any = async () => {
      setLoading(true);
      try {
        const responseUsers = await serviceGetAllServices();
        setServices(responseUsers);
      } catch (e) {
        console.error("Ha ocurrido un error en la petición");
        toast({
          description: "No se han podido obtener los servicios."
        })
      } finally {
        setLoading(false);
      }
    };
    usersFetch();
  }, []);

  return (
    <div className="shadow-sm flex flex-col md:flex-row items-start md:items-center justify-evenly py-4 gap-x-4 h-[300px]">
      <div className="hidden lg:flex flex-col p-10 justify-start items-center">
        <img src={LogoFlor} alt="Logo SPA Sentirse bien" width={"100"} />
      </div>
      <div className="flex-col flex p-10 justify-start  items-start h-full">
        <h3 className="pb-5 text-lg font-bold text-gray-600">Contactanos</h3>
        <p className="font-light text-md text-gray-500">Av. Sarmiento 55</p>
        <p className="font-light text-md text-gray-500">Resistencia - Chaco</p>
        <Link target="blank" to={`mailto:spasentirsebien@spa.com.ar?subject=${encodeURIComponent("Consulta")}&body=${encodeURIComponent("¡Hola! Quiero realizar una consulta.")}`} className="font-light hover:underline text-md text-gray-500">Email: spasentirsebien@spa.com.ar</Link>
        <Link target="blank" to="https://wa.me/5493624000000?text=Bienvenido" className="font-light text-md hover:underline text-gray-500">Whatsapp: 3624000000</Link>
        <div className="flex justify-start w-full gap-4 pt-5">
          <a href="https://facebook.com"><img src={Facebook} alt="Logo facebook"    width="40" /></a>
          <a href="https://x.com"><img src={Twitter} alt="Logo Twitter"             width="40" /></a>
          <a href="https://github.com"><img src={Github} alt="Logo Github"          width="40" /></a>
          <a href="https://instagram.com"><img src={Instagram} alt="Logo Instagram" width="40" /></a>
        </div>
      </div>
      <div className="flex-col text-left flex p-10 justify-start items-start h-full">
        <h3 className="pb-5 text-lg font-bold text-slate-600">Enlaces Rápidos</h3>
        <Link to={"/"}          className="hover:underline font-light text-md text-gray-500">Home</Link>
        <Link to={"/noticias"}  className="hover:underline font-light text-md text-gray-500">Noticias</Link>
        <Link to={"/servicios"} className="hover:underline font-light text-md text-gray-500">Servicios</Link>
        <Link to={`${!authUser ? "/auth/login" : "/turnos"}`}    className="hover:underline font-light text-md text-gray-500">Reservar turnos</Link>
      </div>
      <div className="hidden md:flex w-1/3 flex-col p-10 text-left justify-start items-start h-full">
        <h3 className="pl-2 pb-5 text-lg font-bold text-slate-600">Imágenes</h3>
        {loading? <LoadingSpinner /> : (
          <div className="flex flex-wrap w-full">
            {services.length>0 && services.slice(0,6).map((item: Service, index: number)=> (
              // eslint-disable-next-line
              <img key={index} src={item.imagen} alt={item.nombre} className={`md:p-2 rounded-xl w-[100%] lg:w-[30%] ${index>=2 ? "md:hidden lg:block" : "" }`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
