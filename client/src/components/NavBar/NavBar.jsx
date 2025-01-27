import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/BuscadogIcon.png";
import { getAllUsers, logout } from "../../redux/Actions/Actions";
import "./NavBar.css";

export const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogged = useSelector(state => state.userLogged);
    const id = localStorage.bgUserId;
    const mail = localStorage.bgUserMail;
    
    useEffect(() => {
        if(mail == "undefined" && id == "undefined") {
            dispatch(logout());
        } else if(!userLogged && mail && id) {
            dispatch(getAllUsers(`?userId=${id}`));
        }
    }, [dispatch, userLogged && userLogged.name]);

    const goTo = (e, whereTo) => {
        e.preventDefault();

        navigate(`/${whereTo}`);
        document.getElementById(".mobile-menu").style.display = "none";
    };

    const openMenu = (e) => {
        e.preventDefault();

        if(document.getElementById(".mobile-menu").style.display === "block") document.getElementById(".mobile-menu").style.display = "none";
        else document.getElementById(".mobile-menu").style.display = "block";
    };

    return (
        <div>
            <nav class="bg-buscabrown shadow-lg">
                <div class="max-w-6xl mx-auto px-4">
                    <div class="flex justify-between">
                        <div class="flex space-x-7">
                            <div>
                                <a href="/home" class="flex items-center py-4 px-2">
                                    <img src={logo} alt="BuscadogQR" class="h-14 w-14 mr-2"/>
                                </a>
                            </div>
                            <div class="text-white flex items-center space-x-1 gap-x-5">

                                <Link to="/home">
                                    <a href="" class="hidden md:block py-4 px-2 hover:text-orange-700 font-semibold">Home</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 block md:hidden">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </Link>

                                <Link to="/about">
                                    <a href="" class="hidden md:block py-4 px-2 font-semibold hover:text-orange-700 transition duration-300">Sobre nosotros</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 block md:hidden">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                    </svg>
                                </Link>

                                <Link to="/contact">
                                    <a href="" class="hidden md:block py-4 px-2 font-semibold hover:text-orange-700 transition duration-300">Contactanos</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 block md:hidden">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </Link>

                                <Link to="/ourStories">
                                    <a href="" class="hidden md:block py-4 px-2 font-semibold hover:text-orange-700 transition duration-300">Nuestras historias</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 block md:hidden">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div class="hidden text-white md:flex items-center space-x-3 ">
                            {!!userLogged && !userLogged.name && (
                                <div class="flex flex-row space-x-3">
                                    <button onClick={(e) => goTo(e, "login")} class="py-2 px-2 outline-none font-medium rounded hover:bg-orange-700 hover:text-white transition duration-300">Iniciar sesión</button>
                                    <button onClick={(e) => goTo(e, "register")} class="py-2 px-2 outline-none font-medium bg-third rounded hover:bg-orange-700 transition duration-300">Registrarme</button>
                                </div>
                            )}
                            {!!userLogged && !!userLogged.name && (
                                <div class="flex flex-row space-x-3">

                                    {userLogged.mail === "buscadogqr@gmail.com" && (
                                        <div class="flex flex-row space-x-3" onClick={(e) => goTo(e, "admin")}>
                                            <button class="py-2 px-2 outline-none font-medium rounded hover:bg-orange-700 hover:text-white transition duration-300">Información de admin</button>
                                        </div>
                                    )}

                                    {userLogged.mail !== "buscadogqr@gmail.com" && (
                                        <div class="flex flex-row space-x-3" onClick={(e) => goTo(e, "pets")}>
                                            <button class="py-2 px-2 outline-none font-medium rounded hover:bg-orange-700 hover:text-white transition duration-300">Mis Mascotas</button>
                                        </div>
                                    )}

                                    <div class="flex flex-row space-x-3" onClick={(e) => goTo(e, "profile")}>
                                        <button class="py-2 px-2 outline-none font-medium bg-third rounded hover:bg-orange-700 transition duration-300">Mi Perfil</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div id="button.mobile-menu-button" class="md:hidden flex items-center" onClick={(e) => openMenu(e)}>
                            <button class="outline-none mobile-menu-button">
                            <svg class=" w-6 h-6 text-gray-500 hover:text-orange-700 "
                                x-show="!showMenu"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                        </div>
                    </div>
                </div>
                <div id=".mobile-menu" class="hidden mobile-menu">
                    <ul class="">
                        {!!userLogged && !userLogged.name && (
                            <div>
                                <li><h onClick={(e) => goTo(e, "login")} class="block text-sm text-white px-2 py-4 hover:bg-orange-700 transition duration-300 font-semibold outline-none">Iniciar sesión</h></li>
                                <li><h onClick={(e) => goTo(e, "register")} class="block text-sm bg-third text-white px-2 py-4 hover:bg-orange-700 transition duration-300 font-semibold outline-none">Registrarme</h></li>
                            </div>
                        )}
                        {!!userLogged && !!userLogged.name && (
                            <div>

                                {userLogged.mail === "buscadogqr@gmail.com" && (
                                    <div onClick={(e) => goTo(e, "admin")}>
                                        <li><h class="block outline-none text-sm text-white px-2 py-4 hover:bg-orange-700 transition duration-300 font-semibold">Información de admin</h></li>
                                    </div>
                                )}

                                {userLogged.mail !== "buscadogqr@gmail.com" && (
                                    <div onClick={(e) => goTo(e, "pets")}>
                                        <li><h class="block outline-none text-sm text-white px-2 py-4 hover:bg-orange-700 transition duration-300 font-semibold">Mis Mascotas</h></li>
                                    </div>
                                )}

                                <div onClick={(e) => goTo(e, "profile")}>
                                    <li><h class="block outline-none bg-third text-sm text-white px-2 py-4 hover:bg-orange-700 transition duration-300 font-semibold">Mi Perfil</h></li>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    )
};
