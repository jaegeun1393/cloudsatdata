import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import Login from "./loginNsignup";
import Home from "./Home";
import Signup from "./signup";
import Downloads from "./Download";
import Uploadsat from "./uploadsat";
import Signout from "./signout";

import './css/App.css';
import { API } from 'aws-amplify';

function App() {
  document.title = "Cloud. SAT";
  useEffect(() => {
    const getData = async () => {
      const data = await API.get('cloudsatapi', '/users/')
      console.log(data);
    }
    getData()
  }, [])

  return (
    <div>

      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/downloads" element={<Downloads />}></Route>
        <Route path="/uploadsat" element={<Uploadsat />}></Route>
        <Route path="/Login" element={<Login />}></Route>

        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/signout" element={<Signout />}></Route>
      </Routes>

  </div>
  )
}

export default App;
