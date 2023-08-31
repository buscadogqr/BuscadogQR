import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserByMail } from "../../Redux/Actions/Actions";

export const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mail, setMail] = useState("");
    const [user, setUser] = useState("");
    const { userByMail } = useSelector(state => state);

    const showAreYou = async (e) => {
        e.preventDefault();

        dispatch(getUserByMail(mail))
        .then(() => {
            setUser(userByMail);
        })

        document.getElementById("writeEmail").style.display = "none";
        document.getElementById("areYou").style.display = "block";
    };

    const settingLS = (e) => {
        e.preventDefault();
    
        localStorage.setItem("userResetName", user && user.name);
        localStorage.setItem("userResetId", user && user.id);
        navigate("/resetPass");
    };

    return (
        <div class="m-16">
            <div>
                <h1 class="pb-5 text-titles text-4xl font-bold">¿Olvidaste tu contraseña?</h1>
                <h>¡No te preocupes! Recordanos el mail con el que te registraste:</h>
            </div>

            <div class="mt-10 flex flex-col md:flex-row gap-x-5 gap-y-5" id="writeEmail">
                <input
                name="mail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                type="email"
                id="email"
                class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="juan.perez@gmail.com"
                required
                />
                <button class="bg-third p-2 rounded-2xl text-white hover:bg-orange-700" onClick={(e) => showAreYou(e)}>Continuar</button>
            </div>

            <div class="hidden mt-10" id="areYou">
                {user && (
                    <div class="flex flex-col gap-y-1">
                        <h class="mb-2 text-2xl text-third font-bold">¿Eres {user && user.name}?</h>
                        <h><h class="underline underline-offset-4 text-third cursor-pointer" onClick={(e) => settingLS(e)}>Si</h>, soy {user && user.name}</h>
                        <h><a href="/forgotPass" class="underline underline-offset-4 text-third">No</a>, escribí mal mi mail</h>
                    </div>
                )}

                {!user && (
                    <div class="flex flex-col gap-y-5">
                        <h>Hmm, lamentamos informarte que no tenemos ningun usuario registrado con el mail <h class="text-third">{mail}</h></h>
                        <a href="/forgotPass" class="flex flex-row gap-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-third cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            <h class="text-third">Volver atrás</h>
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
};
