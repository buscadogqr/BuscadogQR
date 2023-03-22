import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

export const PetDetails = () => {
    const { id } = useParams();
    const userLogged = localStorage.getItem("userId");
    const userMail = localStorage.getItem("email");
    const usersCollectionRef = collection(db, "users");
    const petsCollectionRef = collection(db, "pets");
    const [user, setUser] = useState([]);
    const [pet, setPet] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getPets = async () => {
            const allPets = await getDocs(petsCollectionRef);
            const petsInfo = allPets && allPets.docs.map(user => ({...user.data(), id: user.id}));
            const pet = petsInfo && petsInfo.find(pet => pet.id === id);
            setPet(pet);
            return pet;
        };
        
        getPets()
        .then(data => {
            const getUser = async () => {
                const users = await getDocs(usersCollectionRef);
                const usersInfo = users && users.docs.map(user => ({...user.data(), id: user.id}));
                const user = usersInfo && usersInfo.find(user => user.mail === data.userOwner);
                setUser(user);
            };
    
            getUser();
        })

    }, []);

    const goBack = (e) => {
        e.preventDefault();

        navigate("/pets");
    };

    const editPet = (e, id) => {
        e.preventDefault();

        navigate(`/editPetInfo/${id}`);
    };

    return (
        <div class="flex flex-col text-white mt-10">
            {userMail === pet.userOwner && (
                <div class="flex flex-row gap-x-2 text-black m-5 mx-10 self-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer" onClick={(e) => goBack(e)}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <h>Volver a mis mascotas</h>
                </div>
            )}

            <div class="flex self-center flex-col md:flex-row gap-x-16 p-6">
                <div class="flex flex-col">
                    <div class="max-w-sm bg-gray-700 shadow-lg rounded-lg overflow-hidden my-4">
                        <img class="w-full h-56 object-cover object-center" src={pet && pet.photo} alt={pet && pet.name}/>
                        <div class="flex items-center px-6 py-3 bg-gray-800">
                            <h1 class="mx-3 text-white font-semibold text-lg">Mascota</h1>
                        </div>
                        <div class="py-4 px-6">
                            <div class="flex flex-row justify-between">
                                <h1 class="text-2xl font-semibold">{pet && pet.name}</h1>
                                {userMail === pet.userOwner && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer hover:stroke-amber-500" onClick={(e) => editPet(e, pet && pet.id)}>
                                        <title>Editar información de mascota</title>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                )}
                            </div>
                            <div class="flex items-center mt-4">
                                <h1 class="px-2 text-sm">Edad: {pet && pet.age}</h1>
                            </div>
                            <div class="flex items-center mt-4">
                                <h1 class="px-2 text-sm">Mascota: {pet && pet.breed}</h1>
                            </div>
                            <div class="flex items-center mt-4">
                                <h1 class="px-2 text-sm">Notas adicionales: {pet && pet.notes || "-"}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="max-w-sm bg-gray-700 shadow-lg rounded-lg overflow-hidden my-4">
                    <img class="w-full h-56 object-cover object-center" src={user && user.profilePic || ""} alt={user && user.name}/>
                    <div class="flex items-center px-6 py-3 bg-gray-800">
                        <h1 class="mx-3 text-white font-semibold text-lg">Dueño/a</h1>
                    </div>
                    <div class="py-4 px-6">
                        <h1 class="text-2xl font-semibold">{user && user.name + " " + user.surname}</h1>
                        <div class="flex items-center mt-4">
                            <h1 class="px-2 text-sm">Mail: {user && user.mail}</h1>
                        </div>
                        <div class="flex items-center mt-4">
                            <h1 class="px-2 text-sm">Celular: {user && user.cellphone}</h1>
                        </div>
                        <div class="flex items-center mt-4">
                            <h1 class="px-2 text-sm">Dirección: {user && user.direction}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}
