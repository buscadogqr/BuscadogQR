import React, {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export const Pets = () => {
    const userLogged = localStorage.getItem("userId");
    const navigate = useNavigate();
    const petsCollectionRef = collection(db, "pets");
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const getPets = async () => {
            const allPets = await getDocs(petsCollectionRef);
            const petsInfo = allPets && allPets.docs.map(pet => ({...pet.data(), id: pet.id}));
            const pets = petsInfo && petsInfo.filter(pet => pet.userOwner === userLogged);
            setPets(pets);
        };

        getPets();
    }, []);

    const goTo = (e, id) => {
        e.preventDefault();

        setTimeout(() => {
            navigate(`/pet/${id}`)
        }, 1500);
    };
    
    const delPet = (e, id) => {
        e.preventDefault();

        const userDoc = doc(db, "pets", id);
        deleteDoc(userDoc)
        .then(data => {
            navigate("/pets")
        })
    };

    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <div>

            {!userLogged && goToLogin()}

            {!pets.length && (
                <div class="m-16">
                    <h1 class="pb-5 text-titles text-4xl font-bold">MIS MASCOTAS</h1>
                    <h1>Oops! Parece que todavía no tienes mascotas agregadas</h1>
                    <h1>¿Quieres suscribirte a la comunidad de BuscadogQR y agregar una mascota?</h1>
                    <Link to="/subscribe">
                        <button class="self-center text-white bg-third border-2 border-third rounded-3xl font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-orange-700 hover:border-orange-700 mt-5">Suscribirme</button>
                    </Link>
                </div>
            )}

            {!!pets.length && (
                <div class="m-16">
                    <h1 class="pb-5 text-titles text-4xl font-bold">MIS MASCOTAS</h1>
                    <div class="flex flex-col">
                        {pets.map(pet => {
                            return (
                                <div class="bg-third text-white h-12 rounded-xl pl-10 pt-2 flex flex-wrap space-x-96 border border-2 border-third hover:bg-orange-700 hover:border-orange-700 cursor-pointer mt-5 w-full pr-10 justify-between" onClick={(e) => goTo(e, pet.id)}>
                                    <div class="flex flex-row gap-x-5">
                                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" class="w-6 h-6 fill-current"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="20" height="20"></rect> <g> <path d="M11.9 8.4c1.3 0 2.1-1.9 2.1-3.1 0-1-.5-2.2-1.5-2.2-1.3 0-2.1 1.9-2.1 3.1 0 1 .5 2.2 1.5 2.2zm-3.8 0c1 0 1.5-1.2 1.5-2.2C9.6 4.9 8.8 3 7.5 3 6.5 3 6 4.2 6 5.2c-.1 1.3.7 3.2 2.1 3.2zm7.4-1c-1.3 0-2.2 1.8-2.2 3.1 0 .9.4 1.8 1.3 1.8 1.3 0 2.2-1.8 2.2-3.1 0-.9-.5-1.8-1.3-1.8zm-8.7 3.1c0-1.3-1-3.1-2.2-3.1-.9 0-1.3.9-1.3 1.8 0 1.3 1 3.1 2.2 3.1.9 0 1.3-.9 1.3-1.8zm3.2-.2c-2 0-4.7 3.2-4.7 5.4 0 1 .7 1.3 1.5 1.3 1.2 0 2.1-.8 3.2-.8 1 0 1.9.8 3 .8.8 0 1.7-.2 1.7-1.3 0-2.2-2.7-5.4-4.7-5.4z"></path> </g> </g></svg>
                                        <h1>{pet.name}</h1>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6 fill-red-900 stroke-white" onClick={(e) => delPet(e, pet.id)}>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </div>
                            )})}   
                    </div>

                    <Link to="/subscribe">
                        <button class="mt-10 self-center text-white bg-titles border-2 border-titles rounded-3xl font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:border-green-900 hover:bg-green-900">¿Quieres agregar otra mascota?</button>
                    </Link>
                </div>
                )
            }
        </div>
    )
}
