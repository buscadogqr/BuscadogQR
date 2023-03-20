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
        // <div class="flex justify-center m-20 mt-10 items-center">

        //     {!userLogged && goToLogin()}

        //     <div class="flex flex-col">
        //         <h1 class="text-titles text-2xl font-bold">Editar información de mi mascota</h1>
        //         <label for="photo" class="block mb-2 text-sm font-medium text-buscabrown mt-5">Imagen</label>
        //         <input
        //             name="photo"
        //             onChange={(e) => setImageSelected(e.target.files[0])}
        //             type="file"
        //             id="photo"
        //             class="bg-form border border-form outline-none text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //         />
               
        //         <div class="flex flex-row flex-wrap gap-4 mt-5">
        //             <div>
        //                 <label for="first_name" class="block mb-2 text-sm font-medium text-buscabrown">Nombre</label>
        //                 <input
        //                     name="name"
        //                     onChange={(e) => handleInputChange(e)}
        //                     type="text"
        //                     id="first_name"
        //                     class="bg-form border border-form outline-none text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                     placeholder="Zeus"
        //                 />
        //             </div>
        //             <div>
        //                 <label for="age" class="block mb-2 text-sm font-medium text-buscabrown">Edad</label>
        //                 <input
        //                     name="age"
        //                     onChange={(e) => handleInputChange(e)}
        //                     type="text"
        //                     id="age"
        //                     class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                     placeholder="1 año"
        //                 />
        //             </div>
        //         </div>
                
        //         <div class="flex flex-row flex-wrap gap-4 mt-5">
        //             <div>
        //                 <label for="animal" class="block mb-2 text-sm font-medium text-buscabrown">Animal</label>
        //                 <input
        //                     name="animal"
        //                     onChange={(e) => handleInputChange(e)}
        //                     type="text"
        //                     id="animal"
        //                     class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                     placeholder="Perro"
        //                 />                          
        //             </div>
        //             <div>
        //                 <label for="breed" class="block mb-2 text-sm font-medium text-buscabrown">Raza</label>
        //                 <input
        //                     name="breed"
        //                     onChange={(e) => handleInputChange(e)}
        //                     type="text"
        //                     id="breed"
        //                     class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                     placeholder="Golden Retriever"
        //                 />                          
        //             </div>
        //         </div>

        //         <div class="mt-5">
        //             <label for="notes" class="block mb-2 text-sm font-medium text-buscabrown">Notas</label>
        //             <input
        //                 name="notes"
        //                 onChange={(e) => handleInputChange(e)}
        //                 type="text"
        //                 id="notes"
        //                 class="bg-form border border-form text-white text-sm outline-none rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                 placeholder="Bebe mucha agua, es asustadizo..."
        //             />                          
        //         </div>

        //         <button class="bg-third text-white border border-2 border-third outline-none rounded-3xl p-2 mt-10 hover:bg-orange-700 hover:border-orange-700 cursor-pointer" onClick={(e) => handleSubmit(e)}>¡Agregar mascota!</button>

        //     </div>
        // </div>
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
            
            </div>
        </div>
    )
};
