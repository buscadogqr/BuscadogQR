import React from "react";

export const OurStories = () => {
    return (
        <div class="flex flex-col m-16 align-content-center">

            <h1 class="pb-5 text-titles text-3xl font-bold">Nuestras historias</h1>

            <div class="flex flex-col gap-y-10 md:grid md:grid-cols-2 md:gap-x-5 m-5 justify-self-center">
                <div class="bg-gradient-to-r from-third to-orange-700 text-white p-5 md:p-10 rounded-2xl">
                    <h1 class="mb-2 text-xl font-bold">Marilú (Bernal)</h1>
                    <h>¡Gracias a ustedes encontré a Sansón! Es raro que se nos escape, pero pasó ¡Muchas gracias de vuelta!</h>
                </div>
                <div class="bg-gradient-to-r from-orange-700 to-third text-white p-5 md:p-10 rounded-2xl">
                    <h1 class="mb-2 text-xl font-bold">Celeste (Lanús)</h1>
                    <h>Me enteré por ustedes, estaba trabajando y me llegó el aviso ¡Ahora Tor sigue con nosotros!</h>
                </div>
                <div class="bg-gradient-to-r from-third to-orange-700 text-white p-5 md:p-10 rounded-2xl">
                    <h1 class="mb-2 text-xl font-bold">Claudio (Almagro)</h1>
                    <h>Fer se escapó cuando estaba con el paseador, rápidamente pudimos dar con él ¡Gracias es poco!</h>
                </div>
                <div class="bg-gradient-to-r from-orange-700 to-third text-white p-5 md:p-10 rounded-2xl">
                    <h1 class="mb-2 text-xl font-bold">Inés (Morón)</h1>
                    <h>Jackie es la gran compañera de mi madre desde que enviudó. Lo mismo les dije en privado, ¡muchísimas gracias!</h>
                </div>
            </div>
        </div>
    )
};
