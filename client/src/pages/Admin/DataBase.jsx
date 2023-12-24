import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config.js";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export const DataBase = () => {
    const userLogged = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
    const usersCollectionRef = collection(db, "users");
    const petsCollectionRef = collection(db, "pets");
    const [users, setUsers] = useState([]);
    const [pets, setPets] = useState([]);
    const [user, setUser] = useState([]);
    const [chosen, setChosen] = useState("");
    const [displayDoc, setDisplayDoc] = useState({});

    const getUsers = async () => {
        const users = await getDocs(usersCollectionRef);
        const usersInfo = users && users.docs.map(user => ({...user.data(), id: user.id}));
        setUsers(usersInfo);
    };

    const getPets = async () => {
        const allPets = await getDocs(petsCollectionRef);
        const petsInfo = allPets && allPets.docs.map(user => ({...user.data(), id: user.id}));
        const registeredPets = petsInfo && petsInfo.filter(pet => pet.name);
        const petsToRegister = petsInfo && petsInfo.filter(pet => !pet.name);
        const orderedPets = [...registeredPets, ...petsToRegister];
        setPets(orderedPets);
    };

    const checkIfAdmin = async () => {
        const userDoc = doc(db, "users", userId);
        const userData = await getDoc(userDoc);
        const userInfo = userData.data();

        setUser(userInfo);
    };

    const getDocument = (e) => {
        setChosen(e.target.value);

        const allDocs = [...pets, ...users];
        const chosenDoc = allDocs.find(document => document.id == e.target.value);
        setDisplayDoc(chosenDoc);
    };

    useEffect(() => {
        getUsers();
        getPets();
        checkIfAdmin();
    }, []);

    return (
        <div class="m-16">
         { !userLogged && (
                <div class="flex flex-col gap-y-5">
                    <h class="pb-5 text-titles text-4xl font-bold">Oops! Parece que no tienes los permisos para acceder a esta ruta</h>
                    <button class="self-start p-3 bg-third hover:bg-orange-700 text-white rounded-3xl" onClick={(e) => goTo(e, "login")}>Iniciar sesión</button>
                </div>
            )}

            { !Object.keys(user).length && (
                <img src="https://i.stack.imgur.com/kOnzy.gif" alt="Loading..." class="h-16 w-16 mt-48 ml-[10rem] md:ml-[25rem] lg:ml-[45rem]"/>
            )}

            { !!Object.keys(user).length && user.type !== "Admin" && (
                <div class="flex flex-col gap-y-5">
                    <h class="pb-5 text-titles text-4xl font-bold">Oops! Parece que no tienes los permisos para acceder a esta ruta</h>
                    <button class="self-start p-3 bg-third hover:bg-orange-700 text-white rounded-3xl" onClick={(e) => goTo(e, "profile")}>Volver a mi perfil</button>
                </div>
            )}

            { !!Object.keys(user).length && user.type === "Admin" && (<div class="flex flex-col">
                <h1 class="text-4xl text-titles font-bold">BASE DE DATOS</h1>

                <div class="self-center flex flex-col gap-y-10 md:flex-row gap-x-32 mt-16">
                    <div class="flex flex-col">
                        <label>ELEGIR MASCOTA</label>
                        <select name="MASCOTAS" class="outline-0" onChange={(e) => getDocument(e)}>
                            <option value="" selected>MASCOTAS</option>
                            { !!pets.length && pets?.map(pet => {
                                return (
                                    <option value={pet.id}>{pet.name || "Mascota a registrar"}</option>
                            )})}
                        </select>
                    </div>

                    <div class="flex flex-col">
                        <label>ELEGIR USUARIO</label>
                        <select name="USUARIOS" onChange={(e) => getDocument(e)}>
                            <option value="" selected>USUARIOS</option>
                            { !!users.length && users?.map(user => {
                                return (
                                    <option value={user.id}>{user.name}</option>
                            )})}
                        </select>
                    </div>
                </div>

                <div class="flex mt-24 self-center bg-third/75 w-full h-fit py-8 px-32 justify-center text-white">
                    { !chosen && (<h1 class="self-center">Elija un documento para visualizar</h1>)}
                    { chosen && (<div class="flex flex-col md:flex-row gap-x-24">
                        <img src={displayDoc.profilePic || displayDoc.photo} alt="profilePic" class="h-40 md:h-40 justify-self-center rounded-full"/>
                        <div class="flex flex-col mt-10 md:mt-5">
                            <h>NAME: {displayDoc.name}</h>
                            { displayDoc.surname && <h>SURNAME: {displayDoc.surname}</h>}
                            { displayDoc.cellphone && <h>CELLPHONE: {displayDoc.cellphone}</h>}
                            { displayDoc.direction && <h>DIRECTION: {displayDoc.direction}</h>}
                            { displayDoc.password && <h>PASSWORD: {displayDoc.password}</h>}
                            { displayDoc.type && <h>TYPE: {displayDoc.type}</h>}
                            { displayDoc.mail && <h>MAIL: {displayDoc.mail}</h>}
                            { displayDoc.age && <h>AGE: {displayDoc.age}</h>}
                            { displayDoc.breed && <h>BREED: {displayDoc.breed}</h>}
                            { displayDoc.notes && <h>NOTES: {displayDoc.notes}</h>}
                            { displayDoc.userOwner && <h>OWNER: {displayDoc.userOwner}</h>}
                        </div>
                    </div>)}
                </div>
            </div>)}
        </div>
    )
};
