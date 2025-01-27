import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getPets } from "../../redux/Actions/Actions.js";

export const Pets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userMail = localStorage.getItem("bgUserMail");
  const userId = localStorage.getItem("bgUserId");
  const userLogged = useSelector((state) => state.userLogged);
  const pets = useSelector((state) => state.pets);
  const [userPets, setUserPets] = useState([]);

  useEffect(() => {
    // Redirigir al login si no hay datos de usuario
    if (!userLogged.name && !userMail && !userId) {
      navigate("/login");
    }

    // Si hay datos en localStorage, pero no en Redux, obtenerlos
    if (!userLogged.name && userMail && userId) {
      dispatch(getAllUsers(`?userId=${userId}`));
    }

    // Obtener mascotas si no están en el estado
    if (!pets.length) {
      dispatch(getPets());
    }
  }, [dispatch, navigate, userId, userMail, userLogged.name, pets.length]);
  useEffect(() => {
    if (pets.length && userLogged.mail) {
      const filteredPets = pets.filter((pet) => pet.userOwner === userLogged.mail);
      setUserPets(filteredPets);
    }
  }, [pets, userLogged.mail]);

  const goTo = (e, id) => {
    e.preventDefault();

    setTimeout(() => {
      navigate(`/pet/${id}`);
    }, 1500);
  };

  return (
    <div>
      {userPets && !userPets.length && (
        <div className="m-16">
          <h1 className="pb-5 text-titles text-4xl font-bold">MIS MASCOTAS</h1>
          <h1>Oops! Parece que todavía no tienes mascotas agregadas</h1>
          <h1>¿Quieres suscribirte a la comunidad de BuscadogQR y agregar una mascota?</h1>
          <Link to="/subscribe">
            <button className="self-center text-white outline-none bg-third border-2 border-third rounded-3xl font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-orange-700 hover:border-orange-700 mt-5">
              Quiero suscribirme
            </button>
          </Link>
        </div>
      )}

      {!!userPets.length && (
        <div className="m-16">
          <h1 className="pb-5 text-titles text-4xl font-bold">MIS MASCOTAS</h1>
          <div className="flex flex-col">
            {userPets.map((pet) => {
              return (
                <div className="flex flex-col" key={pet.id}>
                  <div
                    className="bg-third text-white h-fit md:h-12 rounded-xl pl-10 pt-2 flex flex-wrap space-x-96 border border-2 border-third hover:bg-orange-700 hover:border-orange-700 outline-none cursor-pointer mt-5 w-full pr-10 justify-between pb-2 md:pb-0"
                    onClick={(e) => goTo(e, pet.id)}
                  >
                    <div className="flex flex-row gap-x-5">
                      <svg
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        className="w-6 h-6 fill-current"
                      >
                        <rect x="0" fill="none" width="20" height="20"></rect>
                        <g>
                          <path d="M11.9 8.4c1.3 0 2.1-1.9 2.1-3.1 0-1-.5-2.2-1.5-2.2-1.3 0-2.1 1.9-2.1 3.1 0 1 .5 2.2 1.5 2.2zm-3.8 0c1 0 1.5-1.2 1.5-2.2C9.6 4.9 8.8 3 7.5 3 6.5 3 6 4.2 6 5.2c-.1 1.3.7 3.2 2.1 3.2zm7.4-1c-1.3 0-2.2 1.8-2.2 3.1 0 .9.4 1.8 1.3 1.8 1.3 0 2.2-1.8 2.2-3.1 0-.9-.5-1.8-1.3-1.8zm-8.7 3.1c0-1.3-1-3.1-2.2-3.1-.9 0-1.3.9-1.3 1.8 0 1.3 1 3.1 2.2 3.1.9 0 1.3-.9 1.3-1.8zm3.2-.2c-2 0-4.7 3.2-4.7 5.4 0 1 .7 1.3 1.5 1.3 1.2 0 2.1-.8 3.2-.8 1 0 1.9.8 3 .8.8 0 1.7-.2 1.7-1.3 0-2.2-2.7-5.4-4.7-5.4z"></path>
                        </g>
                      </svg>
                      <h1>{pet.name}</h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Link to="/subscribe">
            <h className="mt-10 text-sm">
              ¿Quieres{" "}
              <h className="text-third hover:text-orange-700 hover:underline hover:underline-offset-4">
                agregar
              </h>{" "}
              otra mascota?
            </h>
          </Link>
        </div>
      )}
    </div>
  );
};
