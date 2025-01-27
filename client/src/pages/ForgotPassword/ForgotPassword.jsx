import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/Actions/Actions";

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mail, setMail] = useState("");
    const user = useSelector(state => state.userLogged);
 
    useEffect(() => {
        if(user[0] && user[0].name) {
            localStorage.setItem("userResetName", user && user[0].name);
            localStorage.setItem("userResetId", user && user[0].id);
            navigate("/resetPass");
        }
    }, [user]);

    const showAreYou = (e) => {
        e.preventDefault();

        dispatch(getAllUsers(`?userMail=${mail}`));

        document.getElementById("writeEmail").style.display = "none";
        document.getElementById("areYou").style.display = "block";
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
                {!!user.name && (
                    <div class="flex flex-col gap-y-1">
                        <h class="mb-2 text-2xl text-third font-bold">¿Eres {user.name}?</h>
                        <h><h class="underline underline-offset-4 text-third cursor-pointer" onClick={(e) => settingLS(e)}>Si</h>, soy {user.name}</h>
                        <h><a href="/forgotPass" class="underline underline-offset-4 text-third">No</a>, escribí mal mi mail</h>
                    </div>
                )}

                {!user.name && (
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
