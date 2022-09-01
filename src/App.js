import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import Nav from './navbar';
import Login from "./loginNsignup";
import Home from "./Home";
import Signup from "./signup";
import Downloads from "./Download";
import Uploadsat from "./uploadsat";
import Signout from "./signout";
import Dashboard from "./dashboard";
import Dashboard_student from "./dashboard_student";
import AddSAT from "./dashboard/AddSAT";
import Student_overview from "./dashboard/student_overview";
import Viewscore from "./viewscore";

import './css/App.css';



function App() {
  document.title = "Cloud. SAT";

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/downloads" element={<Downloads />}></Route>
        <Route path="/uploadsat" element={<Uploadsat />}></Route>
        <Route path="/userdashboard" element={<Dashboard />}>
          <Route path=":AddSAT" element={<AddSAT />}>
          </Route>
        </Route>
        <Route path="/userdashboard_student" element={<Dashboard_student />}>
          <Route path=":Student_overview" element={<Student_overview />}>
          </Route>
        </Route>
        <Route path="/viewscore" element={<Viewscore />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/signout" element={<Signout />}></Route>
      </Routes>

  </div>
  )
}

export default App;
