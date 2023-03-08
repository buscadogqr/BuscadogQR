import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

export const Login = () => {
    const [input, setInput] = useState({email: "", password: ""});
    const navigate = useNavigate();
    const usersCollectionRef = collection(db, "users");
    
    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const showPassword = () => {
        const tipo = document.getElementById("password");
        
        if(tipo.type == "password") tipo.type = "text";
        else tipo.type = "password";     
    };

    const goToProfile = async (e) => {
        e.preventDefault();

        const users = await getDocs(usersCollectionRef);
        const usersInfo = users && users.docs.map(user => ({...user.data(), id: user.id}));
        const user = usersInfo && usersInfo.find(user => user.mail === input.email);

        document.getElementById("nombre").style.display = "none";
        document.getElementById("contra").style.display = "none";

        if(!user) {
            document.getElementById("nombre").style.display = "block";
        }

        else if(user && user.password !== input.password) {
            document.getElementById("contra").style.display = "block";
        }
         
        else {
            setTimeout(() => {
                localStorage.setItem("email", input.email);
                localStorage.setItem("userId", user.id);
                navigate("/profile");
            })
        }
    };

    const goToRegister = (e) => {
        e.preventDefault();

        navigate("/register");
    };

    const forgotPass = (e) => {
        e.preventDefault();

        navigate("/forgotPass");
    };

    return (
        <form class="bg-white p-10">
            <h1 class="pb-5 text-buscabrown text-2xl font-bold">Iniciar sesión</h1>
            <label for="input-group-1" class="block mb-2 text-sm font-medium text-buscabrown">Email</label>
            <div class="flex flex-col">
                <div class="flex content-center">
                    <span class="inline-flex items-center px-3 text-sm text-gray-300 bg-form border border-r-0 border-gray-300 rounded-l-md dark:text-gray-300 dark:border-gray-600">
                        ✉
                    </span>
                    <input
                    type="text"
                    id="input-group-1"
                    name="email"
                    value={input.email}
                    onChange={(e) => handleInputChange(e)}
                    class="rounded-none rounded-r-lg bg-form border text-white focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="nombre@gmail.com"
                    required
                    />
                </div>
                <h id="nombre" class="text-red-700 hidden">Mail incorrecto</h>
            </div>
            <label for="website-admin" class="block mb-2 text-sm font-medium text-buscabrown mt-6">Contraseña</label>
            <div class="flex flex-col">
                <div class="flex content-center">
                    <span class="inline-flex items-center px-3 text-sm text-gray-300 bg-form border border-r-0 border-gray-300 rounded-l-md dark:text-gray-300 dark:border-gray-600">
                        🔒︎
                    </span>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    value={input.password}
                    onChange={(e) => handleInputChange(e)}
                    class="rounded-none rounded-r-lg bg-form border text-white focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="•••••••••"
                    required
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-2 w-6 h-6 cursor-pointer ml-2 hover:stroke-red-700" onClick={showPassword}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <h id="contra" class="text-red-700 hidden">Contraseña incorrecta</h>

                <h class="mt-5 text-sm">¿Todavía no te registraste? <button onClick={(e) => goToRegister(e)} class="underline underline-offset-4 text-third">Sumate</button> a la comunidad de BuscadogQR!</h>
                <h class="mt-2 text-sm">¿Olvidaste tu contraseña? <button onClick={(e) => forgotPass(e)} class="underline underline-offset-4 text-third">Recuperala</button></h>
            </div>
            
            <button
                class="mt-6 bg-third border-2 border-third text-white hover:bg-orange-700 hover:border-orange-700 rounded-3xl font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer"
                onClick={e => goToProfile(e)}
                disabled={!input.email && !input.password}
                >Inicia sesión</button>
        </form>

    )
};
