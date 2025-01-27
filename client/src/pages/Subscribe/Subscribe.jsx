import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPrice } from "../../redux/Actions/Actions";

export const Subscribe = () => {
    const dispatch = useDispatch();
    let price = useSelector(state => state.price);

    useEffect(() => {
        !price.length && dispatch(getPrice());
    }, [dispatch]);

    return (
        <div class="m-16 flex flex-col">

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
                    <div class="w-full p-8 text-3xl font-bold text-center">Chapita con código QR para collar</div>
                    </div>
                    <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                    <div class="w-full pt-6 text-4xl font-bold text-center">
                        ${price.length && price[0]}
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <h>Para continuar con la suscripción, ponte en <a href="mailto:buscadogqr@gmail.com" target="_blank" class="text-third hover:underline hover:underline-offset-4 hover:text-orange-700 cursor-pointer mt-10">contacto</a> con nosotros. Coordinaremos la forma de pago y un lugar de entrega.</h>
        </div>
    )
};
