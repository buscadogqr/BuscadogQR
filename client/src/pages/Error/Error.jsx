import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../../assets/404.png"

export const Error =  () => {
    return (
        <div class="flex items-center justify-center py-12">
            <div class="flex items-center justify-center md:w-2/3">
                <div class="flex flex-col items-center py-16">
                    <img class="px-4 hidden md:block h-64" src={errorImage}/>
                    <h1 class="px-4 pb-4 text-center text-5xl font-bold leading-10 text-buscabrown">OOPS!</h1>
                    <p class="px-4 pb-5 text-base leading-none text-center text-buscabrown">No pudimos encontrar la página que buscabas</p>
                    <Link to="/home">
                        <button class="mx-4 h-10 w-44 text-white text-base bg-third rounded hover:bg-orange-700">Volver al home</button>
                    </Link>
                </div>
            </div>
        </div>
    )
};
