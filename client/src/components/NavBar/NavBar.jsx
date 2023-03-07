import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/BuscadogIcon.png";
import { db } from "../../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import "./NavBar.css";

export const NavBar = () => {
    const navigate = useNavigate();
    const checkLocalStorage = () => {
        return localStorage.getItem("userId");
    };
    const usersCollectionRef = collection(db, "users");
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const users = await getDocs(usersCollectionRef);
            const usersInfo = users && users.docs.map(user => ({...user.data(), id: user.id}));
            const user = usersInfo && usersInfo.find(user => user.id === userLogged);
            setUser(user);
        };

        getUser();
    }, []);

    const goTo = (e, whereTo) => {
        e.preventDefault();

        navigate(`/${whereTo}`);
    };

    return (
        <div>
            <nav class="bg-buscabrown border-gray-200 w-full z-30 top-0 md:h-20 sm:h-fit">
                <div class="flex flex-wrap justify-between items-center mx-auto px-4 md:px-6 py-2.5 max-w-screen-xl">
                    <div class="flex items-center">
                        <img src={logo} class="h-14 min-h-0 md:min-h-full sm:mr-0 sm:mb-10 md:mb-0 md:mr-3" alt="BuscadogQR"/>
                        <div class="flex flex-wrap items-center">
                            <ul class="flex flex-wrap text-center mt-0 mr-6 space-x-8 text-sm font-medium">
                                <li>
                                    <Link to="/home">
                                        <h class="m-5 md:m-0 text-white hover:underline" aria-current="page">Home</h>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about">
                                        <h class="m-5 md:m-0 text-white hover:underline">Sobre nosotros</h>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact">
                                        <h class="m-5 md:m-0 text-white hover:underline">Contactanos</h>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/ourStories">
                                        <h class="m-5 md:m-0 text-white hover:underline">Nuestras historias</h>
                                    </Link>
                                </li>
                                {checkLocalStorage() && (
                                    <li>
                                        <Link to="/subscribe">
                                            <h class="m-5 md:m-0 text-white hover:underline">Suscribite</h>
                                        </Link>
                                    </li>
                                )}
                                {!!user.length && user.type === "Admin" && (
                                    <li>
                                        <Link to="/admin">
                                            <h class="m-5 md:m-0 text-white hover:underline">Admin</h>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {!checkLocalStorage() && (
                        <div class="flex items-center gap-x-4 bg-buscabrown md:w-auto sm:w-max sm:justify-self-end md:justify-self-center">
                            <button class="text-sm font-medium bg-third border-2 border-third rounded-xl text-white hover:bg-orange-700 hover:border-orange-700 px-3 py-2" onClick={(e) => goTo(e, "login")}>Iniciar sesión</button>
                            <button class="text-sm font-medium bg-third border-2 border-third rounded-xl text-white hover:bg-orange-700 hover:border-orange-700 px-3 py-2" onClick={(e) => goTo(e, "register")}>Registrate!</button>
                        </div>
                    )}

                    {checkLocalStorage() && (
                        <div class="flex items-center gap-x-4 text-white sm:ml-32 sm:justify-self-end md:justify-self-center">
                            <div class="flex flex-row gap-x-2 cursor-pointer p-2 bg-third border-2 border-third rounded-xl text-white hover:bg-orange-700 hover:border-orange-700 px-3 py-2" onClick={(e) => goTo(e, "pets")}>
                                <h3>Mis mascotas</h3>
                                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" class="w-6 h-6 fill-current"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="20" height="20"></rect> <g> <path d="M11.9 8.4c1.3 0 2.1-1.9 2.1-3.1 0-1-.5-2.2-1.5-2.2-1.3 0-2.1 1.9-2.1 3.1 0 1 .5 2.2 1.5 2.2zm-3.8 0c1 0 1.5-1.2 1.5-2.2C9.6 4.9 8.8 3 7.5 3 6.5 3 6 4.2 6 5.2c-.1 1.3.7 3.2 2.1 3.2zm7.4-1c-1.3 0-2.2 1.8-2.2 3.1 0 .9.4 1.8 1.3 1.8 1.3 0 2.2-1.8 2.2-3.1 0-.9-.5-1.8-1.3-1.8zm-8.7 3.1c0-1.3-1-3.1-2.2-3.1-.9 0-1.3.9-1.3 1.8 0 1.3 1 3.1 2.2 3.1.9 0 1.3-.9 1.3-1.8zm3.2-.2c-2 0-4.7 3.2-4.7 5.4 0 1 .7 1.3 1.5 1.3 1.2 0 2.1-.8 3.2-.8 1 0 1.9.8 3 .8.8 0 1.7-.2 1.7-1.3 0-2.2-2.7-5.4-4.7-5.4z"></path> </g> </g></svg>
                                </div>

                            <div class="flex flex-row gap-x-1 cursor-pointer bg-third border-2 border-third rounded-xl text-white hover:bg-orange-700 hover:border-orange-700 px-3 py-2" onClick={(e) => goTo(e, "profile")}>
                                <h3>Mi perfil</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
};
