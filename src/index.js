// import React from 'react';
// import ReactDOM from 'react-dom/client'; // Updated import
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AdminPage from "./AdminPage";
// import App from './App';
// import './index.css';
// import reportWebVitals from './reportWebVitals';
// import Students from './Students';

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/admin" element={<AdminPage />} />
//       <Route path="/admin/student" element={<Students />} />

//     </Routes>
//   </BrowserRouter>
// );

// reportWebVitals();
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const rootContainer = document.getElementById("root");

const root = ReactDOM.createRoot(rootContainer);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
