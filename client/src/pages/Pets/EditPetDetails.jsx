import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPetById, getUserById, updatePetDetails, updateUserDetails } from "../../Redux/Actions/Actions";
import axios from "axios";

export const EditPetDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [imageSelected, setImageSelected] = useState("");
    const { petById, userLogged } = useSelector(state => state);
    const [inputs, setInputs] = useState({
        name: "",
        breed: "",
        age: "",
        notes: ""
    });
    
    useEffect(() => {
        dispatch(getPetById(id));
        !Object.keys(userLogged).length && dispatch(getUserById(userId));
    }, []);

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
                const photo = response.data.secure_url;
        
                let updatedPet1 = {}
        
                for(let i in inputs) {
                    if(inputs[i] && inputs[i] !== "") {
                        updatedPet1 = {...updatedPet1, [i]: inputs[i] }
                    }
                };

                if(updatedPet1.name) {
                    let memb = Object.keys(userLogged).length && userLogged.memberships && userLogged.memberships.find(memb => memb.pet === pet.name);
                    let otherMembs = Object.keys(userLogged).length && ownerData.memberships && ownerData.memberships.filter(memb => memb.pet !== pet.name);
                    memb = {...memb, pet: updatedPet1.name};
                    dispatch(updateUserDetails(userId, { memberships: [...otherMembs, memb] }));
                };
        
                dispatch(updatePetDetails(id, {...updatedPet1, photo}))
                .then(() => {
                    navigate(`/pet/${id}`);
                });
            });
        } else {
            let updatedPet2 = {}
    
            for(let i in inputs) {
                if(inputs[i] && inputs[i] !== "") {
                    updatedPet2 = {...updatedPet2, [i]: inputs[i] }
                }
            };

            if(updatedPet2.name) {
                let memb = Object.keys(userLogged).length && userLogged.memberships && userLogged.memberships.find(memb => memb.pet === pet.name);
                let otherMembs = Object.keys(userLogged).length && userLogged.memberships && userLogged.memberships.filter(memb => memb.pet !== pet.name);
                memb = {...memb, pet: updatedPet2.name};
                dispatch(updateUserDetails(userId, { memberships: [...otherMembs, memb] }));
            };

            dispatch(updatePetDetails(id, updatedPet2))
            .then(() => {
                navigate(`/pet/${id}`);
            });
        }
    };

    // const goBack = (e, id) => {
    //     e.preventDefault();

    //     navigate(`/pet/${id}`);
    // };

    return (
        <div class="flex justify-center m-20 mt-10 items-center">

            {!userLogged && goToLogin()}

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
                            placeholder={petById && petById.name}
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
                            placeholder={petById && petById.age}
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
                        placeholder={petById && petById.breed}
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
                        placeholder={petById && petById.notes}
                    />
                </div>

                <button class="bg-third text-white border border-2 border-third outline-none rounded-3xl p-2 mt-10 hover:border-orange-700 hover:bg-orange-700 cursor-pointer" onClick={(e) => submitChanges(e)}>Confirmar cambios</button>
                <h class="p-3 mt-2 text-green-700 hidden" id="confirmMsg">Confirmando cambios...</h>
            </div>
        </div>
    )
};
