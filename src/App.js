import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import Logsign from "./loginNsignup";
import Home from "./Home";

import './css/App.css';

function App() {

  return (
    <div>

      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/Logsign" element={<Logsign />}></Route>
      </Routes>

  </div>
  )
}

export default App;
