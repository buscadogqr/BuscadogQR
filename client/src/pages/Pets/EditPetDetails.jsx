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
                navigate('/profile');
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
            navigate('/profile');
        }
    };

    return (
        <div class="flex self-center gap-x-16 text-third flex-col md:flex-row mt-10">

            {!userLogged && goToLogin()}

            <div class="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
                <img class="w-full h-56 object-cover object-center" src="https://www.educima.com/dibujo-para-colorear-perro-dl19661.jpg" alt="avatar"/>
                <div class="flex items-center px-6 py-3 bg-third">
                    <h1 class="mx-3 text-white font-semibold text-lg">Mascota</h1>
                </div>
                <div class="py-4 px-6">
                    <div class="flex flex-row flex-wrap gap-4 mt-5">
                        <label for="photo">Foto</label>
                        <input
                            name="photo"
                            onChange={(e) => setImageSelected(e.target.files[0])}
                            type="file"
                            id="photo"
                            class="bg-form border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div class="flex flex-row flex-wrap gap-4 mt-5">
                        <label>Nombre: </label>
                        <input
                            name="name"
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            id="first_name"
                            class="bg-third border border-third text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={pet && pet.name}
                        />
                    </div>

                    <div class="flex flex-row flex-wrap gap-4 mt-5">
                        <label>Edad: </label>
                        <input
                            name="age"
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            id="age"
                            class="bg-third border border-third text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={pet && pet.age}
                        />
                    </div>

                    <div class="flex flex-row flex-wrap gap-4 mt-5">
                        <label>Raza: </label>
                        <input
                            name="breed"
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            id="breed"
                            class="bg-third border border-third text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={pet && pet.breed}
                        />
                    </div>

                    <div class="flex flex-row flex-wrap gap-4 mt-5">
                        <label>Notas adicionales: </label>
                        <input
                            name="notes"
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            id="notes"
                            class="bg-third border border-third text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={pet && pet.notes}
                        />
                    </div>
                </div>

                <button class="text-white border border-2 border-third rounded-xl p-2 hover:text-third hover:bg-white cursor-pointer bg-third ml-6" onClick={(e) => submitChanges(e)}>Confirmar cambios</button>
            </div>
        </div>
    )
};
