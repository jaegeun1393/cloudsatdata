import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {Auth, Hub} from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Users } from './models';

import './css/App.css';

const sigstate = {
  form: 'signup'
}

function Signup() {
  const navigate = useNavigate();
  const [email, setemail] = useState('')
  const [uname, setuname] = useState('')
  const [pswd, setpswd] = useState('')
  const [verficode, setverficode] = useState('')
  const [formState, updateformState] = useState(sigstate)

  async function onCreate(name, password, email) {
    let error = false
    if (name.length < 4) {
      alert("Name is too short!")
      error = true
    }

    if (password.length < 8 && error == false) {
      alert("Password is less than 8")
      error = true
    }

    if (email.length < 8 && error == false) {
      alert("Email is less than 8")
      error = true
    }
  
    if (error == false) {
      var username = email
      try {
      await Auth.signUp({ username, password, attributes: { name, email }})
      updateformState(() => ({ ...formState, form: "confirm" }))
      } catch(error) {
        let text = String(error)
        alert(error)

        let result = text.includes("email already");
        console.log(result);
        if (result) {
          await Auth.resendSignUp(username);
          updateformState(() => ({ ...formState, form: "confirm" }))
        }
      }
      //navigate('/Login');
    }
  }

  async function verficatehuman(code) {
    var username = email
    try {
      await Auth.confirmSignUp(username, code);
      navigate('/Login');
    } catch(error) {
      alert(error);
      alert("Re send the verification code.");
      await Auth.resendSignUp(username);
    }
  }

  const { form } = formState
  return (
    <div className="Signup">
      {
        form === "signup" && (
          <div className="min-h-screen bg-gray-100 flex items-center">
          <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
            <div className="py-12 p-10 bg-white rounded-xl">
              <div className="mb-6">
                <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Name</label>
                <input type="name" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="First and Last name" value={uname} onInput={e => setuname(e.target.value)}/>
              </div>
              <div className="mb-6">
                <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Email</label>
                <input type="Email" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="Email" value={email} onInput={e => setemail(e.target.value)}/>
              </div>
              <div className="mb-6">
                <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Password</label>
                <input type="password" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="Password" value={pswd} onInput={e => setpswd(e.target.value)}/>
              </div>
              <Link to="/Login" className="text-sm text-gray-700 inline-block mt-4 hover:text-indigo-600 hover:underline hover:cursor-pointer transition duration-200">Go back to Login</Link>
              <button className="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300" onClick={()=>onCreate(uname, pswd, email)}>Register</button>
            </div>
          </div>
        </div>
        )
      }
      {
        form === "confirm" && (
          <div className="min-h-screen bg-gray-100 flex items-center">
          <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
            <div className="py-12 p-10 bg-white rounded-xl">
              <div className="mb-6">
                <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Verfication Code</label>
                <input type="verficode" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="Verfication code" value={verficode} onInput={e => setverficode(e.target.value)}/>
              </div>
              <button className="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300" onClick={()=>verficatehuman(verficode)}>Confirm</button>
            </div>
          </div>
        </div>
        )
      }

  </div>
  );
}

export default Signup;
