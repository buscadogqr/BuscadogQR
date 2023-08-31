import { db } from "../../firebase-config.js";
import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";
import { GET_ALL_USERS, GET_ALL_PETS, GET_PET_BY_ID, GET_USER_BY_ID, GET_USER_BY_MAIL, GET_PETS_BY_OWNER, CREATE_PET, CREATE_USER, GET_PRICE, UPDATE_PRICE, UPDATE_PET_DETAILS, UPDATE_USER_DETAILS, DELETE_USER } from "./ActionTypes.js";

const usersCollectionRef = collection(db, "users");
const petsCollectionRef = collection(db, "pets");
const othersCollectionRef = collection(db, "others");

export const getAllUsers = () => {
    return async (dispatch) => {
        const users = await getDocs(usersCollectionRef);
        const usersInfo = users && users.docs.map(user => ({...user.data(), id: user.id}));

        dispatch({
            payload: usersInfo,
            type: GET_ALL_USERS
        });
    };
};

export const getAllPets = () => {
    return async (dispatch) => {
        const allPets = await getDocs(petsCollectionRef);
        const petsInfo = allPets && allPets.docs.map(user => ({...user.data(), id: user.id}));
        const registeredPets = petsInfo && petsInfo.filter(pet => pet.name);
        const petsToRegister = petsInfo && petsInfo.filter(pet => !pet.name);
        const orderedPets = [...registeredPets, ...petsToRegister];

        dispatch({
            payload: orderedPets,
            type: GET_ALL_PETS
        });
    };
};

export const getPetById = (petId) => {
    return async (dispatch) => {
        dispatch({
            payload: petId,
            type: GET_PET_BY_ID
        });
    };
};

export const getUserById = (userId) => {
    return async (dispatch) => {
        dispatch({
            payload: userId,
            type: GET_USER_BY_ID
        });
    };
};

export const getUserByMail = (userMail) => {
    return async (dispatch) => {
        dispatch({
            payload: userMail,
            type: GET_USER_BY_MAIL
        });
    };
};

export const getPetsByOwner = (userMail) => {
    return async (dispatch) => {
        dispatch({
            payload: userMail,
            type: GET_PETS_BY_OWNER
        });
    };
};

export const createPet = (petInfo) => {
    return async (dispatch) => {
        await addDoc(petsCollectionRef, petInfo);

        dispatch({
            type: CREATE_PET
        });
    };
};

export const createUser = (userInfo) => {
    return async (dispatch) => {
        await addDoc(usersCollectionRef, userInfo);

        dispatch({
            type: CREATE_USER
        });
    };
};

export const updatePetDetails = (pet, newPetDetails) => {
    return async (dispatch) => {
        const petToUpdate = doc(db, "pets", pet);
        await updateDoc(petToUpdate, newPetDetails);

        dispatch({
            type: UPDATE_PET_DETAILS
        });
    };
};

export const updateUserDetails = (user, newUserDetails) => {
    return async (dispatch) => {
        const userToUpdate = doc(db, "users", user);
        await updateDoc(userToUpdate, newUserDetails);

        dispatch({
            type: UPDATE_USER_DETAILS
        });
    };
};

export const delteUser = (userId) => {
    return async (dispatch) => {
        const userDoc = doc(db, "users", userId);
        await deleteDoc(userDoc);

        dispatch({
            type: DELETE_USER
        });
    };
};

export const getPrice = () => {
    return async (dispatch) => {
        const others = await getDocs(othersCollectionRef);
        const price = others && others.docs.map(docum => ({...docum.data(), id: docum.id}));

        dispatch({
            payload: price[0].price,
            type: GET_PRICE
        });
    };
};

export const updatePrice = (newPrice) => {
    return async (dispatch) => {
        const previousPrice = doc(db, "others", "price");
        await updateDoc(previousPrice, newPrice);

        dispatch({
            payload: newPrice,
            type: UPDATE_PRICE
        });
    };
};
