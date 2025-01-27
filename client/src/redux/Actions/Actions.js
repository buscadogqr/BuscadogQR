import { GET_USERS, CREATE_USER, MODIFY_USER, DELETE_USER, LOGIN, LOGOUT, GET_MEMBERS, GET_PETS, FILTERED_PETS, CREATE_PET, MODIFY_PET, DELETE_PET, REGISTERED_PETS, GET_PRICE, MODIFY_PRICE, GET_STATS } from "./ActionTypes";
import axios from "axios";

const url = "https://buscadogqr-api.onrender.com";

export const getAllUsers = (query) => {
    return async (dispatch) => {
        let users;

        if(query) {
            users = await axios.get(`${url}/users${query}`);

            dispatch({
                payload: users.data,
                type: LOGIN
            });

        } else {
            users = await axios.get(`${url}/users`);
            
            dispatch({
                payload: users.data,
                type: GET_USERS
            });
        }

    };
};

export const createUser = (user) => {
    return async (dispatch) => {
        let createdUser = await axios.post(`${url}/users?${user}`);

        dispatch({
            payload: createdUser.data,
            type: CREATE_USER
        });
    };
};

export const modifyUser = (user) => {
    return async (dispatch) => {
        let modifiedUser = await axios.put(`${url}/users?${user}`);

        dispatch({
            payload: modifiedUser.data,
            type: MODIFY_USER
        });
    };
};

export const deleteUser = (userId) => {
    return async (dispatch) => {
        await axios.delete(`${url}/users?userId=${userId}`)
        .then(response => {
            console.log("Registro exitoso:", response.data);
            dispatch({
                type: DELETE_USER
            });
          })
          .catch(error => {
            console.error("Error al registrarse:", error);
          });
    };
};

export const login = (mail, password) => {
    return async (dispatch) => {
        const user = await axios.get(`${url}/users/login?mail=${mail}&password=${password}`);

        dispatch({
            payload: user.data,
            type: LOGIN
        });
    };
};

export const logout = () => {
    return async (dispatch) => {
        dispatch({
            type: LOGOUT
        });
    };
};

export const getMembers = () => {
    return async (dispatch) => {
        const members = axios.get(`${url}/users/members`);

        dispatch({
            payload: members.data,
            type: GET_MEMBERS
        });
    };
};

export const getPets = (query) => {
    return async (dispatch) => {
        if(query) {
            let pets = await axios.get(`${url}/pets${query}`);

            dispatch({
                payload: pets.data,
                type: FILTERED_PETS
            });

        } else {
            let pets = await axios.get(`${url}/pets`)

            dispatch({
                payload: pets.data,
                type: GET_PETS
            });
        }
    };
};

export const createPet = (pet) => {
    return async (dispatch) => {
        await axios.post(`${url}/pets${pet}`);

        dispatch({
            type: CREATE_PET
        });
    };
};

export const modifyPet = (pet) => {
    return async (dispatch) => {
        await axios.put(`${url}/pets${pet}`);

        dispatch({
            type: MODIFY_PET
        });
    };
};

export const getRegisteredPets = () => {
    return async (dispatch) => {
        const registeredPets = axios.get(`${url}/pets/registered`);

        dispatch({
            payload: registeredPets.data,
            type: REGISTERED_PETS
        });
    };
};

export const getPrice = () => {
    return async (dispatch) => {
        const price = await axios.get(`${url}/others/price`);

        dispatch({
            payload: price.data,
            type: GET_PRICE
        });
    };
};

export const modifyPrice = (query) => {
    return async (dispatch) => {
        const newPrice = await axios.put(`${url}/others/price?newPrice=${query}`);

        dispatch({
            payload: newPrice.data,
            type: MODIFY_PRICE
        });
    };
};

export const getStats = () => {
    return async (dispatch) => {
        const stats = axios.get(`${url}/others/stats`);

        dispatch({
            payload: stats.data,
            type: GET_STATS
        });
    };
};
