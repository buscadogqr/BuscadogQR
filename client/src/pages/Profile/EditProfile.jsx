import React,  {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, modifyUser } from "../../redux/Actions/Actions";
import { supabase } from "../../supabaseclient";

export const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogged = localStorage.getItem("bgUserId");
    const [inputs, setInputs] = useState({
        name: "",
        surname: "",
        cellphone: "",
        direction: ""
    });
    const user = useSelector(state => state.userLogged);
    const [imageSelected, setImageSelected] = useState("");

    useEffect(() => {
        if(!userLogged.name && userLogged) {
            dispatch(getAllUsers(`?userId=${userLogged}`));
        } 
    }, []);

    const handleInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    };

    const submitChanges = async (e) => {
        e.preventDefault();
        document.getElementById("confirmMsg").style.display = "block";
    
        let updatedUser = `id=${userLogged}&`;
    
        // Paso 1: si hay imagen seleccionada
        if (imageSelected) {
            // 🗑️ Eliminar la imagen anterior (si hay)
            const oldImagePath = user.profilePic?.split("/").pop(); // si guardás solo la URL pública
            if (oldImagePath) {
                await supabase.storage.from('images').remove([oldImagePath]);
            }
    
            // 📤 Subir la nueva imagen
            const fileExt = imageSelected.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
    
            const { data, error } = await supabase.storage
                .from('images')
                .upload(fileName, imageSelected, {
                    cacheControl: '3600',
                    upsert: false
                });
    
            if (error) {
                console.error('Error uploading image:', error.message);
            } else {
                const { data: publicUrlData } = supabase.storage
                    .from('images')
                    .getPublicUrl(data.path);
    
                const photo = publicUrlData.publicUrl;
                updatedUser += `profilePic=${photo}&`;
            }
        }
    
        // Paso 2: agregar el resto de los inputs que fueron modificados
        for (let property in inputs) {
            if (inputs[property]) {
                updatedUser += `${property}=${inputs[property]}&`;
            }
        }
    
        dispatch(modifyUser(updatedUser))
            .then(() => {
                setTimeout(() => {
                    navigate('/profile');
                }, 1500);
            });
    };

    const goToLogin = () => {
        navigate("/login");
    };

    const goBack = (e) => {
        e.preventDefault();

        navigate("/profile");
    };

    return (
        <div class="flex flex-col gap-y-5 justify-center m-20 mt-10 items-center">

            {!userLogged && goToLogin()}

            <div class="flex flex-row gap-x-2 self-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer" onClick={(e) => goBack(e)}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <h>Volver a mi perfil</h>
            </div>

            <div class="flex flex-col">
                <h1 class="text-titles text-2xl font-bold">Editar mi perfil</h1>
                <div class="mt-5">
                    <label for="profilePic">Foto de perfil</label>
                    <input
                        name="profilePic"
                        onChange={(e) => setImageSelected(e.target.files[0])}
                        type="file"
                        id="profilePic"
                        class="bg-form border border-form outline-none text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
               
                <div class="mt-5">
                    <label for="name">Nombre</label>
                    <input
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="name"
                        class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={user && user.name}
                    />
                </div>
                <div class="mt-5">
                    <label for="surname">Apellido</label>
                    <input
                        name="surname"
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="surname"
                        class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={user && user.surname}
                    />
                </div>
                <div class="mt-5">
                    <label for="cellphone">Celular</label>
                    <input
                        name="cellphone"
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="cellphone"
                        class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={user && user.cellphone}
                    />
                </div>
                <div class="mt-5">
                    <label for="direction">Dirección</label>
                    <input
                        name="direction"
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="direction"
                        class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={user && user.direction}
                    />
                </div>

                <button class="p-3 bg-third border-2 border-third rounded-3xl outline-none hover:bg-orange-700 hover:border-orange-700 text-white mt-10 cursor-pointer" onClick={(e) => submitChanges(e)}>Confirmar cambios</button>
                <h class="p-3 mt-2 text-green-700 hidden" id="confirmMsg">Confirmando cambios...</h>

            </div>
        </div>
    )
};
