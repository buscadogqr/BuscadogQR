import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, addDoc } from "firebase/firestore";
import "./Register.css";
import axios from "axios";

export const Register = () => {
    const [input, setInput] = useState({name: '', surname: "", direction: "", cellphone: "", mail: "", password: ""});
    const [confirmPass, setConfirmPass] = useState({confirmPass: ""});
    const navigate = useNavigate();
    const [imageSelected, setImageSelected] = useState("");
    const usersCollectionRef = collection(db, "users");

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const checkPasswordsMatch = () => {
        if(input.password === confirmPass) return "Passwords match!";
        else if(confirmPass !== "") return false;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(checkPasswordsMatch() === "Passwords match!") {
            const defaultUserImage = "https://img.freepik.com/vector-premium/icono-avatar-masculino-persona-desconocida-o-anonima-icono-perfil-avatar-predeterminado-usuario-redes-sociales-hombre-negocios-silueta-perfil-hombre-aislado-sobre-fondo-blanco-ilustracion-vectorial_735449-120.jpg";
            
            document.getElementById("passwordsDontMatch").style.display = 'none';
            document.getElementById("registerModal").style.display = 'block';
    
            //Si el usuario adjunta una foto de perfil, se sube a cloudinary y se guarda en la bd
            if(imageSelected) {
                const formData = new FormData();
                formData.append("file", imageSelected);
                formData.append("upload_preset", "yhp17atl");
                
                await axios.post("https://api.cloudinary.com/v1_1/dtm9ibgrj/image/upload", formData)
                .then(response => {
                    const photo = `https://res.cloudinary.com/dtm9ibgrj/image/upload/${response.data.public_id}.png`;

                    addDoc(usersCollectionRef, { ...input, profilePic: photo, type: "Usuario sin membresías" } )
                    .then(data => {
                        document.getElementById("registerModal").style.display = 'none';
                        navigate('/login');
                    });
                })
            }
    
            //Si el usuario NO adjunta una foto de perfil, se guarda en la bd una por default
            else {
                addDoc(usersCollectionRef, { ...input, profilePic: defaultUserImage, type: "Usuario sin membresías" } )
                .then(data => {
                    setTimeout( () => {
                        document.getElementById("registerModal").style.display = 'none';
                        navigate('/login');
                    }, 1000)
                });
            }
        }

        else {
            document.getElementById("passwordsDontMatch").style.display = 'block';
        }
    };

    const showPassword = (pass) => {
        if(pass === "password") {
            const tipo = document.getElementById("password");
            
            if(tipo.type == "password") tipo.type = "text";
            else tipo.type = "password";
        }

        if(pass === "confirmPass") {
            const tipo = document.getElementById("confirmPass");
            
            if(tipo.type == "password") tipo.type = "text";
            else tipo.type = "password";     
        }
    };

    return (
        <div class="mx-10 my-5 bg-gray-100 border-4 border-titles rounded-3xl p-10">
            <h1 class="pb-5 text-titles text-2xl font-bold">Registrarse</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-buscabrown">Nombre</label>
                        <input
                        name="name"
                        value={input.name}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="first_name"
                        class="bg-form border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Juan"
                        required
                        />
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-buscabrown">Apellido</label>
                        <input
                        name="surname"
                        value={input.surname}
                        onChange={(e) => handleInputChange(e)} 
                        type="text"
                        id="last_name"
                        class="bg-form border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Pérez"
                        required
                        />
                    </div>
                    <div>
                        <label for="direction" class="block mb-2 text-sm font-medium text-buscabrown">Dirección</label>
                        <input
                        name="direction"
                        value={input.direction}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="direction"
                        class="bg-form border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Av. Santa Fe 2569"
                        required
                        />
                    </div>  
                    <div>
                        <label for="cellphone" class="block mb-2 text-sm font-medium text-buscabrown">Celular</label>
                        <input
                        name="cellphone"
                        value={input.cellphone}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="phone"
                        class="bg-form border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="+54 9 11 3333-3333"
                        required
                        />
                    </div>
                </div>
                <div class="mb-6">
                    <label for="photo" class="block mb-2 text-sm font-medium text-buscabrown">Foto de perfil</label>
                    <input
                        name="photo"
                        onChange={(e) => setImageSelected(e.target.files[0])}
                        type="file"
                        id="photo"
                        class="bg-form border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-buscabrown">Email</label>
                    <input
                    name="mail"
                    value={input.mail}
                    onChange={(e) => handleInputChange(e)}
                    type="email"
                    id="email"
                    class="bg-form border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="juan.perez@gmail.com"
                    required
                    />
                </div> 
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-buscabrown">Contraseña</label>
                    <div class="flex flex-row gap-x-2 items-center">
                        <input
                        name="password"
                        value={input.password}
                        onChange={(e) => handleInputChange(e)}
                        type="password" 
                        id="password"
                        class="bg-form border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                        placeholder="•••••••••"
                        required
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer hover:stroke-red-700" onClick={() => showPassword("password")}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>
                <div class="mb-6">
                    <label for="confirmPass" class="block mb-2 text-sm font-medium text-buscabrown">Repetir contraseña</label>
                    <div class="flex flex-row gap-x-2 items-center">
                        <input
                        name="confirmPass"
                        onChange={(e) => setConfirmPass(e.target.value)}
                        type="password" 
                        id="confirmPass"
                        class="bg-form border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                        placeholder="•••••••••"
                        required
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer hover:stroke-red-700" onClick={() => showPassword("confirmPass")}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    {(
                        <div id="passwordsDontMatch" className="modal" class="mb-5 text-red-700 font-bold hidden">
                            <h>Las contraseñas no coinciden</h>
                        </div>
                    )}
                </div>
                <button
                type="submit"
                class="bg-third border-2 border-third text-white hover:bg-orange-700 hover:border-orange-700 rounded-3xl font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center" 
                >Registrarse</button>
            </form>

            <div id="registerModal" className="modal" class="mt-auto text-green-700 font-bold hidden">
                <div>
                    <h3>Registro exitoso!</h3>
                </div>
            </div>
        </div>
    )
};
