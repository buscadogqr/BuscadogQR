import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

export const Admin = () => {
    const navigate = useNavigate();
    const userLogged = localStorage.getItem("email");
    const usersCollectionRef = collection(db, "users");
    const petsCollectionRef = collection(db, "pets");
    const [users, setUsers] = useState([]);
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const users = await getDocs(usersCollectionRef);
            const usersInfo = users && users.docs.map(user => ({...user.data(), id: user.id}));
            setUsers(usersInfo);
        };

        const getPets = async () => {
            const allPets = await getDocs(petsCollectionRef);
            const petsInfo = allPets && allPets.docs.map(user => ({...user.data(), id: user.id}));
            setPets(petsInfo);
        };

        getUsers();
        getPets();
    }, []);

    const goTo = (e, whereTo) => {
        e.preventDefault();

        navigate(`/${whereTo}`);
    };

    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <div>

            { !userLogged && goToLogin() }
            { userLogged !== "buscadogqr@gmail.com" && (
                <div class="flex flex-col gap-y-5 m-16">
                    <h class="pb-5 text-titles text-4xl font-bold">Oops! Parece que no tienes los permisos para acceder a esta ruta</h>
                    <button class="self-start p-3 bg-third hover:bg-orange-700 text-white rounded-3xl" onClick={(e) => goTo(e, "profile")}>Volver a mi perfil</button>
                </div>
            )}

            {userLogged === "buscadogqr@gmail.com" && (<div class="m-16">
                <h1 class="pb-5 text-titles text-4xl font-bold">Información de administrador</h1>
                <div class="flex flex-col gap-y-5 md:grid md:grid-cols-2 md:gap-x-5 m-5 justify-self-center">
                    <div class="bg-third text-white p-5">
                        <h2 class="font-semibold mb-2">Usuarios</h2>
                        <h class="m-5 text-3xl">{users && users.length}</h>
                    </div>
                    <div class="bg-third text-white p-5">
                        <h2 class="font-semibold mb-2">Mascotas</h2>
                        <h class="m-5 text-3xl">{pets && pets.length}</h>
                    </div>
                </div>

                <div class="mt-16 text-white m-5 flex flex-col">
                    <div class="flex flex-row gap-x-5 mb-5 bg-buscabrown p-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer" onClick={(e) => goTo(e, "adminUsers")}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <h1 class="font-semibold">Lista de usuarios</h1>
                    </div>
                    <div class="flex flex-row gap-x-5 bg-buscabrown p-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer" onClick={(e) => goTo(e, "adminPets")}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <h1 class="font-semibold">Lista de mascotas</h1>
                    </div>
                </div>
            </div>)}
        </div>
    )
};
