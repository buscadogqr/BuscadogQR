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
                <div class="mt-5">
                    <label for="mail">Email</label>
                    <input
                        name="mail"
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="mail"
                        class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={user && user.mail}
                    />
                </div>
                <div class="mt-5">
                    <label for="cellphone">Celular</label>
                    <input
                        name="cellphone"
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="cellphone"
                        class="bg-form border border-form text-white outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={user && user.cellphone}
                    />
                </div>
                <div class="mt-5">
                    <label for="direction">Dirección</label>
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
