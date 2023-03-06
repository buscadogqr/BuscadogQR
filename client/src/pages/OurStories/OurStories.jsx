import React from "react";
import perroConDueño from "../../assets/perroConDueño.jpg";

export const OurStories = () => {
    return (
        <div class="flex flex-col mt-16 align-content-center">

            <h1 class="pb-5 text-titles text-3xl font-bold ml-10">Nuestras historias</h1>

            <div class="flex content-center mb-20">
                <div class="py-10 text-white flex flex-col gap-y-10 mb-10">
                    <div class="bg-gray-400 self-start p-5 w-9/12 h-32 rounded-r-full text-left">
                        <h1 class="text-titles mb-2 text-xl font-bold">Marilu (Bernal)</h1>
                        <h>¡Gracias a ustedes encontré a Sansón! Es raro que se nos escapé, pero pasó ¡Muchas gracias de vuelta!</h>
                    </div>
                    <div class="bg-gray-400 self-start p-5 w-9/12 h-32 rounded-r-full text-left">
                        <h1 class="text-titles mb-2 text-xl font-bold">Celeste (Lanús)</h1>
                        <h>Me enteré por ustedes, estaba trabajando y me llegó el aviso ¡Ahora Tor sigue con nosotros!</h>
                    </div>
                    <div class="bg-gray-400 self-start p-5 w-9/12 h-32 rounded-r-full text-left">
                        <h1 class="text-titles mb-2 text-xl font-bold">Claudio (Almagro)</h1>
                        <h>Fer se escapó cuando estaba con el paseador, rápidamente pudimos dar con él ¡Gracias es poco!</h>
                    </div>
                    <div class="bg-gray-400 self-start p-5 w-9/12 h-32 rounded-r-full text-left">
                        <h1 class="text-titles mb-2 text-xl font-bold">Inglés (Morón)</h1>
                        <h>Jackie es la gran compañera de mi madre desde que enviudó. Lo mismo les dije en privado, ¡muchísimas gracias!</h>
                    </div>
                </div>

                <img src={perroConDueño} alt="Foto de perro con su dueño" class="h-screen w-9/12 rounded-l-full self-center"/>
            </div>

        </div>
    )
};
