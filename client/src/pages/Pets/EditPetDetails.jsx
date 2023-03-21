import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export const EditPetDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        breed: "",
        age: "",
        notes: ""
    });
    const userLogged = localStorage.getItem("userId");
    const userMail = localStorage.getItem("email");
    const petsCollectionRef = collection(db, "pets");
    const [pet, setPet] = useState([]);
    const [imageSelected, setImageSelected] = useState("");

    useEffect(() => {
        const getPets = async () => {
            const allPets = await getDocs(petsCollectionRef);
            const petsInfo = allPets && allPets.docs.map(user => ({...user.data(), id: user.id}));
            const pet = petsInfo && petsInfo.find(pet => pet.id === id);
            setPet(pet);
        };

        getPets();
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
                const pet = doc(db, "pets", id);
        
                let updatedPet1 = {}
        
                for(let i in inputs) {
                    if(inputs[i] && inputs[i] !== "") {
                        updatedPet1 = {...updatedPet1, [i]: inputs[i] }
                    }
                };
        
                await updateDoc(pet, {...updatedPet1, photo})
                navigate(`/pet/${id}`);
            });
        } else {
            const pet = doc(db, "pets", id);
        
            let updatedPet2 = {}
    
            for(let i in inputs) {
                if(inputs[i] && inputs[i] !== "") {
                    updatedPet2 = {...updatedPet2, [i]: inputs[i] }
                }
            };

            await updateDoc(pet, updatedPet2)
            navigate(`/pet/${id}`);
        }
    };

    const goBack = (e, id) => {
        e.preventDefault();

        navigate(`/pet/${id}`);
    };

    return (
        <div class="flex flex-col gap-y-5 justify-center m-20 mt-10 items-center">

            {!userLogged && goToLogin()}

            {userMail === pet.userOwner && (
                <div class="flex flex-row gap-x-2 text-black m-5 mx-10 self-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer" onClick={(e) => goBack(e, pet && pet.id)}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <h>Volver a mis mascotas</h>
                </div>
            )}

            <div class="flex flex-col self-center">
                <h1 class="text-titles text-2xl font-bold">Editar información de {pet && pet.name}</h1>
                    <div class="mt-5">
                        <label for="photo">Foto</label>
                        <input
                            name="photo"
                            onChange={(e) => setImageSelected(e.target.files[0])}
                            type="file"
                            id="photo"
                            class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div class="mt-5">
                        <label>Nombre: </label>
                        <input
                            name="name"
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            id="first_name"
                            class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={pet && pet.name}
                        />
                    </div>

                    <div class="mt-5">
                        <label>Edad: </label>
                        <input
                            name="age"
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            id="age"
                            class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={pet && pet.age}
                        />
                    </div>

                    <div class="mt-5">
                        <label>Raza: </label>
                        <input
                            name="breed"
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            id="breed"
                            class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={pet && pet.notes || "-"}
                        />
                    </div>
                    <button class="p-3 bg-third border-2 border-third rounded-3xl outline-none hover:bg-orange-700 hover:border-orange-700 text-white mt-10 cursor-pointer" onClick={(e) => submitChanges(e)}>Confirmar cambios</button>
                    <h class="p-3 mt-2 text-green-700 hidden" id="confirmMsg">Confirmando cambios...</h>
                </div>
        </div>
    )
};
