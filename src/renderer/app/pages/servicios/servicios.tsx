"use client";

import { Service } from "@/src/renderer/interfaces/Service.interface";
import { ServiceCategories } from "@/src/renderer/interfaces/ServiceCategories.interface";
import { serviceGetAllServices } from "@/src/renderer/services/services.service";
import { serviceGetAllCategories } from "@/src/renderer/services/servicesCategories.service";
import { useToast } from "@/src/renderer/shared/hooks/use-toast";
import LoadingSpinner from "@/src/renderer/shared/LoadingSpinner";
import RotatingCard from "@/src/renderer/shared/RotatingCard";
import { Input } from "@/src/renderer/shared/shadcn/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/src/renderer/shared/shadcn/ui/select";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategories[]>([]);
  const [filterText, setFilterText] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const { toast } = useToast();

  useEffect(() => {
    const usersFetch: any = async () => {
      setLoading(true);
      try {
        const responseServices = await serviceGetAllCategories();
        setCategories(responseServices);
      } catch (e) {
        console.error("Ha ocurrido un error en la petición");
        toast({
          description: "No se han podido obtener las categorías.",
        });
      }
      try {
        const responseServices = await serviceGetAllServices();
        setServices(responseServices);
      } catch (e) {
        console.error("Ha ocurrido un error en la petición");

        toast({
          description: "No se han podido obtener los servicios.",
        });
      } finally {
        setLoading(false);
      }
    };
    usersFetch();
  }, []);

  return (
    <div
      className={`w-full flex justify-center flex-col items-center max-w-full mb-10 bg-contain`}
      style={{
        background: `url("/background-image.png") no-repeat bottom`,
      }}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full flex flex-col">
          <div className="w-full flex my-10 flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold">
              Busca los servicios que ofrecemos
            </h2>
            <div className="w-full flex-col md:flex-row px-12 lg:px-0 lg:w-1/2 my-5 flex gap-4">
              <Input
                className="w-full md:w-8/12"
                size={2}
                placeholder="Buscar servicio"
                onChange={(e) => {
                  setFilterText(e.target.value);
                  if (
                    !services.some(
                      (item) =>
                        (filterCategory === "" ||
                          item.categoria_servicio_id === filterCategory) &&
                        (item.nombre
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase()) ||
                          item.descripcion
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase()))
                    )
                  ) {
                    toast({
                      title:
                        "No se han encontrado servicios según el texto buscado",
                    });
                  }
                }}
              />
              <Select
                onValueChange={(e) => {
                  setFilterCategory(e);
                }}
              >
                <SelectTrigger className="w-full md:w-4/12">
                  <SelectValue placeholder="Seleccionar una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map(
                      (item: ServiceCategories, index: number) => (
                        <SelectItem key={index} value={item.id}>
                          {item.nombre}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 mt-2 mb-5">
              <hr className="border-[3px] border-gray-500 w-[75px]" />
              <hr className="border-[3px] border-gray-500 w-[5px]" />
            </div>
            <div className="w-full flex flex-wrap justify-center px-10">
              {services.length > 0 &&
                services.filter(
                  (item) =>
                    (filterCategory === "" ||
                      item.categoria_servicio_id === filterCategory) &&
                    (item.nombre
                      .toLowerCase()
                      .includes(filterText.toLowerCase()) ||
                      item.descripcion
                        .toLowerCase()
                        .includes(filterText.toLowerCase()))
                ).length > 0 &&
                services
                  .filter(
                    (item) =>
                      (filterCategory === "" ||
                        item.categoria_servicio_id === filterCategory) &&
                      (item.nombre
                        .toLowerCase()
                        .includes(filterText.toLowerCase()) ||
                        item.descripcion
                          .toLowerCase()
                          .includes(filterText.toLowerCase()))
                  )
                  .map((item: Service, index: number) => (
                    <RotatingCard content="news" key={index} item={item} />
                  ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
