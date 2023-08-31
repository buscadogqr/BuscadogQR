import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import './index.css';
import App from "./App";
import axios from 'axios';
import store from "./Redux/Store/Store.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

axios.defaults.baseURL =	import.meta.env.VITE_APP_API || 'http://localhost:3001';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home"/>}/>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

