import { GET_ALL_USERS, GET_ALL_PETS, GET_PET_BY_ID, GET_USER_BY_ID, GET_USER_BY_MAIL, GET_PETS_BY_OWNER, CREATE_PET, CREATE_USER, GET_PRICE, UPDATE_PRICE, UPDATE_PET_DETAILS, UPDATE_USER_DETAILS, DELETE_USER } from "../Actions/ActionTypes.js";

const initialState = {
    users: [],
    pets: [],
    userLogged: {},
    userByMail: {},
    petsByOwner: [],
    petById: {},
    price: 0
};

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_USERS: 
            return {
                ...state,
                users: action.payload
            }

        case GET_ALL_PETS:
            return {
                ...state,
                pets: action.payload
            }

        case GET_PET_BY_ID:
            const petById = state.pets.length && state.pets.find(pet => pet.id == action.payload);

            return {
                ...state,
                petById: petById
            }

        case GET_USER_BY_ID:
            const userById = state.users.length && state.users.find(user => user.id == action.payload);

            return {
                ...state,
                userLogged: userById
            }

        case GET_USER_BY_MAIL:
            const userByMail = state.users.length && state.users.find(user => user.mail == action.payload);

            return {
                ...state,
                userByMail: userByMail
            }

        case GET_PETS_BY_OWNER:
            const pets = state.pets.length && state.pets.filter(pet => pet.userOwner == action.payload);

            return {
                ...state,
                petsByOwner: pets
            }

        case GET_PRICE:
            return {
                ...state,
                price: action.payload
            }

        case UPDATE_PRICE:
            return {
                ...state,
                price: action.payload
            }

        case CREATE_PET:
            return { 
                ...state 
            }
        
        case CREATE_USER: 
            return { 
                ...state 
            }

        case UPDATE_USER_DETAILS: 
            return { 
                ...state 
            }
        
        case UPDATE_PET_DETAILS: 
            return { 
                ...state 
            }

        case DELETE_USER: 
            return { 
                ...state 
            }

        default:
            return { 
                ...state 
            }
    };
};
