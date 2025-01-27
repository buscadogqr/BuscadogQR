import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modifyUser } from "../../redux/Actions/Actions";

export const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pass, SetPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const userResetName = localStorage.getItem("userResetName");
    const userResetId = localStorage.getItem("userResetId");
    const userLogged = localStorage.getItem("bgUserId");

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

    const resetPass = async (e) => {
        e.preventDefault();
        document.getElementById("passwordsDontMatch").style.display = 'none';

        if(pass === confirmPass) {
            document.getElementById("success").style.display = "block";
            dispatch(modifyUser(`id=${userResetId}&password=${pass}`));
            localStorage.removeItem("userResetName");
            localStorage.removeItem("userResetId");

            setTimeout(() => {
                if(userLogged) navigate("/profile");
                else navigate("/login");
            }, 1000)
        } else {
            document.getElementById("passwordsDontMatch").style.display = 'block';
        }
    };

    return (
        <div class="m-16">
            <h1 class="pb-5 text-titles text-4xl font-bold">{userResetName}, resetea tu contraseña</h1>

            <div class="mt-6">
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-buscabrown">Contraseña</label>
                    <div class="flex flex-row gap-x-2 items-center">
                        <input
                        name="password"
                        onChange={(e) => SetPass(e.target.value)}
                        type="password" 
                        id="password"
                        class="bg-form outline-none border border-form text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
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
                        class="bg-form border border-form outline-none text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                        placeholder="•••••••••"
                        required
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer hover:stroke-red-700" onClick={() => showPassword("confirmPass")}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    {(
                        <div id="passwordsDontMatch" class="mb-5 text-red-700 font-bold hidden">
                            <h>Las contraseñas no coinciden</h>
                        </div>
                    )}

                    {(
                        <div id="success" class="mb-5 text-green-700 font-bold hidden">
                            <h>Cambio exitoso!</h>
                        </div>
                    )}
                </div>

                <button class="text-left text-third outline-none underline underline-offset-4 md:text-black md:decoration-transparent hover:text-third hover:decoration-third hover:underline hover:underline-offset-4" onClick={(e) => resetPass(e)}>Cofirmar cambio de contraseña</button>
            </div>
        </div>
    )
};
