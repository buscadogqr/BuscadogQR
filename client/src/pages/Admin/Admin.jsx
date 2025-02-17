import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getMembers, getPets, getRegisteredPets, getPrice, getStats, modifyPrice, createPet } from "../../redux/Actions/Actions.js";

export const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userMail = localStorage.getItem("bgUserMail");
    const userId = localStorage.getItem("bgUserId");
    const user = useSelector(state => state.userLogged);
    const users = useSelector(state => state.users); 
    const members = useSelector(state => state.members); 
    const pets = useSelector(state => state.pets); 
    const registeredPets = useSelector(state => state.registeredPets); 
    const statePrice = useSelector(state => state.price); 
    const stats = useSelector(state => state.stats); 
    const [filterUsers, setFilterUsers] = useState([]);
    const [filterPets, setFilterPets] = useState([]);
    const [input, setInput] = useState("");
    const [inputPets, setInputPets] = useState("");
    const [price, setPrice] = useState(0);
    const [priceInput, setPriceInput] = useState("");

    useEffect(() => {
        if (!user.name && userMail && userId) {
            dispatch(getAllUsers(`?userId=${userId}`));
        }
        dispatch(getAllUsers());
        dispatch(getPets());
        dispatch(getMembers());
        dispatch(getRegisteredPets());
        dispatch(getPrice());
        dispatch(getStats());
    }, [user, userMail, userId, dispatch]);
    
    useEffect(() => {
        if (users.length) setFilterUsers(users);
        if (pets.length) setFilterPets(pets);
    }, [users, pets]);

    const goTo = (e, whereTo) => {
        e.preventDefault();

        navigate(`/${whereTo}`);
    };

    const allUsers = (e) => {
        e.preventDefault();

        setFilterUsers(users);
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

    const filterOwners = (e, type) => {
        e.preventDefault();
        
        const owners = users.length && users.filter(user => user.type === type);
        setFilterUsers(owners);
        setInput("");
    };

    const filterRegisteredPets = (e) => {
        e.preventDefault();
        
        const registered = pets.length && pets.filter(pets => !!pets.name);
        setFilterPets(registered);
        setInput("");
    };

    const showUserInfo = (e, id) => {
        e.preventDefault();

        if(document.getElementById(`user${id}`).style.display === "block") document.getElementById(`user${id}`).style.display = "none";
        else document.getElementById(`user${id}`).style.display = "block";
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

    const updatePrice = () => {
        dispatch(modifyPrice(priceInput))
        .then(() => location.reload());
    };

    // <----- QR CODE FUNCTIONS ----->

    const createQRcode = async () => {
        const url = `https://buscadogqr.vercel.app/pet/${pets.length + 1}`;
        const size = 150;

        clearQRcode();
        createPetDoc()
        .then(() => {
            showSpinner();

            setTimeout(() => {
                hideSpinner();
                generateQRcode(url, size);
            }, 1000)
        })
    };

    // Add doc
    const createPetDoc = async () => {
        const docId = pets.length + 1;
        dispatch(createPet(`?id=${docId}`));
    };

    // Generate QR code
    const generateQRcode = (url, size) => {
        const qrCode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size
        });
    };

    // Clear content from previous QR code
    const clearQRcode = () => {
        document.getElementById("qrcode").innerHTML = "";
    };

    // Show loader
    const showSpinner = () => {
        document.getElementById("qrcodeLoader").style.display = "block";
    };

    // Hide loader
    const hideSpinner = () => {
        document.getElementById("qrcodeLoader").style.display = "none";
    };
    
    return (
        <div>

            { !user.name && (
                <div class="flex flex-col gap-y-5 m-16">
                    <h class="pb-5 text-titles text-4xl font-bold">Oops! Parece que no tienes los permisos para acceder a esta ruta</h>
                    <button class="self-start p-3 bg-third hover:bg-orange-700 text-white rounded-3xl" onClick={(e) => goTo(e, "login")}>Iniciar sesión</button>
                </div>
            )}

            { !!Object.keys(user).length && user.type !== "Admin" && (
                <div class="flex flex-col gap-y-5 m-16">
                    <h class="pb-5 text-titles text-4xl font-bold">Oops! Parece que no tienes los permisos para acceder a esta ruta</h>
                    <button class="self-start p-3 bg-third hover:bg-orange-700 text-white rounded-3xl" onClick={(e) => goTo(e, "profile")}>Volver a mi perfil</button>
                </div>
            )}

            { !!Object.keys(user).length && user.type === "Admin" && (<div>
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

                <div class="flex justify-between flex-wrap self-center md:self-start">
                    <div class="mb-10 text-xl mx-16 font-semibold">
                        <h class="self-center">Precio actual del collar: <h class="font-normal">${statePrice.length && statePrice[0]}</h></h>
                        <div class="flex flex-col gap-y-2 w-fit md:flex-row md:gap-x-2 md:items-center">
                            <h>¿Quieres cambiar el precio? </h>
                            <input 
                            class="border-buscabrown rounded-xl bg-buscabrown outline-none text-white font-normal"
                            type="text"
                            id="price"
                            placeholder={statePrice.length && statePrice[0]}
                            onChange={(event) => setPriceInput(event.target.value)}
                            />
                            <button class="bg-third border-2 border-third outline-none text-white hover:bg-orange-700 hover:border-orange-700 rounded-3xl font-medium text-sm w-full sm:w-auto px-3 py-2.5 text-center cursor-pointer font-normal" onClick={() => updatePrice()}>Cambiar</button>
                        </div>
                    </div>

                    {/* QR CODE */}

                    <div class="flex flex-col mx-16 mb-5">
                        <div class="self-center">
                            <h class="font-semibold text-xl">Generar nuevo código QR: </h>
                            <div class="flex flex-col gap-y-2 w-fit md:flex-row md:gap-x-2 md:items-center">
                                <h>buscadogqr.vercel.app/pet/</h>
                                <div class="flex gap-x-2">
                                    <h class="border-buscabrown rounded-xl bg-buscabrown outline-none text-white py-2 px-16 w-fit">{!!pets.length && pets.length + 1}</h>
                                    <button class="bg-third border-2 border-third outline-none text-white hover:bg-orange-700 hover:border-orange-700 rounded-3xl font-medium text-sm w-fit px-3 py-2.5 text-center cursor-pointer font-normal" onClick={() => createQRcode()}>Generar</button>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col self-center mt-10">
                            <img id="qrcodeLoader" src="https://retchhh.wordpress.com/wp-content/uploads/2015/03/loading1.gif" alt="Loading..." class="h-[10rem] w-[10rem] hidden"/>
                            <div id="qrcode" class="self-center mb-5"></div>
                        </div>

                    </div>

                    {/* QR CODE */}
                    
                </div>

                <div class="text-white flex flex-col mb-10">
                    <div class="w-screen md:w-auto md:mx-16 md:mt-5 md:mb-1">
                        <div class="flex flex-row gap-x-5 mb-5 bg-buscabrown p-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer hover:rotate-90" onClick={(e) => showUsersOrPets(e, "usersList")}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                            <h1 class="font-semibold">Usuarios</h1>
                        </div>
                        <div class="hidden flex flex-col gap-2 mb-5 mt-5 p-3 pt-5 bg-gray-700 justify-self-center" id="usersList">
                            <div class="flex flex-col md:flex-row justify-self-center md:justify-start mb-5 mt-10 md:mt-5 mr-10 gap-y-2 md:gap-x-5">
                                <button onClick={(e) => allUsers(e)} class="font-bold text-orange-400 hover:underline hover:underline-offset-4 hover:text-orange-300">Mostrar todos los usuarios</button>
                                <button onClick={(e) => filterOwners(e, "Usuario con membresías")} class="font-bold text-orange-400 hover:underline hover:underline-offset-4 hover:text-orange-300">Usuarios con membresías</button>
                                <button onClick={(e) => filterOwners(e, "Usuario sin membresías")} class="font-bold text-orange-400 hover:underline hover:underline-offset-4 hover:text-orange-300">Usuarios sin membresías</button>
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

                                            <div class="hidden mt-7" id={`user${user.id}`}>
                                                <div class="flex flex-row gap-x-2 mb-2">
                                                    <h class="font-bold">Tipo de usuario: </h>
                                                    <h3>{user.type}</h3>
                                                </div>
                                                <div class="flex flex-row gap-x-2 mb-2">
                                                    <h class="font-bold">Dirección del usuario: </h>
                                                    <h3>{user.direction}</h3>
                                                </div>
                                                <a class="flex flex-row gap-x-2 mb-2" href={`mailto:${user.mail}`} target="_blank">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="52 42 88 66" class="h-6 w-6">
                                                        <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/>
                                                        <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/>
                                                        <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/>
                                                        <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/>
                                                        <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/>
                                                    </svg>
                                                    <h3 class="hover:underline hover:underline-offset-4">{user.mail}</h3>
                                                </a>
                                                <a class="flex flex-row gap-x-2 mb-2" href={`https://wa.me/${joinCellNumbers(user.cellphone)}`} target="_blank">
                                                    <svg fill="#06d00a" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 308 308" stroke="#06d00a" class="h-6 w-6">
                                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                                                        <g id="XMLID_468_"> 
                                                        <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"></path> <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"></path> 
                                                        </g> 
                                                        </g>
                                                    </svg>
                                                    <h>{user.cellphone}</h>
                                                </a>
                                                {user.type === "Usuario con membresías" && (<div class="mt-7 flex flex-col gap-y-4 gap-x-2 mb-1">
                                                    <h3 class="text-orange-400 font-bold">Suscripciones:</h3>
                                                    <ul class="list-disc pl-5">
                                                        {user.memberships?.map(memb => {
                                                            return (
                                                                <div>
                                                                    <li>Suscripción de <h class="font-bold">{memb.pet}</h>: adquirida el <h class="font-bold">{memb.acquired}</h></li>
                                                                </div>
                                                            )
                                                        })}
                                                    </ul>
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
                            <button onClick={(e) => allPets(e)} class="font-bold text-orange-400 justify-self-center md:justify-start mb-5 mt-10 md:mt-5 mr-10 hover:underline hover:underline-offset-4 hover:text-orange-300">Mostrar todas las mascotas</button>
                            <button onClick={(e) => filterRegisteredPets(e)} class="font-bold text-orange-400 justify-self-center md:justify-start mb-5 mt-10 md:mt-5 mr-10 hover:underline hover:underline-offset-4 hover:text-orange-300">Mostrar mascotas registradas</button>
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
                                                { pet.name && (
                                                    <Link to={`/pet/${pet.id}`}>
                                                        <h3 class="hover:underline hover:underline-offset-4 hover:text-orange-700">{pet.name}</h3>
                                                    </Link>
                                                )}
                                                <h3 class="text-lime-300">{!pet.name && "Mascota a registrar"}</h3>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer" onClick={(e) => showPetInfo(e, pet.id)}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </div>

                                        <div class="hidden mt-5" id={`pet${pet.id}`}>
                                            <div class="flex flex-row gap-x-2 mb-2">
                                                <h3 class="font-bold">Mascota:</h3>
                                                <h3>{pet.breed}</h3>
                                            </div>
                                            <div class="flex flex-row gap-x-2 mb-2">
                                                <h3 class="font-bold">Edad:</h3>
                                                <h3>{pet.age}</h3>
                                            </div>
                                            <div class="flex flex-row gap-x-2 mb-2">
                                                <h3 class="font-bold">Notas:</h3>
                                                <h3>{pet.notes || "Sin notas"}</h3>
                                            </div>
                                            <div class="flex flex-row gap-x-2 mb-2">
                                                <h3 class="text-orange-400 font-bold">Dueño:</h3>
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
