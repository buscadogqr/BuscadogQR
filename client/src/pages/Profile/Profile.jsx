import React,  {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import "./Profile.css";

export const Profile = () => {
    const userLogged = localStorage.getItem("userId");
    const navigate = useNavigate();
    const usersCollectionRef = collection(db, "users");
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        const getUser = async () => {
            const users = await getDocs(usersCollectionRef);
            const usersInfo = users && users.docs.map(user => ({...user.data(), id: user.id}));
            const user = usersInfo && usersInfo.find(user => user.id === userLogged);
            setUser(user);
        };

        getUser();
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem("email");
        localStorage.removeItem("userId");

        setTimeout(() => {
            navigate("/login")
        }, 1000);
    };

    const goTo = (e, whereTo) => {
        e.preventDefault();

        navigate(`/${whereTo}`);
    };

    const confirmDeletion = () => {
        document.getElementById('myModal').style.display = 'block';
    };

    const cancelDeletion = () => {
        document.getElementById('myModal').style.display = 'none';
    };

    const handleDeleteAcc = async (e) => {
        e.preventDefault();

        document.getElementById('myModal').style.display = 'none'
        const userDoc = doc(db, "users", userLogged);
        await deleteDoc(userDoc)
        .then(data => {
            localStorage.removeItem("email");
            localStorage.removeItem("userId");
            setTimeout(() => {
                navigate("/home");
            }, 1500)
        })
    };

    const goToLogin = () => {
        navigate("/login");
    };

    const settingLS = (e) => {
        e.preventDefault();
    
        localStorage.setItem("userResetName", user && user.name);
        localStorage.setItem("userResetId", user && user.id);
        navigate("/resetPass");
    };

    return (
        <div class="flex justify-center items-center m-20 mt-16 w-fit self-center bg-gray-100 border-4 border-titles rounded-3xl p-10">

            {!userLogged && goToLogin()}

            <div class="flex flex-col">
                <h1 class="text-titles text-2xl font-bold">Mi perfil</h1>
                <div class="flex flex-col md:flex-row gap-x-16">
                    <div>
                        <img src={user && user.profilePic} class="h-40 md:h-40 justify-self-center rounded-full mt-5"/>
                    </div>
                    <div class="flex flex-col">
                        <div class="flex flex-row gap-x-5 mt-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                            </svg>
                            <h3>{user && user.name + " " + user.surname}</h3>
                        </div>
                        <div class="flex flex-row gap-x-5 mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                            <h3>{user && user.mail}</h3>
                        </div>
                        <div class="flex flex-row gap-x-5 mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            <h3>{user && user.cellphone}</h3>
                        </div>
                        <div class="flex flex-row gap-x-5 mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            <h3>{user && user.direction}</h3>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row mt-14 gap-y-5 gap-x-5">
                    <div class="flex flex-row gap-x-5 bg-titles outline-none text-white border border-2 border-titles rounded-xl p-2 hover:border-green-900 hover:bg-green-900 cursor-pointer" onClick={(e) => goTo(e, "editProfile")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        <button>Editar perfil</button>
                    </div>

                    <div class="flex flex-row gap-x-5 bg-titles outline-none text-white border border-2 border-titles rounded-xl p-2 hover:border-green-900 hover:bg-green-900 cursor-pointer" onClick={(e) => handleLogout(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                        </svg>
                        <h3>Cerrar sesión</h3>
                    </div>

                    <div class="flex flex-row gap-x-5 text-white outline-none border border-2 border-red-900 rounded-xl p-2 hover:bg-red-700 hover:border-red-700 cursor-pointer bg-red-900" onClick={confirmDeletion}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        <h3>Borrar cuenta</h3>
                    </div>

                    <div id='myModal' className='modal'>
                        <div>
                            <div>
                                <h3>¿Estás seguro de que quieres eliminar tu cuenta permanentemente?</h3>
                                <input type='button' className='btn' value='Eliminar cuenta' onClick={(e) => handleDeleteAcc(e)}/>
                                <button class="outline-none " onClick={cancelDeletion}>Cancelar X</button>
                            </div>
                        </div>
                    </div>

                </div>

                <h class="mt-7 text-sm">¿<h class="hover:underline hover:underline-offset-4 text-third cursor-pointer" onClick={(e) => settingLS(e)}>Olvidaste</h> tu contraseña?</h>
            </div>
        </div>
    )
};
