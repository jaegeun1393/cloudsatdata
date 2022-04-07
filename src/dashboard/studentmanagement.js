import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import {Auth} from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Studentlst } from '../models';

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

  async componentDidMount() {
    try {
        await Auth.currentAuthenticatedUser();
        this.setState({ loginstate: true })
    } catch {
      this.setState({ loginstate: false })
     }
  }

  genrand = () => {
    const min = 10000;
    const max = 99999;
    const rand = min + Math.random() * (max - min);
    this.setState({ sid: Math.round(rand)})
  }

  async updatestudent() {
    try {
      if (this.state.studentname == "" || this.state.sid == "") {
        alert("Missing student's name or Id number.")
      } else {
        await DataStore.save(
          new Studentlst({
          "name": this.state.studentname,
          "sid": this.state.sid,
          "tid": Auth.user.attributes.email
            })
          );

          this.setState({ studentname: ""})
          this.setState({ sid: ""})
        }
      } catch(error) {
        alert(error)
      }
  }

  async searchstudent() {
    try {
      this.setState({ rslst: []})
      let find = false
      const models = await DataStore.query(Studentlst);
      for(let i = 0; i < models.length; i++) {
        if(Auth.user.attributes.email == models[i].tid) {
          if(String(this.state.vsid) == String(models[i].sid)) {
            find = true
            this.state.rslst.push(models[i].name);
          }
        }
      }

      if (find == false) {alert("Enter the sudent's id again.")} else {
        var main = document.getElementById("studentlst");
        main.className = "w-full"
        for(let i = 0; i < this.state.rslst.length; i++) {
          var ele = document.createElement("div");
          ele.className = "border-2 border-black-500 rounded-lg font-bold text-black px-4 py-3 transition duration-300";
          ele.innerText = "Name: " + this.state.rslst[i];

          var lview = document.createElement("button");
          lview.className = "btn float-right bg-blue-500 rounded-lg font-bold px-4 py-1 transition text-white text-right";
          lview.innerText = "View";

          var rbtn = document.createElement("button");
          rbtn.addEventListener("click", this.removestudent);
          rbtn.className = "btn float-right bg-blue-500 rounded-lg font-bold px-4 py-1 transition text-white text-right";
          rbtn.innerText = "Remove";

          main.appendChild(ele);
          main.appendChild(lview);
          main.appendChild(rbtn);
        }
      }
    } catch(error) {
      alert(error)
    }
  }

  async removestudent() {
    const modelToDelete = await DataStore.query(Studentlst, c =>
      c.sid("eq", String(this.state.vsid))
    );
    console.log(modelToDelete);
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
            <input name="studentname" type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="First and Last Name" onChange={e => this.setState({ studentname: e.target.value})} defaultValue={this.state.studentname}/>
          </div>
          <div className="mb-6 flex flex-1 items-center">
            <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Student ID</label>
            <input name="studentid" type="number" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="Student ID" onChange={this.handleChange} value={this.state.sid} readOnly/>
            <button onClick={this.genrand} className="w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300">Generate</button>
          </div>
          <button className="w-full mt-6 text-indigo-50 font-bold bg-blue-500 py-3 rounded-md hover:bg-indigo-500 transition duration-300" onClick={this.updatestudent}>Register</button>
        </div>

        </div>
      </div>

      <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
      <h1 className="text-xl font-bold text-gray-800 mt-4">Search students</h1>
        <div className="flex flex-col justify-between space-x-8">
        <div className="py-12 p-10 bg-white rounded-xl">
        <div className="mb-6 flex flex-1 items-center">
            <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Student ID</label>
            <input name="studentid" type="number" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="Student ID" onChange={e => this.setState({ vsid: e.target.value})}/>
            <button onClick={this.searchstudent} className="w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-blue-700 transition duration-300">Search</button>
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

{/* <div className="py-12 p-10 bg-white rounded-xl">
<div className="mb-6 flex flex-1 items-center">
  <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Student Name</label>
  <input name="studentname" type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="First and Last Name" defaultValue={this.state.rsname}/>
  <button className="w-100 text-indigo-50 font-bold bg-indigo-600 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300">Search</button>

</div>
<div className="mb-6 flex flex-1 items-center">
  <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Student ID</label>
  <input name="rsid" type="number" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="Student ID" defaultValue={this.state.rsid} onChange={e => this.setState({ rsid: e.target.value})}/>
  <button onClick={this.searchstudent} className="w-100 text-indigo-50 font-bold bg-indigo-600 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300">Search</button>
</div>
</div> */}