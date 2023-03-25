import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase-config.js";
import axios from "axios";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export const ExternalPets = () => {
    const userLogged = localStorage.getItem("userId");
    const userMail = localStorage.getItem("email");
    const petRegistering = localStorage.getItem("petToRegister");
    const navigate = useNavigate();
    const { id } = useParams();
    const [imageSelected, setImageSelected] = useState("");
    const [pet, setPet] = useState([]);
    const [inputs, setInputs] = useState({
        name: "",
        animal: "",
        breed: "",
        age: "",
        notes: ""
    });

    useEffect(() => {
        const getPet = async () => {
            const petDoc = doc(db, "pets", id);
            const petData = await getDoc(petDoc);
            const pet = petData.data();
    
            setPet(pet);
        };

        getPet();
    }, [])

    const goToLogin = (e) => {
        e.preventDefault();

        localStorage.setItem("petToRegister", id);
        navigate("/login");
    };

    const goToRegister = (e) => {
        e.preventDefault();

        localStorage.setItem("petToRegister", id);
        navigate("/register");
    };

    const handleInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    };

    const addPet = async (e) => {
        e.preventDefault();

        document.getElementById("confirmMsg").style.display = "block";

        //usuario al que se le asignará la mascota a registrar
        const userCr = doc(db, "users", userLogged);
        const userInfo = await getDoc(userCr);
        const user = userInfo.data();

        //fecha en la que se adquiere la membresía
        const todayDate = new Date();
        const acquired = todayDate.getDate() + "-" + (todayDate.getMonth() + 1) + "-" + todayDate.getFullYear();

        if(imageSelected) {
            e.preventDefault();
        
            const formData = new FormData();
            formData.append("file", imageSelected);
            formData.append("upload_preset", "yhp17atl");
        
            await axios.post("https://api.cloudinary.com/v1_1/dtm9ibgrj/image/upload", formData)
            .then(async response => {
                const photo = response.data.secure_url;
                const petToUpdate = doc(db, "pets", id);
                const breedAnimal = `${inputs.animal} - ${inputs.breed}`
        
                await updateDoc(petToUpdate, { userOwner: userMail, name: inputs.name, age: inputs.age, breed: breedAnimal, notes: inputs.notes, photo})
                .then(async data => {
                    if(user.memberships && user.memberships.length) {
                        await updateDoc(userCr,  { type: "Usuario con membresías", memberships: [...user.memberships, { acquired, pet: inputs.name }] });
                        petRegistering && localStorage.removeItem("petToRegister");
                        navigate(`/pet/${id}`);
                    } else {
                        await updateDoc(userCr,  { type: "Usuario con membresías", memberships: [{ acquired, pet: inputs.name }] });
                        petRegistering && localStorage.removeItem("petToRegister");
                        navigate(`/pet/${id}`);
                    }
                })
            });
        } else {
            const petToUpdate = doc(db, "pets", id);
            const breedAnimal = `${inputs.animal} - ${inputs.breed}`

            await updateDoc(petToUpdate, { userOwner: userMail, name: inputs.name, age: inputs.age, breed: breedAnimal, notes: inputs.notes, photo: "https://www.educima.com/dibujo-para-colorear-perro-dl19661.jpg"})
            .then(async data => {
                if(user.memberships && user.memberships.length) {
                    await updateDoc(userCr,  { type: "Usuario con membresías", memberships: [...user.memberships, { acquired, pet: inputs.name }] });
                    petRegistering && localStorage.removeItem("petToRegister");
                    navigate(`/pet/${id}`);
                } else {
                    await updateDoc(userCr,  { type: "Usuario con membresías", memberships: [{ acquired, pet: inputs.name }] });
                    petRegistering && localStorage.removeItem("petToRegister");
                    navigate(`/pet/${id}`);
                }
            })
        }
    };

    return (
        <div>

            { pet && pet.name && navigate(`/pet/${id}`) }

            { pet && !pet.name && (
                <div class="m-16 flex flex-col">
                    <h1 class="pb-5 text-titles text-4xl font-bold">Registra una mascota</h1>
                    <h>¡Nos alegra que hayas decidido unirte a nuestra comunidad!</h>
                    
                    {!userLogged && (
                        <div class="flex flex-col mt-10">
                            <h class="pb-5 text-third text-2xl font-bold">Pasos a seguir para activar correctamente el código QR:</h>
                            <ul class="list-decimal ml-5">
                                <li><h class="font-semibold"><h class="text-third hover:underline hover:underline-offset-4 cursor-pointer" onClick={(e) => goToLogin(e)}>Inicia sesión</h>/<h class="text-third hover:underline hover:underline-offset-4 cursor-pointer" onClick={(e) => goToRegister(e)}>Registrate</h></h>: si todavía no te registraste, ¡este es el momento! Para asociar a la mascota que quieres registrar con un dueño, necesitamos algunos datos básicos tuyos. Si ya lo hiciste, inicia sesión.</li>
                                <li>
                                    <h><h class="font-semibold">Registra a tu mascota</h>: una vez que inicies sesión se te redigirá a esta parte de vuelta, dónde ya podrás registrar a tu mascota. Una vez que lo hagas, podrás verla ya en la parte de "Mis mascotas".</h>
                                </li>
                                <li>
                                    <h><h class="font-semibold">¡Disfrutá de tu suscripción!</h>: ya con todo configurado, vas a poder quedarte tranquilo de que, en caso de que pierdas a tu mascota, esta tendrá todos los datos necesarios para que alguien te contacte con tan solo un escaneo.</h>
                                </li>
                            </ul>
                        </div>
                    )}
        
                    {!!userLogged && (
                        <div class="flex flex-col mb-5 mt-10 gap-y-5">
                            <h>Primero necesitamos conocer los datos principales de tu mascota. Una vez que la registres, podrás disfrutar de tu suscripción, teniendo todos sus datos disponibles en la parte de "Mis mascotas".</h>
        
                            <div class="flex flex-col ml-5 w-fit lg:w-max">
                                <h1 class="text-titles text-2xl font-bold">Datos de tu mascota</h1>
                                <form onSubmit={(e) => addPet(e)}>
                                    <label for="photo" class="block mb-2 text-sm font-medium text-buscabrown mt-5">Imagen (opcional)</label>
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
                                                placeholder="Zeus"
                                                required
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
                                                placeholder="1 año"
                                                required
                                                />
                                        </div>
                                        <div>
                                            <label for="animal" class="block mb-2 text-sm font-medium text-buscabrown">Animal</label>
                                            <input
                                                name="animal"
                                                onChange={(e) => handleInputChange(e)}
                                                type="text"
                                                id="animal"
                                                class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Perro"
                                                required
                                            />                          
                                        </div>
                                        <div>
                                            <label for="breed" class="block mb-2 text-sm font-medium text-buscabrown">Raza</label>
                                            <input
                                                name="breed"
                                                onChange={(e) => handleInputChange(e)}
                                                type="text"
                                                id="breed"
                                                class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Golden Retriever"
                                                required
                                            />                          
                                        </div>
                                    </div>
        
                                    {/* <div class="flex flex-row flex-wrap gap-4 mt-5"> */}
                                    {/* </div> */}
        
                                    <div class="mt-5">
                                        <label>Notas adicionales (opcional): </label>
                                        <input
                                            name="notes"
                                            onChange={(e) => handleInputChange(e)}
                                            type="text"
                                            id="notes"
                                            class="bg-form border border-form outline-none text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Bebe mucha agua, es asustadizo..."
                                        />
                                    </div>
        
                                    <button class="bg-third text-white border border-2 border-third outline-none rounded-3xl p-2 mt-10 hover:border-orange-700 hover:bg-orange-700 cursor-pointer" type="submit">Registrar mascota</button>
                                    <h class="p-3 mt-2 text-green-700 hidden" id="confirmMsg">Registrando a {inputs.name}...</h>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}

        </div>
    )
};
