import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, updateDoc, doc, getDoc } from "firebase/firestore";

export const ExtendMembership = () => {
    const navigate = useNavigate();
    const userLogged = localStorage.getItem("userId");
    const petToExtend = localStorage.getItem("petToExtend");
    const { months } = useParams();
    
    const extending = (async () => {

        const userInfo = doc(db, "users", userLogged);
        const userData = await getDoc(userInfo);
        const user = userData.data();

        const petInfo = doc(db, "pets", petToExtend);
        const petData = await getDoc(petInfo);
        const pet = petData.data();

        let membershipToExtend = user && user.memberships.find(memb => memb.pet === pet.name);
        const pastMemberships = user && user.memberships.filter(memb => memb.pet !== pet.name);

        //setting the new expiration date + adding the new months
        let [ day, month, year ] = membershipToExtend.expiration.split("-");
        let monthsToGo = 0;
        let membership = {};

        for(let i = 0; i <= Number(months); i++) {
            if(Number(month) <= 12) month = Number(month) + 1;
            else {
                ++monthsToGo;
            }
        }

        if(monthsToGo) {
           membership = {
                acquired: membershipToExtend && membershipToExtend.acquired,
                expiration: `${day}-${monthsToGo}-${++year}`,
                pet: pet && pet.name,
                months: membershipToExtend && Number(membershipToExtend.months) + Number(months),
                status: "Up to date"
            }
        }
        else {
            membership = {
                acquired: membershipToExtend && membershipToExtend.acquired,
                expiration: `${day}-${month}-${year}`,
                months: membershipToExtend && Number(membershipToExtend.months) + Number(months),
                status: "Up to date"
            }
        }
    
        //updating the new membership to the user's memberships
        updateDoc(userInfo, { memberships: [ ...pastMemberships, membership ] })
        .then(data => {
            navigate("/pets")
        });
    });

    const confirmed = () => {
        setTimeout(async () => {
            await extending();
            navigate("/pets");
        }, 5000)
    }

    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <div class="flex m-16">
            {!userLogged && goToLogin}

            <h class="pb-5 text-titles text-4xl font-bold">Confirmando la extensión de tu suscripción...</h>
            { confirmed() }
        </div>
    )
};
