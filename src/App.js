import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import Login from "./loginNsignup";
import Home from "./Home";
import Signup from "./signup";

import './css/App.css';

function App() {

  return (
    <div>

      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
      </Routes>

  </div>
  )
}

export default App;
