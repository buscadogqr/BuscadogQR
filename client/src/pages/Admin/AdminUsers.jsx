import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";

export const AdminUsers = () => {
    const navigate = useNavigate();
    const usersCollectionRef = collection(db, "users");
    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [input, setInput] = useState("");
    const [months, setMonths] = useState(0);

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

    const filterOwners = (e, type) => {
        e.preventDefault();
        
        const owners = users.length && users.filter(user => user.type === type);
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

    //     //acá guardaremos los nombres de las mascotas cuyas membresías expiraron
    //     const expired = [];

    //     //fecha en la que chequee las expiraciones
    //     const todayDate = new Date();
    //     const today = todayDate.getDate() + "-" + (todayDate.getMonth() + 1) + "-" + todayDate.getFullYear();
    //     let [todayDay, todayMonth, todayYear] = today.split("-");
    //     todayMonth = 3

    //     users.forEach(user => {
    //         //por cada una de las membresías, chequeamos cuáles caducaron
    //         user.memberships.forEach(pet => {
            
    //             //fecha en la que expira la membresía de la mascota
    //             const [day, month, year] = pet.expiration.split("-");
    
    //             function checkMembership () {
    //                 if(year === todayYear) {
    //                     if(Number(month) === Number(todayMonth) && Number(day) === Number(todayDay)) {
    //                         pet.status = "Expired"
    //                         expired.push({user: user.name, userId: user.id, pet: pet.pet});
    //                     }
    
    //                     else if(Number(todayMonth) > Number(month)) {
    //                         pet.status = "Expired"
    //                         expired.push({user: user.name, userId: user.id, pet: pet.pet});
    //                     }
    
    //                     else if(Number(todayMonth) === Number(month) && Number(todayDay) > Number(day)) {
    //                         pet.status = "Expired"
    //                         expired.push({user: user.name, userId: user.id, pet: pet.pet});
    //                     }
    //                 }
    
    //                 else if(Number(year) < Number(todayYear)) { //ex.: 2022 - 2023
    //                     pet.status = "Expired"
    //                     expired.push({user: user.name, userId: user.id, pet: pet.pet});
    //                 };
    //             };
    
    //             checkMembership();
    //         });
    //     });

    //     if(expired.length) return expired;
    // };

    const search = (e) => {
        e.preventDefault();

        const user = users.length && users.find(user => user.name.toLowerCase() === input.toLowerCase());
        setFilterUsers([user]);
    };

    const changeToInput = (e, id) => {
        e.preventDefault();

        setMonths(0);
        document.getElementById(`ponerMembresía${id}`).style.display = "none";
        document.getElementById(`membMonths${id}`).style.display = "block";
    };

    const cancelChange = (e, id) => {
        e.preventDefault();

        document.getElementById(`ponerMembresía${id}`).style.display = "block";
        document.getElementById(`membMonths${id}`).style.display = "none";
    };

    const addMembership = async (e, id) => {
        e.preventDefault();

        const userCr = doc(db, "users", id);

        //setting the dates
        const todayDate = new Date();
        const newDate = new Date();
        newDate.setMonth(newDate.getMonth() + Number(months));
        const acquired = todayDate.getDate() + "-" + (todayDate.getMonth() + 1) + "-" + todayDate.getFullYear();
        const expiration = newDate.getDate() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getFullYear();

        const userInfo = await getDoc(userCr);
        const user = userInfo.data();

        if(!user.memberships.length) {
            await updateDoc(userCr, { type: "Usuario con membresías", memberships: [ { acquired, expiration, months, status: "Up to date", pet: "pet1" }] });
        } else {
            await updateDoc(userCr, { type: "Usuario con membresías", memberships: [ ...user.memberships, { acquired, expiration, months, status: "Up to date", pet: `pet${++user.memberships.length}` }] });
        }

        document.getElementById(`ponerMembresía${id}`).style.display = "block";
        document.getElementById(`membMonths${id}`).style.display = "none";
        location.reload();
    };

    const showUserInfo = (e, id) => {
        e.preventDefault();

        if(document.getElementById(`user${id}`).style.display === "block") document.getElementById(`user${id}`).style.display = "none"
        else document.getElementById(`user${id}`).style.display = "block";
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
            <div class="flex flex-col md:flex-row justify-self-center md:justify-end mt-10 md:mt-5 mr-10 gap-y-2 md:gap-x-5">
                <button onClick={(e) => allUsers(e)} class="bg-third text-white p-1 md:p-3 border-2 border-third rounded-3xl hover:border-orange-700 hover:bg-orange-700">Mostrar todos los usuarios</button>
                <button onClick={(e) => filterOwners(e, "Usuario con membresías")} class="bg-third text-white p-1 md:p-3 border-2 border-third rounded-3xl hover:border-orange-700 hover:bg-orange-700">Usuarios con membresías</button>
                <button onClick={(e) => filterOwners(e, "Usuario sin membresías")} class="bg-third text-white p-1 md:p-3 border-2 border-third rounded-3xl hover:border-orange-700 hover:bg-orange-700">Usuarios sin membresías</button>
            </div>
            <div class="flex flex-col gap-2 ml-2 md:ml-10 m-10 mt-5 p-3 pt-5 bg-gray-700 w-fit md:w-auto justify-self-center">
                <div class="flex flex-row justify-between gap-x-4 mb-3">
                    <input placeholder="Buscar..." value={input} class="bg-gray-800 rounded-2xl p-2 pl-5 w-full text-white h-fit" onChange={(e) => setInput(e.target.value)}/>
                    <button class="bg-gray-800 p-1 md:p-2 md:px-5 rounded-2xl text-white hover:bg-gray-800/75 h-fit" onClick={(e) => search(e)}>Buscar</button>
                </div>

                {!!filterUsers.length && filterUsers.map(user => {
                    return (
                        <div class="flex flex-col bg-gray-800 p-2 text-white">
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

                                <div class="flex flex-row gap-x-5 self-end text-green-800 hover:text-green-600 cursor-pointer mt-5">
                                    <div id={`ponerMembresía${user.id}`} onClick={(e) => changeToInput(e, user.id)} class="flex flex-row gap-x-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                        </svg>
                                        <h>Agregar membresía</h>
                                    </div>
                                    <div id={`membMonths${user.id}`} class="hidden flex flex-row">
                                        <input type="number" placeholder="1" class="bg-gray-700 rounded-2xl w-fit p-2 pl-5 text-white" onChange={(e) => setMonths(e.target.value)}/>

                                        <div class="flex flex-row gap-x-3 mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" onClick={(e) => addMembership(e, user.id)}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6 stroke-red-700" onClick={(e) => cancelChange(e, user.id)}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
