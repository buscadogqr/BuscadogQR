import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsers, getPets, modifyPet } from "../../redux/Actions/Actions";
import axios from "axios";

export const EditPetDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pet = useSelector(state => state.filteredPets);
    const user = useSelector(state => state.userLogged);
    const [inputs, setInputs] = useState({
        name: "",
        breed: "",
        age: "",
        notes: ""
    });
    const [imageSelected, setImageSelected] = useState("");
    const userId = localStorage.bgUserId;
    const userMail = localStorage.bgUserMail;
    
    useEffect(() => {
        if(!user.name && userId && userMail) {
            dispatch(getAllUsers(`?userId=${userId}`));
        }

        dispatch(getPets(`?petId=${id}`));
    }, [pet.name, user.name]);

    const handleInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    };

    const submitChanges = async (e) => {
        document.getElementById("confirmMsg").style.display = "block";

        if(imageSelected) {
            e.preventDefault();
        
            const formData = new FormData();
            formData.append("file", imageSelected);
            formData.append("upload_preset", "yhp17atl");
        
            await axios.post("https://api.cloudinary.com/v1_1/dtm9ibgrj/image/upload", formData)
            .then(async response => {
                let updatedPet = `?id=${id}&photo=${response.data.secure_url}&`;
        
                for(let property in inputs) {
                    if(inputs[property]) {
                        updatedPet = updatedPet + `${property}=${inputs[property]}&`;
                    }
                };
        
                dispatch(modifyPet(updatedPet))
                .then(() => {
                    setTimeout(() => {
                        navigate(`/pet/${id}`);
                    }, 1000);s
                });
            });
        } else {
            let updatedPet = `?id=${id}&`;
    
            for(let property in inputs) {
                if(inputs[property]) {
                    updatedPet = updatedPet + `${property}=${inputs[property]}&`;
                }
            };
    
            dispatch(modifyPet(updatedPet))
            .then(() => {
                setTimeout(() => {
                    navigate(`/pet/${id}`);
                }, 1000);
            });
        }
    };

    const goToLogin = () => {
        navigate("/login");
    };

    const goToProfile = () => {
        navigate("/profile");
    };

    const goBack = (e, id) => {
        e.preventDefault();

        navigate(`/pet/${id}`);
    };

    return (
        <div>

           {!user.name && goToLogin()}

           { user.mail !== pet.userOwner && goToProfile() }

           <div class="flex flex-row gap-x-2 self-start mt-10 mx-20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer" onClick={(e) => goBack(e, id)}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <h>Volver</h>
            </div>

            <div class="flex justify-center m-20 mt-10 items-center">
                <div class="flex flex-col">
                    <h1 class="text-titles text-2xl font-bold">Editar infromación de mi mascota</h1>
                    <label for="photo" class="block mb-2 text-sm font-medium text-buscabrown mt-5">Imagen</label>
                    <input
                        name="photo"
                        onChange={(e) => setImageSelected(e.target.files[0])}
                        type="file"
                        id="photo"
                        class="bg-form border border-form outline-none text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />

                    <div class="flex flex-row flex-wrap gap-4 mt-5">
                        <div>
                            <label>Nombre: </label>
                            <input
                                name="name"
                                onChange={(e) => handleInputChange(e)}
                                type="text"
                                id="first_name"
                                class="bg-form border border-form outline-none text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={pet && pet.name}
                            />
                        </div>

                        <div>
                            <label>Edad: </label>
                            <input
                                name="age"
                                onChange={(e) => handleInputChange(e)}
                                type="text"
                                id="age"
                                class="bg-form border border-form outline-none text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={pet && pet.age}
                                />
                        </div>
                    </div>

                    <div class="mt-5">
                        <label>Animal - Raza: </label>
                        <input
                            name="breed"
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            id="breed"
                            class="bg-form border border-form outline-none text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={pet && pet.breed}
                        />
                    </div>

                    <div class="mt-5">
                        <label>Notas adicionales: </label>
                        <input
                            name="notes"
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            id="notes"
                            class="bg-form border border-form outline-none text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={pet && pet.notes}
                        />
                    </div>

                    <button class="bg-third text-white border border-2 border-third outline-none rounded-3xl p-2 mt-10 hover:border-orange-700 hover:bg-orange-700 cursor-pointer" onClick={(e) => submitChanges(e)}>Confirmar cambios</button>
                    <h class="p-3 mt-2 text-green-700 hidden" id="confirmMsg">Confirmando cambios...</h>
                </div>
            </div>
        </div>
    )
};
