import { GET_USERS, CREATE_USER, MODIFY_USER, DELETE_USER, LOGIN, LOGOUT, GET_MEMBERS, GET_PETS, FILTERED_PETS, CREATE_PET, MODIFY_PET, DELETE_PET, REGISTERED_PETS, GET_PRICE, MODIFY_PRICE, GET_STATS } from "../Actions/ActionTypes";

const initialState = {
    users: [],
    userLogged: {},
    members: [],
    pets: [],
    filteredPets: [],
    registeredPets: [],
    price: [],
    stats: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }

        case CREATE_USER:
            if(!action.payload.name) {
                return { 
                    ...state, 
                    userLogged: { error: action.payload }
                }
            } else {
                return {
                    ...state,
                    userLogged: action.payload
                }
            }

        case MODIFY_USER:
            return {
                ...state,
                userLogged: action.payload
            }

        case DELETE_USER:
            return {
                ...state,
                userLogged: {}
            }

        case LOGIN:
            return {
                ...state,
                userLogged: action.payload
            }

        case LOGOUT: 
            return {
                ...state,
                userLogged: {}
            }

        case GET_MEMBERS:
            return {
                ...state,
                members: action.payload
            }

        case GET_PETS:
            return {
                ...state,
                pets: action.payload
            }

        case FILTERED_PETS:
            return {
                ...state,
                filteredPets: action.payload
            }

        case CREATE_PET:
            return {
                ...state
            }

        case MODIFY_PET:
            return {
                ...state
            }

        case REGISTERED_PETS:
            return {
                ...state,
                registeredPets: action.payload
            }

        case GET_PRICE:
            return {
                ...state,
                price: action.payload
            }

        case MODIFY_PRICE:
            return {
                ...state
            }

        case GET_STATS:
            return {
                ...state,
                stats: action.payload
            }
        
        default: return { ...state }
    }
}

export default rootReducer;
