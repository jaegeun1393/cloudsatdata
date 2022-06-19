import React, { Component } from 'react';
import { Navigate } from "react-router-dom";

class StudentDash extends Component {

  constructor(props) {
    super(props);
    this.state = {
      studentname: "",
      loginstate: "",
      sid: "",

      vsid: "",
      rslst: []
    }
    this.updatestudent = this.updatestudent.bind(this)
    this.searchstudent = this.searchstudent.bind(this)
    this.removestudent = this.removestudent.bind(this)
  }

  genrand = () => {
    const min = 10000;
    const max = 99999;
    const rand = min + Math.random() * (max - min);
    this.setState({ sid: Math.round(rand)})
  }

  render() {
    if (this.state.loginstate === false) return <Navigate to="/Login" />
  return (
    <div>
      <div className='px-3 py-3'>
        <h4 className="text-sm font-bold text-indigo-600">Hi Andrei,</h4>
        <h1 className="text-4xl font-bold text-indigo-900 mt-">Student management</h1>
      </div>

      <div className="flex space-x-4 px-4">
      <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
        <h1 className="text-xl font-bold text-gray-800 mt-4">Add student</h1>
        <div className="flex justify-between space-x-4 text-center mt-6">

        <div className="py-12 p-10 bg-white rounded-xl">
          <div className="mb-6 flex flex-1 items-center">
            <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Student Name</label>
            <input name="studentname" type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="First and Last Name" defaultValue={this.state.studentname}/>
          </div>
          <div className="mb-6 flex flex-1 items-center">
            <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Student ID</label>
            <input name="studentid" type="number" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="Student ID" value={this.state.sid} readOnly/>
            <button className="w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300">Generate</button>
          </div>
          <button className="w-full mt-6 text-indigo-50 font-bold bg-blue-500 py-3 rounded-md hover:bg-indigo-500 transition duration-300">Register</button>
        </div>

        </div>
      </div>

      <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
      <h1 className="text-xl font-bold text-gray-800 mt-4">Search students</h1>
        <div className="flex flex-col justify-between space-x-8">
        <div className="py-10 p-10 bg-white rounded-xl">
        <div className="mb-6 flex flex-1 items-center">
            <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Student ID</label>
            <input name="studentid" type="number" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="Student ID"/>
            <button className="w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-blue-700 transition duration-300">Search</button>
          </div>
        </div>
      </div>
      <div id='studentlst'>

      </div>

      </div>

    </div>
  </div>
  
  );
  }
}

export default StudentDash;