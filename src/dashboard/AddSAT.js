import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import axios from "axios";

class AddSAT extends Component {

  constructor(props) {
    super(props);
    this.state = {
      studentname: "Root",
      loginstate: false,
      sid: "",
      vsid: "",
      rslst: [],
      satname: "",
      section1: "",
      section2: "",
      section3: "",
      section31: "",
      section4: "",
      section41: "",
      grading1: "",
      grading2: "",
      grading3: ""
    }
    this.genrand = this.genrand.bind(this)
    this.get_user_name = this.get_user_name.bind(this)
    this.checking = this.checking.bind(this)
    this.submit_sat = this.submit_sat.bind(this)
    this.check_scale = this.check_scale.bind(this)
    this.chenagetitle = this.chenagetitle.bind(this)
  }

  chenagetitle = (e) => {
    this.setState({satname: e.target.value});
  }

  genrand = () => {
    const min = 10000;
    const max = 99999;
    const rand = min + Math.random() * (max - min);
    this.setState({ sid: Math.round(rand)})
  }

  async get_user_name() {
    var self = this
    axios.post('https://cloudsatdata.com/api/get_user_name', {})
    .then(function(response){
      self.setState({studentname: response.data.name})
    })
    .catch(function(error){
      alert(error);
    });
  }

  async submit_sat() {
    var check_lst = ["eng1_", "eng2_", "mth1_", "mth2_", "sat1", "sat2", "sat3"]
    var num_lst = [52, 44, 15, 30, 59, 53, 45]
    var pas = true
    for(let i = 0; i < 7; i++) {
      if ( i > 0 && i < 4) {
        if(this.checking(check_lst[i], num_lst[i], 1) == false) {
          pas = false
        }
      } else {
        if(this.check_scale(check_lst[i], num_lst[i], 1) == false) {
          pas = false
        }
      }
    }

    if (pas == false) {
      alert("Please doublecheck everything is checked.");
    } else {
      var self = this
      var data = {
        satname: this.state.satname,
        section1: this.state.section1,
        section2: this.state.section2,
        section3: this.state.section3,
        section31: this.state.section31,
        section4: this.state.section4,
        section41: this.state.section41,
        grading1: this.state.grading1,
        grading2: this.state.grading2,
        grading3: this.state.grading3
      }
      axios.post('https://cloudsatdata.com/api/addsat', data)
      //axios.post('http://127.0.0.1:5000/addsat', data)
      .then(function(response){
        alert(response.data.success)
      })
      .catch(function(error){
        alert(error);
      });
    }
  }

  checking(e_id, num, state) {
    let pas = true;
    for(let i = 0; i < num; i++) {
      var ans = document.getElementById(e_id + i);
      if(e_id == "eng1_" || e_id == "eng2_" || e_id == "mth1_" || e_id == "mth2_") {
        if (ans.value == "A" || ans.value == "B" || ans.value == "C" || ans.value == "D") {
          if (e_id == "eng1_") {this.state.section1 = this.state.section1 + ans.value + ",";}
          if (e_id == "eng2_") {this.state.section2 = this.state.section2 + ans.value + ",";}
          if (e_id == "mth1_") {this.state.section3 = this.state.section3 + ans.value + ",";}
          if (e_id == "mth2_") {this.state.section4 = this.state.section4 + ans.value + ",";}
          pas = "pass"
        } else {
          pas = false;
        }
      }
    }
    
    if (state == 0) {
      if (pas == false) {alert("Please double check all inputs are correct."); return false}
      else if(pas == "pass" && e_id == "eng1_") {alert("section1 clear"); return true}
      else if(pas == "pass" && e_id == "eng2_") {alert("section2 clear"); return true}
      else if(pas == "pass" && e_id == "mth1_") {alert("section3 clear"); return true}
      else if(pas == "pass" && e_id == "mth2_") {alert("section4 clear"); return true}
    } else {
      if (pas == false) { return false}
      if(pas == "pass" && e_id == "eng1_") { return true}
      else if(pas == "pass" && e_id == "eng2_") { return true}
      else if(pas == "pass" && e_id == "mth1_") { return true}
      else if(pas == "pass" && e_id == "mth2_") { return true}  
    }
  }

  check_scale(e_id, num, state) {
    let pas = true;
    for(let i = 0; i < num; i++) {
      var ans = document.getElementById(e_id + i);
      if(e_id == "sat1" || e_id == "sat2" || e_id == "sat3") {
        if (ans.value != "") {
          if (e_id == "sat1") {this.state.grading1 = this.state.section1 + ans.value + ",";}
          if (e_id == "sat2") {this.state.grading2 = this.state.grading2 + ans.value + ",";}
          if (e_id == "sat3") {this.state.grading3 = this.state.grading3 + ans.value + ",";}
          pas = "pass"
        } else {
          pas = false;
        }
      }
    }
    
    if (state == 0) {
      if (pas == false) {alert("Please double check all inputs are correct."); return false}
      else if(pas == "pass" && e_id == "sat1") {alert("Math Section Score clear"); return true}
      else if(pas == "pass" && e_id == "sat2") {alert("Reading Test Score clear"); return true}
      else if(pas == "pass" && e_id == "sat3") {alert("Writing and Langunage Test Score clear"); return true}
    } else {
      if (pas == false) { return false}
      if(pas == "pass" && e_id == "sat1") { return true}
      else if(pas == "pass" && e_id == "sat2") { return true}
      else if(pas == "pass" && e_id == "sat3") { return true}     
    }
  }

  create_eng1() {
    var main = document.getElementById("en1");
    
    for(let i = 0; i < 52; i++) {
      var input = document.createElement("input");
      input.className = "border bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-400 rounded";
      input.style.width = '20px'
      input.style.margin = '4px'
      input.type = "text";
      input.id = "eng1_" + i;
      input.maxLength = 1;
      input.style.float = "left"
      main.appendChild(input);
    }
  }

  create_eng2() {
    var main = document.getElementById("en2");
    
    for(let i = 0; i < 44; i++) {
      var input = document.createElement("input");
      input.className = "border bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-400 rounded";
      input.style.width = '20px'
      input.style.margin = '4px'
      input.type = "text";
      input.id = "eng2_" + i;
      input.maxLength = 1;
      input.style.float = "left"
      main.appendChild(input);
    }
  }

  create_mth1() {
    var main = document.getElementById("mth1");
    
    for(let i = 0; i < 15; i++) {
      var input = document.createElement("input");
      input.className = "border bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-400 rounded";
      input.style.width = '20px'
      input.style.margin = '4px'
      input.type = "text";
      input.id = "mth1_" + i;
      input.maxLength = 1;
      input.style.float = "left"
      main.appendChild(input);
    }

    var main = document.getElementById("mth11");
    
    for(let i = 0; i < 5; i++) {
      var input = document.createElement("input");
      input.className = "border bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-400 rounded";
      input.style.width = '100px'
      input.style.margin = '4px'
      input.type = "text";
      input.id = "mth11_" + i;
      input.style.float = "left"
      main.appendChild(input);
    }
  }

  create_mth2() {
    var main = document.getElementById("mth2");
    
    for(let i = 0; i < 30; i++) {
      var input = document.createElement("input");
      input.className = "border bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-400 rounded";
      input.style.width = '20px'
      input.style.margin = '4px'
      input.type = "text";
      input.id = "mth2_" + i;
      input.maxLength = 1;
      input.style.float = "left"
      main.appendChild(input);
    }

    var main = document.getElementById("mth22");
    
    for(let i = 0; i < 8; i++) {
      var input = document.createElement("input");
      input.className = "border bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-400 rounded";
      input.style.width = '100px'
      input.style.margin = '4px'
      input.type = "text";
      input.id = "mth21_" + i;
      input.style.float = "left"
      main.appendChild(input);
    }
  }

  create_grading_scale() {
    var main = document.getElementById("sat_scale1");
    for(let i = 0; i < 59; i++) {
      var input = document.createElement("input");
      input.className = "border bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-400 rounded";
      input.style.width = '40px'
      input.style.margin = '4px'
      input.type = "text";
      input.id = "sat1" + i;
      input.maxLength = 3;
      input.style.float = "left"
      main.appendChild(input);
    }

    var main = document.getElementById("sat_scale2");
    for(let i = 0; i < 53; i++) {
      var input = document.createElement("input");
      input.className = "border bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-400 rounded";
      input.style.width = '40px'
      input.style.margin = '4px'
      input.type = "text";
      input.id = "sat2" + i;
      input.maxLength = 3;
      input.style.float = "left"
      main.appendChild(input);
    }

    var main = document.getElementById("sat_scale3");
    for(let i = 0; i < 45; i++) {
      var input = document.createElement("input");
      input.className = "border bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-400 rounded";
      input.style.width = '40px'
      input.style.margin = '4px'
      input.type = "text";
      input.id = "sat3" + i;
      input.maxLength = 3;
      input.style.float = "left"
      main.appendChild(input);
    }
  }

  componentDidMount() {   
    this.get_user_name();
    this.create_eng1();
    this.create_eng2();
    this.create_mth1();
    this.create_mth2();
    this.create_grading_scale();
  }

  render() {
  return (
    <div>
      <div className='px-3 py-3'>
        <h4 className="text-sm font-bold text-indigo-600">Hi {this.state.studentname}</h4>
        <h1 className="text-4xl font-bold text-indigo-900 mt-">Add SAT</h1>
      </div>

      <div className="px-4">
      <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
        <h1 className="text-xl font-bold text-gray-800 mt-4">Set SAT Title</h1>
        <div className="flex justify-between space-x-4 text-center mt-6">

        <div className="p-2 bg-white rounded-xl">
          <input type="text" className="border bg-gray-100 outline-none w-20 focus:ring-2 focus:ring-indigo-400 rounded" onChange={this.chenagetitle}/>
        </div>
        </div>
      </div>

        <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
          <h1 className="text-xl font-bold text-gray-800 mt-4">English Reading</h1>
          <div className="flex justify-between space-x-4 text-center mt-6">

            <div className="py-4 p-4 bg-white rounded-xl" id="en1">
            </div>
            <button className="w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300" onClick={() => {this.checking("eng1_", 52, 0)}}>Check</button>
          </div>
        </div>

      <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
        <h1 className="text-xl font-bold text-gray-800 mt-4">English Writing</h1>
        <div className="flex justify-between space-x-4 text-center mt-6">

        <div className="py-4 p-4 bg-white rounded-xl" id="en2">
        </div>
        <button className="w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300" onClick={() => {this.checking("eng2_", 44, 0)}}>Check</button>
        </div>
      </div>

      <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
        <h1 className="text-xl font-bold text-gray-800 mt-4">Math w/o Calculator</h1>
        <h6>If the question has multiple answers, please put "|" every answer.</h6>
        <h6>Ex). 10/2|5 means 10/2 or 5</h6>
        <div className="flex justify-between space-x-4 text-center mt-6">

        <div className="py-4 p-4 bg-white rounded-xl" id="mth1">
        </div>

        <div className="py-4 p-4 bg-white rounded-xl" id="mth11">
        </div>
        <button className="w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300" onClick={() => {this.checking("mth1_", 15, 0)}}>Check</button>
        </div>
      </div>

      <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
        <h1 className="text-xl font-bold text-gray-800 mt-4">Math w Calculator</h1>
        <h6>If the question has multiple answers, please put "|" every answer.</h6>
        <h6>Ex). 10/2|5 means 10/2 or 5</h6>
        <div className="flex justify-between space-x-4 text-center mt-6">

        <div className="py-4 p-4 bg-white rounded-xl" id="mth2">
        </div>

        <div className="py-4 p-4 bg-white rounded-xl" id="mth22">
        </div>
        <button className="w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300" onClick={() => {this.checking("mth2_", 30, 0)}}>Check</button>
        </div>
      </div>
    </div>

    <div className='px-3 py-3'>
        <h1 className="text-4xl font-bold text-indigo-900 mt-">Add SAT Grade Scale</h1>
      </div>

      <div className="px-4">
      <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
        <h1 className="text-xl font-bold text-gray-800 mt-4">Math Section Score</h1>
        <div className="flex justify-between space-x-4 text-center mt-6">

        <div className="py-4 p-4 bg-white rounded-xl" id="sat_scale1">
        </div>
        <button className="w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300" onClick={() => {this.check_scale("sat1", 59, 0)}}>Check</button>
        </div>
      </div>

        <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
        <h1 className="text-xl font-bold text-gray-800 mt-4">Reading Test Score</h1>
        <div className="flex justify-between space-x-4 text-center mt-6">

        <div className="py-4 p-4 bg-white rounded-xl" id="sat_scale2">
        </div>
        <button className="w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300" onClick={() => {this.check_scale("sat2", 53, 0)}}>Check</button>
        </div>
      </div>

      <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
        <h1 className="text-xl font-bold text-gray-800 mt-4">Writing and Langunage Test Score</h1>
        <div className="flex justify-between space-x-4 text-center mt-6">

        <div className="py-4 p-4 bg-white rounded-xl" id="sat_scale3">
        </div>
        <button className="w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300" onClick={() => {this.check_scale("sat3", 45, 0)}}>Check</button>
        </div>
      </div>

      <button className="w-100 mt-4 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300" style={{float: 'right'}} onClick={() => {this.submit_sat()}}>Register</button>
    </div>
  </div>
  
  );
  }
}

export default AddSAT;