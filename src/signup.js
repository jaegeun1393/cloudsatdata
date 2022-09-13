import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import './css/App.css';

function Signup() {
  const [email, setemail] = useState('')
  const [uname, setuname] = useState('')
  const [pswd, setpswd] = useState('')

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

    if (email.length < 4 && error == false) {
      alert("Email is less than 8")
      error = true
    }

    if (error == false) {
      var data = {
        name: name,
        password: password,
        id: email
      }

      axios.post('https://ocr.min.farm/api/updateacc', data)
      //axios.post('http://127.0.0.1:5000/updateacc', data)
      .then(function(response){
        alert(response.data.success);
        window.location.replace("https://ocr.min.farm");
      })
      .catch(function(error){
        alert(error);
      });
     }
  }


  return (
    <div className="Signup">

      <div className="min-h-screen bg-gray-100 flex items-center">
        <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
          <div className="py-12 p-10 bg-white rounded-xl">
            <div className="mb-6">
              <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Name</label>
              <input type="name" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="First and Last name" value={uname} onInput={e => setuname(e.target.value)}/>
            </div>
            <div className="mb-6">
              <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">ID</label>
              <input type="id" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="ID" value={email} onInput={e => setemail(e.target.value)}/>
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

  </div>
  );
}

export default Signup;
