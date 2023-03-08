import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddMore = () => {
    const userLogged = localStorage.getItem("email");
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);
    const [months, setMonths] = useState(0);

    const goToLogin = () => {
        navigate("/login");
    };

    const count = (numbMonths) => {
        setMonths(numbMonths);

        document.getElementById("amount").style.display = "none";
    };

    const goOn = (e) => {
        e.preventDefault();

        if(document.getElementById("months").style.display === "block") document.getElementById("months").style.display = "none";
        else document.getElementById("months").style.display = "block";
         
    };

    const goOnMonths = (e) => {
        e.preventDefault();
        
        document.getElementById("amount").style.display = "block";

        if(months > 0) {
            const equation = Number(months) * 300;
            setAmount(equation);
        }

        else setAmount(0);
         
    };

    return (
        <div class="m-16 flex flex-col">

            {!userLogged && goToLogin()}

            <h1 class="pb-5 text-titles text-4xl font-bold">Extendé tu suscripción</h1>
            <h>¡Nos alegra que consideres extender tu suscripción a nuestra comunidad!</h>
            <h>Antes de continuar, te recordamos los costos del servicio:</h>
            <div class="container mx-auto px-2 pt-4 pb-12 text-gray-800">
                <div class="w-full mb-4">
                <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <div class="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
                <div class="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg z-10">
                    <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                    <div class="w-full p-8 text-3xl font-bold text-center">Costo mensual</div>
                    <div class="h-1 w-full gradient my-0 py-0 rounded-t"></div>
                    <ul class="w-full text-center text-base font-bold">
                        <li class="border-b py-4">Mantenimiento</li>
                    </ul>
                    </div>
                    <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                    <div class="w-full pt-6 text-4xl font-bold text-center">
                        $300
                        <span class="text-base"> ($10 por día)</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <button class="self-center text-white bg-third border-2 border-third rounded-3xl font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-orange-700 hover:border-orange-700 cursor-pointer" onClick={(e) => goOn(e)}>Extender suscripción</button>

            <div class="self-center mt-20 mb-10 w-fit hidden" id="months">
                <p>¿Por cuántos meses querés extender tu suscripción?</p>
                <div class="flex flex-row gap-x-5 content-center mt-5">
                    <select name="cars" id="cars" class="rounded-3xl" onChange={(e) => count(e.target.value)}>
                        <option value="1">1 mes</option>
                        <option value="3">3 meses</option>
                    </select>
                    <button class="text-white bg-third border-2 border-third rounded-3xl font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-orange-700 hover:border-orange-700 h-fit mt-5" onClick={(e) => goOnMonths(e)}>Continuar</button>
                </div>

                <div id="amount" class="hidden">
                    <p class="self-center mb-10 mt-5">${amount}</p>
                    {amount == 300 && (
                        <a href="https://mpago.la/21E8pq2" target="_blank" class="self-center text-white bg-third border-2 border-third rounded-3xl font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-orange-700 hover:border-orange-700 cursor-pointer mt-10">Avanzar con la extensión</a>
                    )}
                    {amount == 900 && (
                        <a href="https://mpago.la/1vHkhGJ" target="_blank" class="self-center text-white bg-third border-2 border-third rounded-3xl font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-orange-700 hover:border-orange-700 cursor-pointer mt-10">Avanzar con la extensión</a>
                    )}
                </div>
            </div>
        </div>
    )
};
