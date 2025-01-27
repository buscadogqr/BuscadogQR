import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getPets } from "../../redux/Actions/Actions";

export const PetDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userMail = localStorage.getItem("bgUserMail");
    const userId = localStorage.getItem("bgUserId");
    const users = useSelector((state) => state.users);
    const pet = useSelector((state) => state.filteredPets);
    const userLogged = useSelector((state) => state.userLogged);

    const [owner, setOwner] = useState(null);
    const [loading, setLoading] = useState(true); // Controla la carga inicial

    // Cargar los datos necesarios al inicio
    useEffect(() => {
        const fetchData = async () => {
            if (!userLogged && userMail && userId) {
                await dispatch(getAllUsers(`?userId=${userId}`));
            }

            await dispatch(getPets(`?petId=${id}`));
            if (!users.length) {
                await dispatch(getAllUsers());
            }

            setLoading(false); // Finaliza la carga
        };

        fetchData();
    }, [dispatch, id, userId, userMail, userLogged, users.length]);

    // Actualizar el dueño cuando los datos estén disponibles
    useEffect(() => {
        if (pet.userOwner && users.length) {
            const ownerData = users.find((user) => user.mail === pet.userOwner);
            setOwner(ownerData || {});
        }
    }, [pet.userOwner, users]);

    // Redirigir si la mascota no tiene datos válidos
    useEffect(() => {
        if (!loading && pet.id && !pet.name) {
            navigate(`/petRegistering/${id}`);
        }
    }, [loading, pet, id, navigate]);

    const goBack = (e) => {
        e.preventDefault();
        navigate("/pets");
    };

    const editPet = (e, id) => {
        e.preventDefault();
        navigate(`/editPetInfo/${id}`);
    };

    const joinCellNumbers = (cellphone) => {
        if (cellphone && isNaN(Number(cellphone))) {
            return cellphone.replace(/\D/g, ""); // Elimina todo lo que no sea un número
        }
        return cellphone;
    };

    if (loading) {
        return <div>Cargando datos...</div>; // Muestra un mensaje mientras se cargan los datos
    }

    return (
        <div>
            {!!pet && !!pet.name && !!owner && (
                <div className="flex flex-col text-white mt-10">
                    {userMail === pet.userOwner && (
                        <div className="flex flex-row gap-x-2 text-black m-5 mx-10 self-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 hover:stroke-amber-400 cursor-pointer"
                                onClick={(e) => goBack(e)}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
                            </svg>
                            <h>Volver a mis mascotas</h>
                        </div>
                    )}
                    <div className="flex self-center flex-col md:flex-row gap-x-16 p-6">
                        {/* Datos de la mascota */}
                        <div className="flex flex-col">
                            <div className="max-w-sm bg-gray-700 shadow-lg rounded-lg overflow-hidden my-4">
                                <img
                                    className="w-full h-56 object-cover object-center"
                                    src={pet.photo}
                                    alt={pet.name}
                                />
                                <div className="flex items-center px-6 py-3 bg-gray-800">
                                    <h1 className="mx-3 text-white font-semibold text-lg">Mascota</h1>
                                </div>
                                <div className="py-4 px-6">
                                    <div className="flex flex-row justify-between">
                                        <h1 className="text-2xl font-semibold">{pet.name}</h1>
                                        {userMail === pet.userOwner && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6 cursor-pointer hover:stroke-amber-500"
                                                onClick={(e) => editPet(e, pet.id)}
                                            >
                                                <title>Editar información de mascota</title>
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex items-center mt-4">
                                        <h1 className="px-2 text-sm">
                                            <h className="font-bold">Edad:</h> {pet.age}
                                        </h1>
                                    </div>
                                    <div className="flex items-center mt-4">
                                        <h1 className="px-2 text-sm">
                                            <h className="font-bold">Mascota:</h> {pet.breed}
                                        </h1>
                                    </div>
                                    <div className="flex items-center mt-4">
                                        <h1 className="px-2 text-sm">
                                            <h className="font-bold">Notas adicionales:</h> {pet.notes || "-"}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Datos del dueño */}
                        <div className="max-w-sm bg-gray-700 shadow-lg rounded-lg overflow-hidden my-4">
                            <img
                                className="w-full h-56 object-cover object-center"
                                src={owner.profilePic || ""}
                                alt={owner.name}
                            />
                            <div className="flex items-center px-6 py-3 bg-gray-800">
                                <h1 className="mx-3 text-white font-semibold text-lg">Dueño/a</h1>
                            </div>
                            <div className="py-4 px-6">
                                <h1 className="text-2xl font-semibold">
                                    {owner.name + " " + owner.surname}
                                </h1>
                                <div class="flex items-center mt-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 stroke-amber-400">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                    <h1 class="px-2 text-sm">{owner.direction}</h1>
                                </div>
                                <div class="flex flex-col gap-y-2">
                                    <a class="flex items-center mt-4" href={`mailto:${owner.mail}`} target="_blank">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="52 42 88 66" class="w-6 h-6">
                                        <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/>
                                        <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/>
                                        <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/>
                                        <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/>
                                        <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/>
                                        </svg>
                                        <h1 class="px-2 text-sm">{owner.mail}</h1>
                                    {userMail !== pet.userOwner && (
                                        <h class="text-red-600 font-semibold text-xs hover:underline hover:underline-offset-4 cursor-pointer"> (¡Mandale un mail!)</h>
                                        )}
                                    </a>
                                </div>
                                <div class="flex flex-col gap-y-2">
                                    <a class="flex items-center mt-4" href={`https://wa.me/${joinCellNumbers(owner.cellphone)}`} target="_blank">
                                        <svg fill="#06d00a" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 308 308" stroke="#06d00a" class="h-6 w-6">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                                            <g id="XMLID_468_"> 
                                            <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"></path> <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"></path> 
                                            </g> 
                                            </g>
                                        </svg>
                                        <h class="px-2 text-sm">{owner.cellphone}</h>
                                    {userMail !== pet.userOwner && (
                                        <h class="text-lime-600 font-semibold text-xs hover:underline hover:underline-offset-4 cursor-pointer"> (¡Mandale un mensaje!)</h>
                                        )}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
