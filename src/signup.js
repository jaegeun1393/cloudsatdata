import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {API} from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Users } from './models';

import Login from "./loginNsignup";

import './css/App.css';

function onCreate(username, id, pswd) {
  let error = false
  if (username.length < 4) {
    alert("Name is too short!")
    error = true
  }

  if (id.length < 4 && error == false) {
    alert("ID is too short!")
    error = true
  }

  if (pswd.length < 8 && error == false) {
    alert("Password is less than 8")
    error = true
  }

  if (error == false) {
    DataStore.save(
      new Users({
		    "name": username,
		    "LoginID": id,
		    "pswd": pswd
	    })
    );
    return true
  }
}

function Signup() {
  const navigate = useNavigate();
  const [uname, setuname] = useState('')
  const [uid, setuid] = useState('')
  const [pswd, setpswd] = useState('')

  function redirect(name, id, pwd) {
    if(onCreate(name, id, pwd) == true) {
      navigate('/Login');
    }
  }

  return (
    <div className="Signup">

    <div className="min-h-screen bg-gray-100 flex items-center">
      <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
        <div className="py-12 p-10 bg-white rounded-xl">
        <div className="mb-6">
            <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Name</label>
            <input type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="First, Last Name" value={uname} onInput={e => setuname(e.target.value)}/>
          </div>
          <div className="mb-6">
            <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">ID</label>
            <input type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="User ID" value={uid} onInput={e => setuid(e.target.value)}/>
          </div>
          <div className="mb-6">
            <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Password</label>
            <input type="password" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="Password" value={pswd} onInput={e => setpswd(e.target.value)}/>
          </div>
          <button className="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300" onClick={()=>redirect(uname, uid, pswd)}>Register</button>
        </div>
      </div>
    </div>

  </div>
  );
}

export default Signup;
