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

    useEffect(() => {
        const getPets = async () => {
            const allPets = await getDocs(petsCollectionRef);
            const petsInfo = allPets && allPets.docs.map(user => ({...user.data(), id: user.id}));
            setPets(petsInfo);
            setFilterPets(petsInfo);
        };

        getPets();
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

    const changeToInput = (e, id) => {
        e.preventDefault();

        document.getElementById(`sacarMembresía${id}`).style.display = "none";
        document.getElementById(`confirm${id}`).style.display = "block";
    };

    const cancelDelete = (e, id) => {
        e.preventDefault();

        document.getElementById(`sacarMembresía${id}`).style.display = "block";
        document.getElementById(`confirm${id}`).style.display = "none";
    };

    const deleteMembership = async (e, userId, petNum, id) => {
        e.preventDefault();

        const allUsers = await getDocs(usersCollectionRef);
        const usersInfo = allUsers && allUsers.docs.map(user => ({...user.data(), id: user.id}));
        const userData = usersInfo && usersInfo.find(user => user.mail === userId);

        const userCr = doc(db, "users", userData && userData.id);
        const userInfo2 = await getDoc(userCr);
        const user1 = userInfo2.data();
        const updateData = user1.memberships.filter(m => m.pet !== petNum);

        await updateDoc(userCr, { memberships: updateData });
        !updateData.length && await updateDoc(userCr, { type: "Usuario sin membresías" });

        const pet = doc(db, "pets", id);
        await deleteDoc(pet);

        document.getElementById(`sacarMembresía${id}`).style.display = "block";
        document.getElementById(`confirm${id}`).style.display = "none";
        location.reload();
    };

    const checkIfAdmin = () => {
        if(userLogged && userLogged !== "buscadogqr@gmail.com") navigate("/profile");
    };

    return (
        <div class="m-10">

            { !userLogged && goTo("/login") }
            { userLogged && checkIfAdmin() }

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
                                
                                <div class="flex flex-row gap-x-3 text-red-800 hover:text-red-600 cursor-pointer mt-5" id={`sacarMembresía${pet.id}`} onClick={(e) => changeToInput(e, pet.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                    </svg>
                                    <h>Sacar membresía</h>
                                </div>

                                <div id={`confirm${pet.id}`} class="hidden flex flex-row text-red-600">
                                    <h>¿Deseas eliminarle la membresía?</h>

                                    <div class="flex flex-row gap-x-3 mt-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-green-700 cursor-pointer hover:stroke-green-500" onClick={(e) => deleteMembership(e, pet.userOwner, pet.numberOfMembership, pet.id)}>
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6 stroke-red-800 hover:stroke-red-600 cursor-pointer" onClick={(e) => cancelDelete(e, pet.id)}>
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

                {!pets.length && (
                    <h class="text-white font-semibold">Aún no hay mascotas agregadas</h>
                )}
            </div>
        </div>
    )
};
