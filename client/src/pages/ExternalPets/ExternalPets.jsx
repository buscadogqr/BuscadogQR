import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPets, getAllUsers, modifyPet } from "../../redux/Actions/Actions";
import axios from "axios";

export const ExternalPets = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const userMail = localStorage.getItem("bgUserMail");
    const userId = localStorage.getItem("bgUserId");
    const pet = useSelector(state => state.filteredPets);
    const userLogged = useSelector(state => state.userLogged);
    const petRegistering = localStorage.getItem("petToRegister");
    const [imageSelected, setImageSelected] = useState("");
    const [inputs, setInputs] = useState({
        petName: "",
        animal: "",
        breed: "",
        age: "",
        notes: ""
    });

    useEffect(() => {
        if(!userLogged.name && userMail && userId) {
            dispatch(getAllUsers(`?userId=${userId}`));
        }
        
        if (pet && pet.name) {
            navigate(`/pet/${id}`);
        }

        dispatch(getPets(`?petId=${id}`));
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

    const handleCombinedInput = (e) => {
        const value = e.target.value;
        const [name, age] = value.split("/");

        setInputs({
            ...inputs,
            petName: name?.trim() || "",
            age: age?.trim() || "",
        })
    }

    const handleInputChange = (e) => {
        const value = e.target.value;

        setInputs({
            ...inputs,
            [e.target.name]: value
        })
    };

    const addPet = async (e) => {
        e.preventDefault();

        document.getElementById("confirmMsg").style.display = "block";

        if(imageSelected) {
            e.preventDefault();
        
            const formData = new FormData();
            formData.append("file", imageSelected);
            formData.append("upload_preset", "yhp17atl");
        
            await axios.post("https://api.cloudinary.com/v1_1/dtm9ibgrj/image/upload", formData)
            .then(async response => {
                const photo = response.data.secure_url;
                const breedAnimal = `${inputs.animal || "A Completar"} - ${inputs.breed || "A Completar"}`;
                const pet = `?id=${id}&name=${inputs.petName || "A Completar"}&userOwner=${userMail || "A Completar"}&age=${inputs.age || "A Completar"}&breed=${breedAnimal}&notes${inputs.notes || "A Completar"}&photo=${photo || "A Completar"}`;
        
                dispatch(modifyPet(pet))
                .then(() => {
                    petRegistering && localStorage.removeItem("petToRegister");
                    setTimeout(() => {
                        navigate(`/pet/${id}`);
                    }, 1000);
                })
            });
        } else {
            const breedAnimal = `${inputs.animal || "A Completar"} - ${inputs.breed || "A Completar"}`;
            const photo = "https://www.educima.com/dibujo-para-colorear-perro-dl19661.jpg";
            const pet = `?id=${id}&name=${inputs.petName || "A Completar"}&userOwner=${userMail || "A Completar"}&age=${inputs.age || "A Completar"}&breed=${breedAnimal}&notes${inputs.notes || "A Completar"}&photo=${photo || "A Completar"}`;

            dispatch(modifyPet(pet))
            .then(() => {
                petRegistering && localStorage.removeItem("petToRegister");
                setTimeout(() => {
                    navigate(`/pet/${id}`);
                }, 1000);
            })
        }
    };

    return (
        <div>

            { pet && !pet.name && (
                <div class="m-16 flex flex-col">
                    <h1 class="pb-5 text-titles text-4xl font-bold">Registra una mascota</h1>
                    <h>¡Nos alegra que hayas decidido unirte a nuestra comunidad!</h>
                    
                    {!userLogged.name && (
                        <div class="flex flex-col mt-10">
                            <h class="pb-5 text-third text-2xl font-bold">Pasos a seguir para activar correctamente el código QR:</h>
                            <ul class="list-decimal ml-5">
                                <li><h class="font-semibold"><h class="text-third hover:underline hover:underline-offset-4 cursor-pointer" onClick={(e) => goToLogin(e)}>Inicia sesión</h>/<h class="text-third hover:underline hover:underline-offset-4 cursor-pointer" onClick={(e) => goToRegister(e)}>Registrate</h></h>: si todavía no te registraste, ¡este es el momento! Para asociar a la mascota que quieres registrar con un dueño, necesitamos algunos datos básicos tuyos. Si ya lo hiciste, inicia sesión.</li>
                                <br/>
                                <li>
                                    <h><h class="font-semibold">Registra a tu mascota</h>: una vez que inicies sesión, se te redigirá a esta parte de vuelta, dónde ya podrás registrar a tu mascota. Una vez que lo hagas, podrás verla en la parte de "Mis mascotas". Si te perdes o no sos redirigido, no te preocupes, hasta no completar la suscripción de tu mascota no se finaliza el proceso. En ese caso simplemente escanea el QR nuevamente y vas a poder continuar con el registro.</h>
                                </li>
                                <br/>
                                <li>
                                    <h><h class="font-semibold">¡Disfrutá de tu suscripción!</h>: ya con todo configurado, vas a poder quedarte tranquilo de que, en caso de que pierdas a tu mascota, esta tendrá todos los datos necesarios para que alguien te contacte con tan solo un escaneo.</h>
                                </li>
                            </ul>
                        </div>
                    )}
        
                    {!!userLogged.name && (
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
                                            <label>Nombre / edad:</label>
                                            <div class="flex gap-x-2">
                                                <input
                                                    name="petName"
                                                    onChange={(e) => handleInputChange(e)}
                                                    type="text"
                                                    id="first_name"
                                                    class="bg-none border-none"
                                                    disabled
                                                    placeholder={`Familia: ${userLogged && userLogged.surname} --->`}
                                                />

                                                <input
                                                name="combined"
                                                onChange={(e) => handleCombinedInput(e)}
                                                type="text"
                                                id="combined"
                                                className="bg-form border border-form outline-none text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Ej: Zeus/3"
                                                />
                                            </div>
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
                                            />                          
                                        </div>
                                    </div>
        
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
                                    <h class="p-3 mt-2 text-green-700 hidden" id="confirmMsg">Registrando a {inputs.petName}...</h>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}

        </div>
    )
};
