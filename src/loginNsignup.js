import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './css/App.css';

const initialsignset = {
  userid: '', password: ''
}

function Login() {
  const [formState, updateformState] = useState(initialsignset)
  
  function onChange(e) {
    e.persist()
    updateformState(() => ({ ...formState, [e.target.name]: e.target.value }))
  }

  function printeverything() {
    if(formState.userid != "" && formState.password != "") {
      var data = {
        id: formState.userid,
        password: formState.password,
      }
      axios.post('https://ocr.min.farm/api/userLogin', data)
      .then(function(response){
        alert(response.data.message);
        if (response.data.login == "True") {
          window.location.replace("https://ocr.min.farm");
        }
      })
      .catch(function(error){
        alert(error);
      });
    }
  }

  return (
    <div className="Login">

    <div className="min-h-screen bg-gray-100 flex items-center">
      <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
        <div className="py-12 p-10 bg-white rounded-xl">
          <div className="mb-6">
            <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">ID</label>
            <input name="userid" type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="User ID" onChange={onChange}/>
          </div>
          <div className="mb-6">
            <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Password</label>
            <input name="password" type="password" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="Password" onChange={onChange}/>
          </div>
          <Link to="/signup" className="text-sm text-gray-700 inline-block mt-4 hover:text-indigo-600 hover:underline hover:cursor-pointer transition duration-200">Sign up</Link>
          <button className="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300" onClick={printeverything}>LOGIN</button>
        </div>
      </div>
    </div>

  </div>
  );
}

export default Login;
