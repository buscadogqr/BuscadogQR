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
    const userLogged = localStorage.getItem("userId");

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
            <nav class="bg-buscabrown border-gray-200 w-full z-30 top-0 h-fit">
                <div class="flex flex-wrap gap-y-6 justify-between items-center mx-auto px-4 md:px-6 py-2.5 max-w-screen-xl">
                    <div class="flex items-center">
                        <img src={logo} class="h-14 min-h-0 md:min-h-full sm:mr-0 sm:mb-10 md:mb-0 md:mr-10" alt="BuscadogQR"/>
                        <div class="flex flex-wrap items-center">
                            <ul class="flex flex-wrap text-center ml-10 md:ml-5 mr-6 space-x-8 text-sm font-medium">
                                <li>
                                    <Link to="/home">
                                        <h class="hidden md:block m-5 md:m-0 text-white hover:underline" aria-current="page">Home</h>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 block md:hidden">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about">
                                        <h class="hidden md:block m-5 md:m-0 text-white hover:underline" aria-current="page">Sobre nosotros</h>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 block md:hidden">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                        </svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact">
                                        <h class="hidden md:block m-5 md:m-0 text-white hover:underline">Contactanos</h>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 block md:hidden">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/ourStories">
                                        <h class="hidden md:block m-5 md:m-0 text-white hover:underline">Nuestras historias</h>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 block md:hidden">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                        </svg>
                                    </Link>
                                </li>
                                {user && !!user.length && user.type === "Admin" && (
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
                        <div class="flex items-center gap-x-4 bg-buscabrown justify-self-end">
                            <button class="text-sm font-medium bg-third border-2 border-third rounded-xl text-white hover:bg-orange-700 hover:border-orange-700 px-3 py-2" onClick={(e) => goTo(e, "login")}>Iniciar sesión</button>
                            <button class="text-sm font-medium bg-third border-2 border-third rounded-xl text-white hover:bg-orange-700 hover:border-orange-700 px-3 py-2" onClick={(e) => goTo(e, "register")}>Registrate!</button>
                        </div>
                    )}

                    {checkLocalStorage() && (
                        <div class="flex items-center gap-x-4 text-white sm:ml-32 justify-self-end">
                            <div class="flex flex-row gap-x-2 cursor-pointer p-2 bg-third border-2 border-third rounded-xl text-white hover:bg-orange-700 hover:border-orange-700 px-3 py-2" onClick={(e) => goTo(e, "pets")}>
                                <h3>Mis mascotas</h3>
                                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" class="w-6 h-6 fill-current"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="20" height="20"></rect> <g> <path d="M11.9 8.4c1.3 0 2.1-1.9 2.1-3.1 0-1-.5-2.2-1.5-2.2-1.3 0-2.1 1.9-2.1 3.1 0 1 .5 2.2 1.5 2.2zm-3.8 0c1 0 1.5-1.2 1.5-2.2C9.6 4.9 8.8 3 7.5 3 6.5 3 6 4.2 6 5.2c-.1 1.3.7 3.2 2.1 3.2zm7.4-1c-1.3 0-2.2 1.8-2.2 3.1 0 .9.4 1.8 1.3 1.8 1.3 0 2.2-1.8 2.2-3.1 0-.9-.5-1.8-1.3-1.8zm-8.7 3.1c0-1.3-1-3.1-2.2-3.1-.9 0-1.3.9-1.3 1.8 0 1.3 1 3.1 2.2 3.1.9 0 1.3-.9 1.3-1.8zm3.2-.2c-2 0-4.7 3.2-4.7 5.4 0 1 .7 1.3 1.5 1.3 1.2 0 2.1-.8 3.2-.8 1 0 1.9.8 3 .8.8 0 1.7-.2 1.7-1.3 0-2.2-2.7-5.4-4.7-5.4z"></path> </g> </g></svg>
                                </div>

                            <div class="flex flex-row gap-x-1 cursor-pointer bg-third border-2 border-third rounded-xl text-white hover:bg-orange-700 hover:border-orange-700 px-3 py-2" onClick={(e) => goTo(e, "profile")}>
                                <h3>Mi perfil</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
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
