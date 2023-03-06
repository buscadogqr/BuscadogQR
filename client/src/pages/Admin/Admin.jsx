import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

export const Admin = () => {
    const navigate = useNavigate();
    const userLogged = localStorage.getItem("userId");
    const usersCollectionRef = collection(db, "users");
    const petsCollectionRef = collection(db, "pets");
    const [users, setUsers] = useState([]);
    const [pets, setPets] = useState([]);
    // const [ currentUser, setCurrentUser ] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const users = await getDocs(usersCollectionRef);
            const usersInfo = users && users.docs.map(user => ({...user.data(), id: user.id}));
            setUsers(usersInfo);
        };

        // const getCurrentUser = async () => {
        //     const users = await getDocs(usersCollectionRef);
        //     const usersInfo = users && users.docs.map(user => ({...user.data(), id: user.id}));
        //     const user = usersInfo && usersInfo.find(user => user.id === userLogged);
        //     setCurrentUser(user);
        // };

        const getPets = async () => {
            const allPets = await getDocs(petsCollectionRef);
            const petsInfo = allPets && allPets.docs.map(user => ({...user.data(), id: user.id}));
            setPets(petsInfo);
        };

        // getCurrentUser();
        getUsers();
        getPets();
    }, []);

    let profits = 0;

    // users && users.forEach(user => {

    //     user.memberships.forEach(membership => {
    //         const [acqDay, acqMonth, acqYear] = membership.acquired.split("-");
    //         const [expDay, expMonth, expYear] = membership.expiration.split("-");

    //         const petProfits = (expMonth - acqMonth) * 300 + 700;
    //         profits += petProfits;
    //     });
    // });

    const goTo = (e, whereTo) => {
        e.preventDefault();

        navigate(`/${whereTo}`);
    };

    const goToLogin = () => {
        navigate("/login");
    };

    // const checkIfAdmin = () => {
    //     if(currentUser && currentUser.type !== "Admin" || !currentUser.type) navigate("/profile");
    // };

    // console.log(currentUser)

    return (
        <div>

            { !userLogged && goToLogin() }
            {/* { currentUser.length && checkIfAdmin() } */}

            <div class="m-16">
                <h1 class="pb-5 text-titles text-4xl font-bold">Información de administrador</h1>
                <div class="grid grid-cols-3 gap-x-5 m-5">
                    <div class="bg-third text-white p-5">
                        <h2 class="font-semibold mb-2">Usuarios</h2>
                        <h class="m-5 text-3xl">{users && users.length}</h>
                    </div>
                    <div class="bg-third text-white p-5">
                        <h2 class="font-semibold mb-2">Mascotas</h2>
                        <h class="m-5 text-3xl">{pets && pets.length}</h>
                    </div>
                    <div class="bg-third text-white p-5">
                        <h2 class="font-semibold mb-2">Ganancias totales</h2>
                        <h class="m-5 text-3xl">{profits}</h>
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
            </div>
        </div>
    )
};
