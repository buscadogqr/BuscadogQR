import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

export const Admin = () => {
    const navigate = useNavigate();
    const userLogged = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
    const usersCollectionRef = collection(db, "users");
    const petsCollectionRef = collection(db, "pets");
    const [users, setUsers] = useState([]);
    const [pets, setPets] = useState([]);
    const [user, setUser] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [filterPets, setFilterPets] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const getUsers = async () => {
            const users = await getDocs(usersCollectionRef);
            const usersInfo = users && users.docs.map(user => ({...user.data(), id: user.id}));
            setUsers(usersInfo);
            setFilterUsers(usersInfo);
        };

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

        getUsers();
        getPets();
        checkIfAdmin();
    }, []);

    const goTo = (e, whereTo) => {
        e.preventDefault();

        navigate(`/${whereTo}`);
    };

    const allUsers = (e) => {
        e.preventDefault();

        setFilterUsers(users);
        setInput("");
    };

    const filterOwners = (e, type) => {
        e.preventDefault();
        
        const owners = users.length && users.filter(user => user.type === type);
        setFilterUsers(owners);
        setInput("");
    };

    const search = (e) => {
        e.preventDefault();
        const results = [];
        
        for(let i = 0; i < users.length; i++) {
            const fullName = users[i].name + " " + users[i].surname; 
            if(fullName.toLowerCase().search(input.toLowerCase()) !== -1) results.push(users[i]);
        };
        
        setFilterUsers(results);
    };

    const showUserInfo = (e, id) => {
        e.preventDefault();

        if(document.getElementById(`user${id}`).style.display === "block") document.getElementById(`user${id}`).style.display = "none";
        else document.getElementById(`user${id}`).style.display = "block";
    };

    const deleteMembership = async (e, userId, petName) => {
        e.preventDefault();

        //actualizando la información del usuario
        const userCr = doc(db, "users", userId);
        const userInfo = await getDoc(userCr);
        const userData = userInfo.data();
        const updateData = userData.memberships.filter(m => m.pet !== petName);

        await updateDoc(userCr, { memberships: updateData });
        !updateData.length && await updateDoc(userCr, { type: "Usuario sin membresías" });

        //encontrando el id del perro
        const allPets = await getDocs(petsCollectionRef);
        const petsInfo = allPets && allPets.docs.map(user => ({...user.data(), id: user.id}));
        const petData = petsInfo && petsInfo.find(pet => pet.name === petName && pet.userOwner === userData.mail);
        //eliminando al perro
        const pet = doc(db, "pets", petData.id);
        await deleteDoc(pet);

        document.getElementById(`sacarMembresía${petName}`).style.display = "block";
        document.getElementById(`confirm${petName}`).style.display = "none";
        location.reload();
    };

    const cancelDelete = (e, id) => {
        e.preventDefault();

        document.getElementById(`sacarMembresía${id}`).style.display = "block";
        document.getElementById(`confirm${id}`).style.display = "none";
    };

    const changeToInput = (e, id) => {
        e.preventDefault();

        document.getElementById(`sacarMembresía${id}`).style.display = "none";
        document.getElementById(`confirm${id}`).style.display = "block";
    };

    const showUsersOrPets = (e, data) => {
        e.preventDefault();

        if(document.getElementById(`${data}`).style.display === "block") document.getElementById(`${data}`).style.display = "none";
        else document.getElementById(`${data}`).style.display = "block";
    };

    const searchPet = (e) => {
        e.preventDefault();

        const allPets = pets.length && pets.filter(data => data.name.toLowerCase() === input.toLowerCase());

        if(Array.isArray(allPets)) setFilterPets(allPets);
        else setFilterPets([allPets]);
    };

    const allPets = (e) => {
        e.preventDefault();

        setFilterPets(pets);
        setInput("");
    };

    const showPetInfo = (e, id) => {
        e.preventDefault();

        if(document.getElementById(`pet${id}`).style.display === "block") document.getElementById(`pet${id}`).style.display = "none"
        else document.getElementById(`pet${id}`).style.display = "block";
    };

    document.getElementById('searchUsers') && document.getElementById('searchUsers').addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            search(event);
        }
    });
    
    document.getElementById("searchPets") && document.getElementById("searchPets").addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            searchPet(event);
        }
    });

    return (
        <div>

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

            {user && user.type === "Admin" && (<div class="m-16">
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
                    <div class="w-fit md:w-auto">
                        <div class="flex flex-row gap-x-5 mb-5 bg-buscabrown p-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer hover:rotate-90" onClick={(e) => showUsersOrPets(e, "usersList")}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                            <h1 class="font-semibold">Lista de usuarios</h1>
                        </div>
                        <div class="hidden flex flex-col gap-2 mb-5 mt-5 p-3 pt-5 bg-gray-700 justify-self-center" id="usersList">
                            <div class="flex flex-col md:flex-row justify-self-center md:justify-start mb-5 mt-10 md:mt-5 mr-10 gap-y-2 md:gap-x-5">
                                <button onClick={(e) => allUsers(e)} class="hover:underline hover:underline-offset-4 hover:text-orange-700">Mostrar todos los usuarios</button>
                                <button onClick={(e) => filterOwners(e, "Usuario con membresías")} class="hover:underline hover:underline-offset-4 hover:text-orange-700">Usuarios con membresías</button>
                                <button onClick={(e) => filterOwners(e, "Usuario sin membresías")} class="hover:underline hover:underline-offset-4 hover:text-orange-700">Usuarios sin membresías</button>
                                {/* <button onClick={(e) => expiredMemberships(e)} class="bg-third text-white p-1 md:p-3 border-2 border-third rounded-3xl hover:border-orange-700 hover:bg-orange-700">Membresías caducadas</button> */}
                            </div>
                            <div>
                                <div class="flex flex-row justify-between gap-x-4 mb-3">
                                    <input placeholder="Buscar..." id="searchUsers" value={input} class="bg-gray-800 rounded-2xl p-2 pl-5 w-full text-white h-fit" onChange={(e) => setInput(e.target.value)}/>
                                    <button class="bg-gray-800 p-1 md:p-2 md:px-5 rounded-2xl text-white hover:bg-gray-800/75 h-fit" onClick={(e) => search(e)}>Buscar</button>
                                </div>
                            </div>

                            {!!filterUsers.length && filterUsers.map(user => {
                                return (
                                    <div class="flex flex-col bg-gray-800 p-2 text-white mb-2">
                                        <div class="flex flex-row justify-between">
                                            <div class="flex flex-row gap-x-10">
                                                <img src={user.profilePic && user.profilePic} alt="-" class="w-6 h-6"/>
                                                <h3>{user.name} {user.surname}</h3>
                                            </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer" onClick={(e) => showUserInfo(e, user.id)}>
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </div>

                                            <div class="hidden mt-5" id={`user${user.id}`}>
                                                <div class="flex flex-row gap-x-2 mb-2">
                                                    <h3 class="text-amber-600">Tipo de usuario:</h3>
                                                    <h3>{user.type}</h3>
                                                </div>
                                                <div class="flex flex-row gap-x-2 mb-2">
                                                    <h3 class="text-amber-600">Mail:</h3>
                                                    <a href={`mailto:${user.mail}`} target="_blank"><h3 class="hover:underline hover:underline-offset-4">{user.mail}</h3></a>
                                                </div>
                                                <div class="flex flex-row gap-x-2 mb-2">
                                                    <h3 class="text-amber-600">Celular:</h3>
                                                    <h3>{user.cellphone}</h3>
                                                </div>
                                                <div class="flex flex-row gap-x-2 mb-2">
                                                    <h3 class="text-amber-600">Dirección:</h3>
                                                    <h3>{user.direction}</h3>
                                                </div>
                                                {user.type === "Usuario con membresías" && (<div class="flex flex-col gap-y-4 gap-x-2 mb-2">
                                                    <h3 class="text-amber-600">Suscripciones:</h3>
                                                    {user.memberships?.map(memb => {
                                                        return (
                                                            <div>
                                                                <div class="flex flex-col">
                                                                    <h>Suscripción de {memb.pet}</h>
                                                                    <h>Adquirida: {memb.acquired}</h>
                                                                    <h>Expira: {memb.expiration}</h>
                                                                    <h>Estado: {memb.status === "Up to date" && "Al día" || "Expirada"}</h>
                                                                </div>

                                                            <div class="flex flex-row gap-x-3 text-red-800 hover:text-red-600 cursor-pointer mt-5" id={`sacarMembresía${memb.pet}`} onClick={(e) => changeToInput(e, memb.pet)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                                </svg>
                                                                <h>Sacar membresía a {memb.pet}</h>
                                                            </div>

                                                            <div id={`confirm${memb.pet}`} class="hidden flex flex-row text-red-600 mt-5">
                                                                <h>¿Deseas eliminar la membresía de {memb.pet}?</h>

                                                                <div class="flex flex-row gap-x-3 mt-3">
                                                                    <div  onClick={(e) => deleteMembership(e, user.id, memb.pet)}>
                                                                        <h class="text-white">Si</h>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-green-700 cursor-pointer hover:stroke-green-500">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                                        </svg>
                                                                    </div>
                                                                    <div onClick={(e) => cancelDelete(e, memb.pet)}>
                                                                        <h class="text-white">No</h>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6 stroke-red-800 hover:stroke-red-600 cursor-pointer">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>)}
                                        </div>
                                    </div>
                            )})}
                            {!filterUsers.length && (
                                <h1 class="text-white font-semibold">No hay usuarios por el momento.</h1>
                            )}
                        </div>
                    </div>
                    <div>
                        <div class="flex flex-row gap-x-5 bg-buscabrown p-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer hover:rotate-90" onClick={(e) => showUsersOrPets(e, "petsList")}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                            <h1 class="font-semibold">Lista de mascotas</h1>
                        </div>
                        <div class="hidden flex flex-col gap-2 mb-5 mt-5 p-3 pt-5 bg-gray-700 justify-self-center" id="petsList">
                            <button onClick={(e) => allPets(e)} class="justify-self-center md:justify-start mb-5 mt-10 md:mt-5 mr-10 hover:underline hover:underline-offset-4 hover:text-orange-700">Mostrar todas las mascotas</button>
                            <div class="flex flex-row justify-between gap-x-4 mb-3">
                                <input placeholder="Buscar..." value={input} id="searchPets" class="bg-gray-800 rounded-2xl p-2 pl-5 w-full text-white h-fit" onChange={(e) => setInput(e.target.value)}/>
                                <button class="bg-gray-800 p-2 md:px-5 rounded-2xl text-white hover:bg-gray-800/75 h-fit" onClick={(e) => searchPet(e)}>Buscar</button>
                            </div>
                            {!!filterPets.length && filterPets.map(pet => {
                                return (
                                    <div class="flex flex-col bg-gray-800 p-2 text-white mb-2">
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
                    </div>
                </div>
            </div>)}
        </div>
    )
};
