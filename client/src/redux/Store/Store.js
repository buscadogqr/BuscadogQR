import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../Reducer/Reducer.js";
import thunk from 'redux-thunk';

const composeEnhancers = 
    (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
    //el thunk es un middleware q permite retrasar el envío de una acción hasta que se cumpla una línea de código asíncrona
);

export default store;
