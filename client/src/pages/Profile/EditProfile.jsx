import React,  {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { db } from "../../firebase-config.js";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export const EditProfile = () => {
    const userLogged = localStorage.getItem("userId");
    const [inputs, setInputs] = useState({
        name: "",
        surname: "",
        cellphone: "",
        direction: "",
        mail: ""
    });
    const usersCollectionRef = collection(db, "users");
    const [user, setUser] = useState([]);
    const [imageSelected, setImageSelected] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const users = await getDocs(usersCollectionRef);
            const usersInfo = users && users.docs.map(user => ({...user.data(), id: user.id}));
            const user = usersInfo && usersInfo.find(user => user.id === userLogged);
            setUser(user);
        };

        getUser();
    }, []);

    const handleInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    };

    const submitChanges = async (e) => {
        document.getElementById("confirmMsg").style.display = "block";

        if(imageSelected) {
            e.preventDefault();
        
            const formData = new FormData();
            formData.append("file", imageSelected);
            formData.append("upload_preset", "yhp17atl");
        
            await axios.post("https://api.cloudinary.com/v1_1/dtm9ibgrj/image/upload", formData)
            .then(async response => {
                const profilePic = response.data.secure_url;
                const user = doc(db, "users", userLogged);
        
                let updatedUser1 = {}
        
                for(let i in inputs) {
                    if(inputs[i] && inputs[i] !== "") {
                        updatedUser1 = {...updatedUser1, [i]: inputs[i] }
                    }
                };
        
                await updateDoc(user, {...updatedUser1, profilePic})
                .then(data => {
                    inputs.mail && localStorage.setItem("email", inputs.mail);
                    navigate('/profile');
                })
            });
        } else {
            const user = doc(db, "users", userLogged);
        
            let updatedUser2 = {}
    
            for(let i in inputs) {
                if(inputs[i] && inputs[i] !== "") {
                    updatedUser2 = {...updatedUser2, [i]: inputs[i] }
                }
            };

            updateDoc(user, updatedUser2)
            .then(data => {
                setTimeout( () => {
                    inputs.mail && localStorage.setItem("email", inputs.mail)
                    navigate('/profile');
                }, 1500)
            });
        }
    };

    const goToLogin = () => {
        navigate("/login");
    };

    const goBack = (e) => {
        e.preventDefault();

        navigate("/profile");
    };

    return (
        <div class="flex flex-col gap-y-5 justify-center m-20 mt-10 items-center">

            {!userLogged && goToLogin()}

            <div class="flex flex-row gap-x-2 self-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:stroke-amber-400 cursor-pointer" onClick={(e) => goBack(e)}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <h>Volver a mi perfil</h>
            </div>

            <div class="flex flex-col">
                <h1 class="text-titles text-2xl font-bold">Editar mi perfil</h1>
                <div class="mt-5">
                    <label for="profilePic">Foto de perfil</label>
                    <input
                        name="profilePic"
                        onChange={(e) => setImageSelected(e.target.files[0])}
                        type="file"
                        id="profilePic"
                        class="bg-form border border-form outline-none text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
               
                <div class="mt-5">
                    <label for="name">Nombre</label>
                    <input
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="name"
                        class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={user && user.name}
                    />
                </div>
                <div class="mt-5">
                    <label for="surname">Apellido</label>
                    <input
                        name="surname"
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="surname"
                        class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={user && user.surname}
                    />
                </div>
                <div class="flex flex-row gap-x-5 mt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <input
                        name="mail"
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="mail"
                        class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={user && user.mail}
                    />
                </div>
                <div class="flex flex-row gap-x-5 mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <input
                        name="cellphone"
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="cellphone"
                        class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={user && user.cellphone}
                    />
                </div>
                <div class="flex flex-row gap-x-5 mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <input
                        name="direction"
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="direction"
                        class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={user && user.direction}
                    />
                </div>

                <button class="p-3 bg-third border-2 border-third rounded-3xl outline-none hover:bg-orange-700 hover:border-orange-700 text-white mt-10 cursor-pointer" onClick={(e) => submitChanges(e)}>Confirmar cambios</button>
                <h class="p-3 mt-2 text-green-700 hidden" id="confirmMsg">Confirmando cambios...</h>

            </div>
        </div>
    )
};
