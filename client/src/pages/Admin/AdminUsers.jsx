import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export const AdminUsers = () => {
    const navigate = useNavigate();
    const usersCollectionRef = collection(db, "users");
    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const getUsers = async () => {
            const allUsers = await getDocs(usersCollectionRef);
            const usersInfo = allUsers && allUsers.docs.map(user => ({...user.data(), id: user.id}));
            setUsers(usersInfo);
            setFilterUsers(usersInfo);
        };

        getUsers();
    }, []);

    const goToAdmin = (e) => {
        e.preventDefault();

        navigate("/admin");
    };

    const filterOwners = (e) => {
        e.preventDefault();
        
        const owners = users.length && users.filter(user => user.type === "Owner");
        setFilterUsers(owners);
        setInput("");
    };

    const allUsers = (e) => {
        e.preventDefault();

        setFilterUsers(users);
        setInput("");
    };

    // const expiredMembersh = (e) => {
    //     e.preventDefault();

    //     dispatch(checkExpiredMemberships());
    // };

    const changeType = async (e, userId, type) => {
        e.preventDefault();

        const user = doc(db, "users", userId);
        await updateDoc(user, { type: type });
        setInput("");
    };

    const search = (e) => {
        e.preventDefault();

        const user = users.length && users.find(user => user.name.toLowerCase() === input.toLowerCase());
        setFilterUsers([user]);
    };

    return (
        <div class="m-10">
            <div class="flex flex-row gap-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer" onClick={(e) => goToAdmin(e)}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <h>Volver a las estadísticas</h>
            </div>

            <h1 class="mt-10 ml-5 text-titles text-4xl font-bold">Usuarios</h1>
            <div class="flex flex-row justify-end mt-5 mr-10 gap-x-5">
                <button onClick={(e) => allUsers(e)} class="bg-third text-white p-3 border-2 border-third rounded-3xl hover:border-orange-700 hover:bg-orange-700">Mostrar todos los usuarios</button>
                <button onClick={(e) => filterOwners(e)} class="bg-third text-white p-3 border-2 border-third rounded-3xl hover:border-orange-700 hover:bg-orange-700">Usuarios con membresías</button>
                <button onClick={(e) => expiredMembersh(e)} class="bg-third text-white p-3 border-2 border-third rounded-3xl hover:border-orange-700 hover:bg-orange-700">Usuarios con membresías caducadas</button>
            </div>
            <div class="grid grid-rows-5 grid-flow-col gap-2 m-10 mt-5 p-3 pt-5 bg-gray-700">
                <div class="flex flex-row justify-between gap-x-4 mb-3">
                    <input placeholder="Buscar..." value={input} class="bg-gray-800 rounded-2xl p-2 pl-5 w-full text-white" onChange={(e) => setInput(e.target.value)}/>
                    <button class="bg-gray-800 p-2 px-5 rounded-2xl text-white hover:bg-gray-800/75" onClick={(e) => search(e)}>Buscar</button>
                </div>
                {!!filterUsers.length && filterUsers.map(user => {
                    return (
                        <div class="flex flex-row gap-x-10 bg-gray-800 p-2 text-white justify-between">
                            {user.profilePic && <img src={user.profilePic} alt="-" class="w-6 h-6"/>}
                            {!user.profilePic && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            }
                            <h3>{user.name} {user.surname}</h3>
                            <h3>{user.type}</h3>
                            <a href={`mailto:${user.mail}`} target="_blank"><h3 class="hover:underline hover:underline-offset-4">{user.mail}</h3></a>
                            <h3>{user.cellphone}</h3>
                            <h3>{user.direction}</h3>

                            {user.type === "Usuario con membresías" && (
                                <div class="self-end text-red-800 hover:text-red-600 cursor-pointer" onClick={(e) => changeType(e, user.id, "Usuario sin membresías")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                    </svg>
                                </div>
                            )}

                            {user.type === "Usuario sin membresías" && (
                                <div class="self-end text-green-800 hover:text-green-600 cursor-pointer" onClick={(e) => changeType(e, user.id, "Usuario con membresías")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    )
                })}

                {!filterUsers.length && (
                    <h1 class="text-white font-semibold">No hay usuarios por el momento.</h1>
                )}
            </div>
        </div>
    )
};
