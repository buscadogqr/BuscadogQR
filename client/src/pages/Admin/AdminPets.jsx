import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

export const AdminPets = () => {
    const navigate = useNavigate();
    const petsCollectionRef = collection(db, "pets");
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const getPets = async () => {
            const allPets = await getDocs(petsCollectionRef);
            const petsInfo = allPets && allPets.docs.map(user => ({...user.data(), id: user.id}));
            setPets(petsInfo);
        };

        getPets();
    }, []);

    const goToAdmin = (e) => {
        e.preventDefault();

        navigate("/admin");
    };

    return (
        <div class="m-10">
            <div class="flex flex-row gap-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer" onClick={(e) => goToAdmin(e)}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <h>Volver a las estadísticas</h>
            </div>

            <h1 class="mt-10 ml-5 text-titles text-4xl font-bold">Mascotas</h1>
            <div class="grid grid-rows-4 grid-flow-col gap-2 m-10 p-3 pt-5 bg-gray-700">
                {!!pets.length && pets.map(pet => {
                    return (
                        <div class="flex flex-row gap-x-10 bg-gray-800 p-2 text-white justify-between">
                            <img src={pet.photo} alt="-" class="w-6 h-6"/>
                            <h3>{pet.name}</h3>
                            <h3>{pet.breed} (raza)</h3>
                            <h3>{pet.age} años</h3>
                            <h3>Notas: {pet.notes || "-"}</h3>
                        </div>
                    )
                })}

                {!pets.length && (
                    <h>Aún no hay mascotas agregadas</h>
                )}
            </div>
        </div>
    )
};
