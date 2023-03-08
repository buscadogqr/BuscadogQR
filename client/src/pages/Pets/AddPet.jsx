import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { db } from "../../firebase-config.js";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";

export const AddPet = () => {
    const [input, setInput] = useState({name: '', animal: "", breed: "", age: "", notes: ""});
    const navigate = useNavigate();
    const userLogged = localStorage.getItem("userId");
    const [imageSelected, setImageSelected] = useState("");
    const petsCollectionRef = collection(db, "pets");

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(imageSelected) {
            const formData = new FormData();
            formData.append("file", imageSelected);
            formData.append("upload_preset", "yhp17atl");
            
            const userCr = doc(db, "users", userLogged);
            const userInfo = await getDoc(userCr);
            const user = userInfo.data();
    
            await axios.post("https://api.cloudinary.com/v1_1/dtm9ibgrj/image/upload", formData)
            .then(response => {
                const photo = `https://res.cloudinary.com/dtm9ibgrj/image/upload/${response.data.public_id}.png`;
    
                const breedAnimal = `${input.animal} - ${input.breed}`
            
                addDoc(petsCollectionRef, { userOwner: user.mail, name: input.name, age: input.age, breed: breedAnimal, photo, notes: input.notes, numberOfMembership: `pet${user.memberships.length}` })
                .then(async data => {
                    await updateDoc(userCr, { type: "Usuario con membresías"  });
                    navigate('/pets');
                })
            });
        } else {
            const breedAnimal = `${input.animal} - ${input.breed}`

            const userCr = doc(db, "users", userLogged);
            const userInfo = await getDoc(userCr);
            const user = userInfo.data();

            addDoc(petsCollectionRef, { userOwner: user.mail, name: input.name, age: input.age, breed: breedAnimal, photo: "https://www.educima.com/dibujo-para-colorear-perro-dl19661.jpg", notes: input.notes, numberOfMembership: `pet${user.memberships.length}` })
            .then(async data => {
                await updateDoc(userCr, { type: "Usuario con membresías" });
                navigate('/pets');
            })
        }
    };

    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <div class="flex justify-center m-20 mt-10 items-center">

            {!userLogged && goToLogin()}

            <div class="flex flex-col">
                <h1 class="text-titles text-2xl font-bold">Añade una mascota</h1>
                <label for="photo" class="block mb-2 text-sm font-medium text-buscabrown mt-5">Imagen</label>
                <input
                    name="photo"
                    onChange={(e) => setImageSelected(e.target.files[0])}
                    type="file"
                    id="photo"
                    class="bg-form border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
               
                <div class="flex flex-row flex-wrap gap-4 mt-5">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-buscabrown">Nombre</label>
                        <input
                            name="name"
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            id="first_name"
                            class="bg-form border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Zeus"
                        />
                    </div>
                    <div>
                        <label for="age" class="block mb-2 text-sm font-medium text-buscabrown">Edad</label>
                        <input
                            name="age"
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            id="age"
                            class="bg-form border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="1 año"
                        />
                    </div>
                </div>
                
                <div class="flex flex-row flex-wrap gap-4 mt-5">
                    <div>
                        <label for="animal" class="block mb-2 text-sm font-medium text-buscabrown">Animal</label>
                        <input
                            name="animal"
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            id="animal"
                            class="bg-form border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Perro"
                        />                          
                    </div>
                    <div>
                        <label for="breed" class="block mb-2 text-sm font-medium text-buscabrown">Raza</label>
                        <input
                            name="breed"
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            id="breed"
                            class="bg-form border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Golden Retriever"
                        />                          
                    </div>
                </div>

                <div class="mt-5">
                    <label for="notes" class="block mb-2 text-sm font-medium text-buscabrown">Notas</label>
                    <input
                        name="notes"
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="notes"
                        class="bg-form border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Bebe mucha agua, es asustadizo..."
                    />                          
                </div>

                <button class="bg-third text-white border border-2 border-third rounded-3xl p-2 mt-10 hover:text-third hover:bg-white cursor-pointe" onClick={(e) => handleSubmit(e)}>¡Agregar mascota!</button>

            </div>
        </div>
    )
};
