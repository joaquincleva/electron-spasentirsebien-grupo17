"use client";


import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {EditUserForm} from "./editPerfilForms";
import { useAuthContext } from "@/src/renderer/Context/AuthContext";
import LoadingSpinner from "@/src/renderer/shared/LoadingSpinner";
import { Card } from "@/src/renderer/shared/shadcn/ui/card";
import { Button } from "@/src/renderer/shared/shadcn/ui/button";

const Page = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (authUser) {
        setLoading(false);
      } else {
        navigate("/");
      }
    }, 1000);
    return () => clearTimeout(timer);

    //eslint-disable-next-line
  }, [authUser]);

  return (
    <div
      className={`w-full flex justify-center flex-col items-center max-w-full mb-10 bg-contain`}
      style={{
        background: `url("/background-image.png") no-repeat bottom`,
      }}
    >
      {loading ? (
        <LoadingSpinner />
      ) : !editMode ? (
        <div className="flex flex-col w-full md:w-auto items-center">
          <Card className="w-3/4 md:w-full p-4 rounded-lg flex flex-col md:flex-row my-10 items-center bg-slate-50 justify-around">
            <div className="w-3/4 flex justify-center p-0 m-0">
            {/*eslint-disable-next-line*/}
              <img
                src={`${authUser?.avatar}`}
                alt="Avatar"
                width={250}
                height={250}
                className="rounded-lg"
              />
            </div>
            <div className="p-4  flex flex-col my-10 items-center md:items-start justify-center">
              <h2 className="text-2xl mb-4 font-semibold">Mi Perfil</h2>
              <div className="flex">
                <div className="md:min-w-96 my-2 flex gap-x-4 flex-col justify-around ">
                  <p className="font-light text-lg">Nombre:<span className="font-bold text-lg pl-4" >{authUser?.username}</span></p>
                    <p className="font-light text-lg">Dirección:<span className="font-bold text-lg pl-4" >{authUser?.direccion}</span></p>
                    <p className="font-light text-lg">Ciudad:<span className="font-bold text-lg pl-4" >{authUser?.ciudad}</span></p>
                </div>
              </div>
              <div className="w-full justify-center md:justify-start flex mt-4">
                <Button
                  className="text-lg rounded"
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  Editar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="w-full flex flex-col px-4 md:px-48">
          <Card className="w-full p-4 flex flex-col my-10 items-center justify-around">
            <h2 className="text-2xl mb-4 font-semibold">Mi Perfil</h2>
            <EditUserForm setEditMode={setEditMode}/>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Page;