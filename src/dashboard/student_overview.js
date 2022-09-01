import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import axios from "axios";

class Student_overview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      studentname: "Root",
      s_id: "",
      loginstate: false,
      sat_total_score: "Total SAT Score: 1600",
      sat_sum_score: "English Score: 600 + English Score: 600",
      eng_score: "",
      mth_score: "",
      english_answers: "",
      writing_answers: "",
      math3_answers: "",
      math31_answers: "",
      math4_answers: "",
      math41_answers: "",
      modal_display: "none"
    }
    this.get_user_name = this.get_user_name.bind(this)
    this.view_sat = this.view_sat.bind(this)
    this.hiddenmodal = this.hiddenmodal.bind(this)
  }

  hiddenmodal() {
    this.setState({modal_display:"none"});
  }

  view_sat(sat_id) {
    this.setState({modal_display:"block"});    
    var data = {
      sat_id: sat_id
    }
    var self = this
    axios.post('https://cloudsatdata.com/api/get/sat/score/id', data)
    //axios.post('http://127.0.0.1:5000/get/sat/score/id', data)
    .then(function(response){
      if (!response.data.error) {
        self.setState({modal_display: "block"});
        self.setState({sat_total_score: "Total SAT Score: " + response.data.totalscore});
        self.setState({sat_sum_score: "English Score: " + response.data.eng_score + " + Math Score: " + response.data.mth_score});
        self.setState({english_answers: response.data.sat_eng_ans1.replaceAll("'", "")});
        self.setState({writing_answers: response.data.sat_eng_ans2.replaceAll("'", "")});
        self.setState({math3_answers: response.data.sat_mth_ans1.replaceAll("'", "")});
        self.setState({math31_answers: response.data.sat_mth_ans2.replaceAll("'", "")});
        self.setState({math4_answers: response.data.sat_mth_ans3.replaceAll("'", "")});
        self.setState({math41_answers: response.data.sat_mth_ans4.replaceAll("'", "")});
      } else {
        alert(response.data.error)
      }
    })
    .catch(function(error){
      alert(error);
    });
  }

  lst_score(data, len) {
    var getmain = document.getElementById("sat_result");
    getmain.textContent = '';
    for(let i = 0; i < len; i++) {
      var maintr = document.createElement("tr");
      maintr.className = "flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0";

      var maintd = document.createElement("td");
      maintd.className = "border-grey-light border hover:bg-gray-100 p-3";
      maintd.innerText = data.sat_id[i];
      maintr.appendChild(maintd);

      var maintd = document.createElement("td");
      maintd.className = "border-grey-light border hover:bg-gray-100 p-3";
      maintd.innerText = parseInt(data.eng_sc[i]) + parseInt(data.mth_sc[i]);
      maintr.appendChild(maintd);

      var maintd = document.createElement("td");
      maintd.className = "border-grey-light border hover:bg-gray-100 p-3";
      maintd.innerText = data.s_name;
      maintr.appendChild(maintd);

      var maintd = document.createElement("td");
      maintd.className = "border-grey-light border hover:bg-gray-100 p-3";
      maintd.innerText = "Date";
      maintr.appendChild(maintd);

      var maintd = document.createElement("td");
      maintd.className = "border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer";
      maintd.innerText = "View";
      maintd.addEventListener("click", () => {
        this.view_sat(data.sat_id[i]);
      });   
      maintr.appendChild(maintd);


      getmain.appendChild(maintr);
    } 
  }

  async get_user_name() {
    var self = this;

    //axios.post('http://127.0.0.1:5000/student_dashboard_overview', {})
    axios.post('https://cloudsatdata.com/api/student_dashboard_overview', {})
    .then(function(response){
      self.setState({s_id: response.data.s_id});
      self.setState({studentname: response.data.s_name});
      var data = {
        sat_id: response.data.sat_id,
        eng_sc: response.data.eng_sc,
        mth_sc: response.data.mth_sc,
        s_name: response.data.s_name
      }

      self.lst_score(data, response.data.eng_sc.length);
    })
    .catch(function(error){
      alert(error);
    });
  }


  componentDidMount() {   
    this.get_user_name();
  }

  render() {
  return (
    <div>
      <div className='px-3 py-3'>
        <h4 className="text-sm font-bold text-indigo-600">Hi {this.state.studentname}, Student ID: {this.state.s_id}</h4>
        <h1 className="text-4xl font-bold text-indigo-900 mt-">SAT Overview</h1>
      </div>
      
      <div className="rounded-xl mt-4 p-4 bg-white shadow-lg">
        <h1 className="text-xl font-bold text-gray-800 mt-4">Result</h1>
        <div className="justify-between space-x-4 text-center mt-6">
          <div className="py-4 p-4 bg-white rounded-xl">

	<div className="container">
		<table className="w-full sm:bg-white rounded-lg overflow-hidden sm:shadow-lg">
			<thead className="text-white">
				<tr className="bg-indigo-500 flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2">
					<th className="p-3">SAT ID</th>
					<th className="p-3">SAT Total Score</th>
          <th className="p-3">Student Name</th>
          <th className="p-3">Date</th>
          <th className="p-3" width="110px">View</th>
				</tr>
			</thead>

			<tbody className="flex-1 sm:flex-none" id="sat_result">
			</tbody>

		</table>
	</div>

          </div>
        </div>
      </div>

      <div className="modal bg-slate-800 absolute bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-20" style={{display: this.state.modal_display, height: '2500px'}}>
  <div className="bg-white mx-16 my-16 px-16 py-8 rounded-md text-center">
    <h1 className="text-xl mb-4 font-bold text-slate-500">SAT Result</h1>
  	<div className="bg-slate-200 p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter mb-2" id="total_score">
        {this.state.sat_total_score}
	  </div>
    <div className="bg-slate-200 p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter mb-2" id="sum_score">
        {this.state.sat_sum_score}
	  </div>

    <h6>* This is the Manager view *</h6>

    <div className="bg-slate-200 p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter mb-2" style={{width: "auto", height: "auto"}}>
        <div className="text-center">section 1: {this.state.english_answers}</div>
	  </div>

    <div className="bg-slate-200 p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter mb-2" style={{width: "auto", height: "auto"}}>
        section 2: {this.state.writing_answers}
	  </div>

    <div className="bg-slate-200 p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter mb-2"  style={{width: "auto", height: "auto"}}>
        section 3: {this.state.math3_answers} {this.state.math31_answers}
	  </div>

    <div className="bg-slate-200 p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter mb-2"  style={{width: "auto", height: "auto"}}>
        section 4: {this.state.math4_answers} {this.state.math41_answers}
	  </div>

    <button className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={this.hiddenmodal}>Ok</button>
  </div>
</div>

  </div>
  );
  }
}

export default Student_overview;