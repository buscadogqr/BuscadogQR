import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from "./App";
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


axios.defaults.baseURL =	import.meta.env.VITE_APP_API || 'http://localhost:3001';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home"/>}/>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

