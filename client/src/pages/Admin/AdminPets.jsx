import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

export const AdminPets = () => {
    const navigate = useNavigate();
    const petsCollectionRef = collection(db, "pets");
    const usersCollectionRef = collection(db, "users");
    const [pets, setPets] = useState([]);
    const [filterPets, setFilterPets] = useState([]);
    const [input, setInput] = useState("");
    const userLogged = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getPets = async () => {
            const allPets = await getDocs(petsCollectionRef);
            const petsInfo = allPets && allPets.docs.map(user => ({...user.data(), id: user.id}));
            setPets(petsInfo);
            setFilterPets(petsInfo);
        };

        const checkIfAdmin = async () => {
            const userDoc = doc(db, "users", userId);
            const userData = await getDoc(userDoc);
            const userInfo = userData.data();
    
            setUser(userInfo);
        };

        getPets();
        checkIfAdmin();
    }, []);

    const goToAdmin = (e) => {
        e.preventDefault();

        navigate("/admin");
    };

    const showPetInfo = (e, id) => {
        e.preventDefault();

        if(document.getElementById(`pet${id}`).style.display === "block") document.getElementById(`pet${id}`).style.display = "none"
        else document.getElementById(`pet${id}`).style.display = "block";
    };

    const search = (e) => {
        e.preventDefault();

        const allPets = pets.length && pets.filter(data => data.name.toLowerCase() === input.toLowerCase());

        if(Array.isArray(allPets)) setFilterPets(allPets);
        else setFilterPets([allPets]);
    };

    const showAll = (e) => {
        e.preventDefault();

        setInput("");
        setFilterPets(pets);
    };

    const goTo = (e, whereTo) => {
        e.preventDefault();

        navigate(`/${whereTo}`);
    };

    return (
        <div class="m-10">

            { !userLogged && (
                <div class="flex flex-col gap-y-5 m-16">
                    <h class="pb-5 text-titles text-4xl font-bold">Oops! Parece que no tienes los permisos para acceder a esta ruta</h>
                    <button class="self-start p-3 bg-third hover:bg-orange-700 text-white rounded-3xl" onClick={(e) => goTo(e, "login")}>Iniciar sesión</button>
                </div>
            )}

            { !userLogged || user && user.type !== "Admin" && (
                <div class="flex flex-col gap-y-5 m-16">
                    <h class="pb-5 text-titles text-4xl font-bold">Oops! Parece que no tienes los permisos para acceder a esta ruta</h>
                    <button class="self-start p-3 bg-third hover:bg-orange-700 text-white rounded-3xl" onClick={(e) => goTo(e, "profile")}>Volver a mi perfil</button>
                </div>
            )}

            {user && user.type === "Admin" && (<div>
                <div class="flex flex-row gap-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer" onClick={(e) => goToAdmin(e)}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <h>Volver a las estadísticas</h>
                </div>

                <h1 class="mt-10 ml-5 text-titles text-4xl font-bold">Mascotas</h1>
                <div class="flex flex-col md:flex-row justify-self-center md:justify-end mt-10 md:mt-5 mr-10 gap-y-2 md:gap-x-5">
                    <button onClick={(e) => showAll(e)} class="bg-third text-white p-1 md:p-3 border-2 border-third rounded-3xl hover:border-orange-700 hover:bg-orange-700">Mostrar todas las mascotas</button>
                </div>
                <div class="flex flex-col gap-2 ml-2 md:ml-10 m-10 mt-5 p-3 pt-5 bg-gray-700 w-fit md:w-auto justify-self-center">
                    <div class="flex flex-row justify-between gap-x-4 mb-3">
                        <input placeholder="Buscar..." value={input} class="bg-gray-800 rounded-2xl p-2 pl-5 w-full text-white h-fit" onChange={(e) => setInput(e.target.value)}/>
                        <button class="bg-gray-800 p-2 md:px-5 rounded-2xl text-white hover:bg-gray-800/75 h-fit" onClick={(e) => search(e)}>Buscar</button>
                    </div>
                    {!!filterPets.length && filterPets.map(pet => {
                        return (
                            <div class="flex flex-col bg-gray-800 p-2 text-white">
                                <div class="flex flex-row justify-between">
                                    <div class="flex flex-row gap-x-10">
                                        <img src={pet.photo && pet.photo} alt="-" class="w-6 h-6"/>
                                        <h3>{pet.name}</h3>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer" onClick={(e) => showPetInfo(e, pet.id)}>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>

                                <div class="hidden mt-5" id={`pet${pet.id}`}>
                                    <div class="flex flex-row gap-x-2 mb-2">
                                        <h3 class="text-amber-600">Mascota:</h3>
                                        <h3>{pet.breed}</h3>
                                    </div>
                                    <div class="flex flex-row gap-x-2 mb-2">
                                        <h3 class="text-amber-600">Edad:</h3>
                                        <h3>{pet.age}</h3>
                                    </div>
                                    <div class="flex flex-row gap-x-2 mb-2">
                                        <h3 class="text-amber-600">Notas:</h3>
                                        <h3>{pet.notes || "Sin notas"}</h3>
                                    </div>
                                    <div class="flex flex-row gap-x-2 mb-2">
                                        <h3 class="text-amber-600">Dueño:</h3>
                                        <a href={`mailto:${pet.userOwner}`} target="_blank"><h3 class="hover:underline hover:underline-offset-4">{pet.userOwner}</h3></a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {!pets.length && (
                        <h class="text-white font-semibold">Aún no hay mascotas agregadas</h>
                    )}
                </div>
            </div>)}
        </div>
    )
};
