import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";

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
    const [inputPets, setInputPets] = useState("");

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
        if(!results.length) setInput("");
    };

    const showUserInfo = (e, id) => {
        e.preventDefault();

        if(document.getElementById(`user${id}`).style.display === "block") document.getElementById(`user${id}`).style.display = "none";
        else document.getElementById(`user${id}`).style.display = "block";
    };

    // const deleteMembership = async (e, userId, petName) => {
    //     e.preventDefault();

    //     //actualizando la información del usuario
    //     const userCr = doc(db, "users", userId);
    //     const userInfo = await getDoc(userCr);
    //     const userData = userInfo.data();
    //     const updateData = userData.memberships.filter(m => m.pet !== petName);

    //     await updateDoc(userCr, { memberships: updateData });
    //     !updateData.length && await updateDoc(userCr, { type: "Usuario sin membresías" });

    //     //encontrando el id del perro
    //     const allPets = await getDocs(petsCollectionRef);
    //     const petsInfo = allPets && allPets.docs.map(pet => ({...pet.data(), id: pet.id}));
    //     const petData = petsInfo && petsInfo.find(pet => pet.name === petName && pet.userOwner === userData.mail);
    //     //eliminando al perro
    //     const pet = doc(db, "pets", petData.id);
    //     await deleteDoc(pet);

    //     document.getElementById(`sacarMembresía${petName}`).style.display = "block";
    //     document.getElementById(`confirm${petName}`).style.display = "none";
    //     location.reload();
    // };

    // const cancelDelete = (e, id) => {
    //     e.preventDefault();

    //     document.getElementById(`sacarMembresía${id}`).style.display = "block";
    //     document.getElementById(`confirm${id}`).style.display = "none";
    // };

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
        const results = [];

        for(let i = 0; i < pets.length; i++) {
            if(pets[i].name.toLowerCase().search(inputPets.toLowerCase()) !== -1) results.push(pets[i]);
        };

        setFilterPets(results);
        if(!results.length) setInputPets("");
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

    const joinCellNumbers = (cellphone) => {
        if(isNaN(Number(cellphone))) {
            let onlyNumbers = [];
            
            for(let i = 0; i < cellphone.length; i++) {
                if(!isNaN(cellphone[i]) && cellphone[i] !== " ") onlyNumbers.push(cellphone[i]);
            }
            
            return onlyNumbers.join("");
        } else {
            return cellphone;
        }
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

            {user && user.type === "Admin" && (<div>
                <h1 class="pb-5 m-16 mb-5 text-titles text-4xl font-bold">Información de administrador</h1>
                <div class="flex flex-col gap-y-5 md:grid md:grid-cols-2 md:gap-x-5 m-16 justify-self-center">
                    <div class="bg-third text-white p-5">
                        <h2 class="font-semibold mb-2">Usuarios</h2>
                        <h class="m-5 text-3xl">{users && users.length}</h>
                    </div>
                    <div class="bg-third text-white p-5">
                        <h2 class="font-semibold mb-2">Mascotas</h2>
                        <h class="m-5 text-3xl">{pets && pets.length}</h>
                    </div>
                </div>

                <div class="text-white flex flex-col mb-10">
                    <div class="w-screen md:w-auto md:mx-16 md:mt-5 md:mb-1">
                        <div class="flex flex-row gap-x-5 mb-5 bg-buscabrown p-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer hover:rotate-90" onClick={(e) => showUsersOrPets(e, "usersList")}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                            <h1 class="font-semibold">Lista de usuarios</h1>
                        </div>
                        <div class="hidden flex flex-col gap-2 mb-5 mt-5 p-3 pt-5 bg-gray-700 justify-self-center" id="usersList">
                            <div class="flex flex-col md:flex-row justify-self-center md:justify-start mb-5 mt-10 md:mt-5 mr-10 gap-y-2 md:gap-x-5">
                                <button onClick={(e) => allUsers(e)} class="text-orange-600 hover:underline hover:underline-offset-4 hover:text-orange-500">Mostrar todos los usuarios</button>
                                <button onClick={(e) => filterOwners(e, "Usuario con membresías")} class="text-orange-600 hover:underline hover:underline-offset-4 hover:text-orange-500">Usuarios con membresías</button>
                                <button onClick={(e) => filterOwners(e, "Usuario sin membresías")} class="text-orange-600 hover:underline hover:underline-offset-4 hover:text-orange-500">Usuarios sin membresías</button>
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
                                                    <a target="_blank" href={`https://wa.me/${joinCellNumbers(user.cellphone)}`}>{user.cellphone}</a>
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
                                                                    <h class="text-teal-500">Suscripción de {memb.pet}</h>
                                                                    <h>Adquirida: {memb.acquired}</h>
                                                                </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>)}
                                        </div>
                                    </div>
                            )})}
                            {!filterUsers.length && (
                                <h1 class="text-white">No se encontraron usuarios</h1>
                            )}
                        </div>
                    </div>
                    <div class="w-screen md:w-auto md:m-16 md:mt-1">
                        <div class="flex flex-row gap-x-5 bg-buscabrown p-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer hover:rotate-90" onClick={(e) => showUsersOrPets(e, "petsList")}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                            <h1 class="font-semibold">Lista de mascotas</h1>
                        </div>
                        <div class="hidden flex flex-col gap-2 mb-5 mt-5 p-3 pt-5 bg-gray-700 justify-self-center" id="petsList">
                            <button onClick={(e) => allPets(e)} class="text-orange-600 justify-self-center md:justify-start mb-5 mt-10 md:mt-5 mr-10 hover:underline hover:underline-offset-4 hover:text-orange-500">Mostrar todas las mascotas</button>
                            <div class="flex flex-row justify-between gap-x-4 mb-3">
                                <input placeholder="Buscar..." value={inputPets} id="searchPets" class="bg-gray-800 rounded-2xl p-2 pl-5 w-full text-white h-fit" onChange={(e) => setInputPets(e.target.value)}/>
                                <button class="bg-gray-800 p-2 md:px-5 rounded-2xl text-white hover:bg-gray-800/75 h-fit" onClick={(e) => searchPet(e)}>Buscar</button>
                            </div>
                            {!!filterPets.length && filterPets.map(pet => {
                                return (
                                    <div class="flex flex-col bg-gray-800 p-2 text-white mb-2">
                                        <div class="flex flex-row justify-between">
                                            <div class="flex flex-row gap-x-10">
                                                <img src={pet.photo && pet.photo} alt="-" class="w-6 h-6"/>
                                                <Link to={`/pet/${pet.id}`}>
                                                    <h3 class="hover:underline hover:underline-offset-4 hover:text-orange-700">{pet.name}</h3>
                                                </Link>
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

                            {!filterPets.length && (
                                <h class="text-white">No se encontraron mascotas</h>
                            )}
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
};
