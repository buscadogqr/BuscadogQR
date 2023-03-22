import React from "react";
import { useNavigate } from "react-router-dom";

export const Subscribe = () => {
    const userLogged = localStorage.getItem("email");
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <div class="m-16 flex flex-col">

            {!userLogged && goToLogin()}

            <h1 class="pb-5 text-titles text-4xl font-bold">Suscribirte</h1>
            <h>¡Nos alegra que consideres unirte a nuestra comunidad!</h>
            <h>Antes de continuar con la suscripción, te recordamos los costos del servicio:</h>
            <div class="container mx-auto px-2 pt-4 pb-12 text-gray-800">
                <div class="w-full mb-4">
                <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <div class="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
                <div class="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg z-10">
                    <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                    <div class="w-full p-8 text-3xl font-bold text-center">Collar con código QR</div>
                    <div class="h-1 w-full gradient my-0 py-0 rounded-t"></div>
                    <ul class="w-full text-center text-base font-bold">
                        <li class="border-b py-4">Collar + mantenimiento de la página</li>
                    </ul>
                    </div>
                    <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                    <div class="w-full pt-6 text-4xl font-bold text-center">
                        $2000
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <a href="https://mpago.la/1MMC4PL" target="_blank" class="self-center text-white bg-third border-2 border-third rounded-3xl font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-orange-700 outline-none hover:border-orange-700 cursor-pointer mt-10">Quiero suscribirme</a>
        </div>
    )
};
