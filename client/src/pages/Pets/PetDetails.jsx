import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

export const PetDetails = () => {
    const { id } = useParams();
    const userLogged = localStorage.getItem("userId");
    const usersCollectionRef = collection(db, "users");
    const petsCollectionRef = collection(db, "pets");
    const [user, setUser] = useState([]);
    const [pet, setPet] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const users = await getDocs(usersCollectionRef);
            const usersInfo = users && users.docs.map(user => ({...user.data(), id: user.id}));
            const user = usersInfo && usersInfo.find(user => user.id === userLogged);
            setUser(user);
        };

        const getPets = async () => {
            const allPets = await getDocs(petsCollectionRef);
            const petsInfo = allPets && allPets.docs.map(user => ({...user.data(), id: user.id}));
            const pet = petsInfo && petsInfo.find(pet => pet.id === id);
            setPet(pet);
        };

        getUser();
        getPets();
    }, []);

    return (
        <div class="flex self-center gap-x-16 text-third flex-col md:flex-row mt-10">
            <div class="flex flex-col">
                <div class="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
                    <img class="w-full h-56 object-cover object-center" src={pet && pet.photo} alt={pet && pet.name}/>
                    <div class="flex items-center px-6 py-3 bg-third">
                        <h1 class="mx-3 text-white font-semibold text-lg">Mascota</h1>
                    </div>
                    <div class="py-4 px-6">
                        <h1 class="text-2xl font-semibold">{pet && pet.name}</h1>
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
                {userLogged === pet.userOwner && (
                    <Link to={`/editPetInfo/${id}`}>
                        <button class="flex flex-row gap-x-5 bg-third text-white border border-2 border-third rounded-xl p-2 hover:text-third hover:bg-white cursor-pointer mb-5">Editar información de mascota</button>
                    </Link>
                )}
            </div>

            <div class="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
                <img class="w-full h-56 object-cover object-center" src={user && user.profilePic || ""} alt={user && user.name}/>
                <div class="flex items-center px-6 py-3 bg-third">
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
    ) 
}
