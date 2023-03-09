import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { db } from "../../firebase-config.js";
import { collection, updateDoc, doc, getDoc } from "firebase/firestore";

export const ExtendMembership = () => {
    const navigate = useNavigate();
    const userLogged = localStorage.getItem("userId");
    const petToExtend = localStorage.getItem("petToExtend");
    const petsCollectionRef = collection(db, "pets");
    const { months } = useParams();
    
    const handleSubmit = (async e => {
        e.preventDefault();

        const userInfo = doc(db, "users", userLogged);
        const userData = await getDoc(userInfo);
        const user = userData.data();

        const membershipToExtend = user && user.memberships.find(memb => memb.pet === petToExtend);
        const pastMemberships = user && user.memberships.filter(memb => memb.pet !== petToExtend);
        
        // const todayDate = new Date();
        // const newDate = new Date();
        // newDate.setMonth(newDate.getMonth() + Number(months));
        // const acquired = todayDate.getDate() + "-" + (todayDate.getMonth() + months) + "-" + todayDate.getFullYear();
        // const expiration = newDate.getDate() + "-" + (newDate.getMonth() + months) + "-" + newDate.getFullYear();
    
        // addDoc(petsCollectionRef, { userOwner: user.mail, name: input.name, age: input.age, breed: breedAnimal, photo, notes: input.notes })
        // .then(async data => {
        //     if(user.memberships && user.memberships.length) {
        //         await updateDoc(userCr,  { type: "Usuario con membresías", memberships: [...user.memberships, { acquired, expiration, months: months, status: "Up to date", pet: input.name }] });
        //         navigate('/pets');
        //     } else {
        //         await updateDoc(userCr,  { type: "Usuario con membresías", memberships: [{ acquired, expiration, months: months, status: "Up to date", pet: input.name }] });
        //         navigate('/pets');
        //     }
        // })
    });

    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <div class="flex m-16">
            {!userLogged && goToLogin}

            <h class="pb-5 text-titles text-4xl font-bold">Confirmando la extensión de tu membresía...</h>
        </div>
    )
};
