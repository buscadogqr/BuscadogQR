import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPrice } from "../../Redux/Actions/Actions";

export const About = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { price } = useSelector(state => state);
    const userLogged = localStorage.getItem("email");

    useEffect(() => {
        dispatch(getPrice());
    }, []);

    const goToRegister = (e) => {
        e.preventDefault();

        navigate("/register");
    };

    const contact = (e) => {
        e.preventDefault();

        navigate("/contact");
    };

    return (
        <div class="mx-10 mt-5 mb-5">
            <h1 class="mt-8 mb-10 text-buscabrown font-extrabold text-[32px] sm:text-[40px] lg:text-[36px] xl:text-[40px]">NOSOTROS</h1>
            <div class="flex flex-row gap-x-5 m-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 md:w-6 md:h-6 mt-1 stroke-third">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                </svg>
                <h3 class="text-third text-2xl font-bold">¿Qué es BuscadogQR?</h3>
            </div>
            
            <h class="m-4 text-justify">BuscadogQR es una plataforma que permite ubicar a nuestras mascotas cuando se pierden.</h>

            <div class="flex flex-row gap-x-1 m-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mt-5 stroke-third">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
                <h3 class="text-third text-2xl font-bold m-4 mb-1">¿Cómo funciona?</h3>
            </div>

            <h class="m-4 md:text-justify sm:text-left">Te proporcionamos una chapita con un código QR único que va ubicado en el collar de tu mascota. Ese código, al ser escaneado por la persona que encuentre a tu mascota, va a dirigirla a una página que tenga la información necesaria para contactarte (nombre, domicilio, celular, mail). Una vez escaneado, podrán contactarse con vos.</h>

            <div class="flex flex-row gap-x-1 m-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mt-5 stroke-third">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
                <h3 class="text-third text-2xl font-bold m-4 mb-1">Costos</h3>
            </div>

            <h class="m-4 md:text-justify sm:text-left">La chapita con el código QR tiene un costo de ${price}, esto incluye el costo del mantenimiento de la página. El envío del mismo puede estar sujeto a costos adicionales. Ante cualquier duda, por favor <button class="text-orange-600 hover:underline hover:underline-offset-4" onClick={(e) => contact(e)}>contactanos</button>.</h>
            <br/>
            
            { !userLogged && (<div>
                <h3 class="text-third text-xl font-bold mt-10 m-4 mb-0">¿Qué esperas para suscribirte?</h3>
                <h3 class="text-third text-xl font-bold m-4 mt-0 mb-5">¡<button onClick={(e) => goToRegister(e)} class="text-orange-600 hover:underline hover:underline-offset-4">Unite</button> a la comunidad de BuscadogQR!</h3>
            </div>)}
        </div>
    )
};
