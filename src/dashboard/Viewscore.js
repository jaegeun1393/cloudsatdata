import React, { Component } from 'react';
import axios from "axios";

class Viewscore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      studentname: "Root",
      s_id: "",
      s_name: "",
      sat_real_id: "",
      sat_name: "",
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
    this.ID_replaceHolder = this.ID_replaceHolder.bind(this)
    this.NAME_replaceHolder = this.NAME_replaceHolder.bind(this)
    this.get_info_by_id = this.get_info_by_id.bind(this)
    this.lst_score = this.lst_score.bind(this)
    this.editsat = this.editsat.bind(this)
    this.hiddenmodal = this.hiddenmodal.bind(this)
    this.editanswers = this.editanswers.bind(this)
    this.updateSATscore = this.updateSATscore.bind(this)
  }

  async updateSATscore(section, num) {
    var updated = [];
    var data = {};
    for(let i = 0; i < num; i++) {
      var arrlst = document.getElementById(section + "_" + i);
      updated[i] = arrlst.value;
    }
    var main = document.getElementById(section);
    main.innerHTML = '';

    if (section == "section1") {this.setState({english_answers: updated.join(", ")});}
    else if (section == "section2") {this.setState({writing_answers: updated.join(", ")});}
    else if (section == "section3") {
      for(let i = 0; i < 15; i++) {
        this.setState({math3_answers: this.state.math3_answers + updated[i] + ", "});
      }
      var final_mth3 = this.state.math3_answers.slice(0, -2);
      this.setState({math3_answers: final_mth3});

      for(let i = 15; i < num; i++) {
        this.setState({math31_answers: this.state.math31_answers + updated[i] + ", "});
      }
      var final_mth31 = this.state.math31_answers.slice(0, -2);
      this.setState({math31_answers: final_mth31});
    }
    else if (section == "section4") {
      for(let i = 0; i < 30; i++) {
        this.setState({math4_answers: this.state.math4_answers + updated[i] + ", "});
      }
      var final_mth4 = this.state.math4_answers.slice(0, -2);
      this.setState({math4_answers: final_mth4});

      for(let i = 30; i < num; i++) {
        this.setState({math41_answers: this.state.math41_answers + updated[i] + ", "});
      }
      var final_mth41 = this.state.math41_answers.slice(0, -2);
      this.setState({math41_answers: final_mth41});
    }
      data = {
        sat_id: this.state.sat_name,
        sat_real_id: this.state.sat_real_id,
        section1: this.state.english_answers.toString().replaceAll(" ", "").replaceAll("'", "").replaceAll("[", "").replaceAll("]", ""),
        section2: this.state.writing_answers.toString().replaceAll(" ", "").replaceAll("'", "").replaceAll("[", "").replaceAll("]", ""),
        section3: this.state.math3_answers.toString().replaceAll(" ", "").replaceAll("'", "").replaceAll("[", "").replaceAll("]", ""),
        section31: this.state.math31_answers.toString().replaceAll(" ", "").replaceAll("'", "").replaceAll("[", "").replaceAll("]", ""),
        section4: this.state.math4_answers.toString().replaceAll(" ", "").replaceAll("'", "").replaceAll("[", "").replaceAll("]", ""),
        section41: this.state.math41_answers.toString().replaceAll(" ", "").replaceAll("'", "").replaceAll("[", "").replaceAll("]", "")
      }
      console.log(data);
    this.setState({edit_btn: "block"});

    var self = this
    axios.post('https://ocr.min.farm/api/upload/sat/answer/update', data)
    //axios.post('http://127.0.0.1:5000/upload/sat/answer/update', data)
    .then(function(response){
      self.setState({sat_total_score: "Total SAT Score: " + response.data.sat_total});
      self.setState({sat_sum_score: "English Score: " + response.data.eng_score + " + Math Score: " + response.data.mth_score});
    })
    .catch(function(error){
      alert(error);
    });
  }

  editanswers(section, num) {
    var edited = "";
    this.setState({edit_btn: "none"});
    if (section == "section1") { edited=this.state.english_answers.replaceAll(" ", "").replaceAll(",", "").replaceAll("'", ""); this.setState({english_answers: ""});}
    else if (section == "section2") { edited=this.state.writing_answers.replaceAll(" ", "").replaceAll(",", "").replaceAll("'", ""); this.setState({writing_answers: ""});}
    else if (section == "section3") { 
      var arrlst = this.state.math3_answers.replaceAll(" ", "").replaceAll("'", ""); 
      arrlst = arrlst + "," + this.state.math31_answers.replaceAll(" ", "").replaceAll("'", ""); 
      edited = arrlst.split(',');
      
      this.setState({math3_answers: ""});
      this.setState({math31_answers: ""});
    }
    else if (section == "section4") { 
      var arrlst = this.state.math4_answers.replaceAll(" ", "").replaceAll("'", ""); 
      arrlst = arrlst + "," + this.state.math41_answers.replaceAll(" ", "").replaceAll("'", ""); 
      edited = arrlst.split(',');
      
      this.setState({math4_answers: ""});
      this.setState({math41_answers: ""});
    }    
    var main = document.getElementById(section);

    for(let i = 0; i < num; i++) {
      var input = document.createElement("input");
      input.className = "border bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-400 rounded";
      input.style.width = '40px';
      input.style.margin = '4px';
      input.type = "text";
      input.id = section + "_" + i;
      input.style.float = "left";
      input.value = edited[i];
      main.appendChild(input);
    }

    var btn = document.createElement("button");
    btn.className = "ml-2 w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300";
    btn.innerText = "Send";
    btn.addEventListener("click", () => {
      this.updateSATscore(section, num);
  });
    main.appendChild(btn);
  }

  async editsat(sat_id, sat_name) {
    this.setState({sat_real_id: sat_id});
    this.setState({sat_name: sat_name});
    console.log(this.state.sat_name);
    var data = {
      sat_id: sat_id
    }
    var self = this
    axios.post('https://ocr.min.farm/api/get/sat/score/id', data)
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

  lst_score(data, len, sat_name) {
    var getmain = document.getElementById("sat_result");
    getmain.textContent = '';
    var sat_name_lst = sat_name.split(",");
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
      maintd.innerText = "Edit";
      maintd.addEventListener("click", () => {
        this.editsat(data.sat_id[i], sat_name_lst[i]);
      });    
      maintr.appendChild(maintd);

      getmain.appendChild(maintr);
    } 
  }


  ID_replaceHolder = (e) => {
    this.setState({s_id: e.target.value});
  }

  NAME_replaceHolder = (e) => {
    this.setState({s_name: e.target.value});
  }

  async get_info_by_id() {
    var data = {
      s_id: this.state.s_id
    }
    var self = this
    axios.post('https://ocr.min.farm/api/get/student/info', data)
    //axios.post('http://127.0.0.1:5000/get/student/info', data)
    .then(function(response){
      self.lst_score(response.data, response.data.eng_sc.length, response.data.sat_name.replaceAll("'", "").replace(/\s*,\s*/g, ","));
    })
    .catch(function(error){
      alert(error);
    });
  }
  
  async get_info_by_name() {
    var data = {
      id: this.state.s_name
    }
    var self = this
    axios.post('https://ocr.min.farm/api/get/student/id', data)
    //axios.post('http://127.0.0.1:5000/get/student/id', data)
    .then(function(response){
      alert(response.data.message);
    })
    .catch(function(error){
      alert(error);
    });
  }

  async get_user_name() {
    var self = this
    axios.post('https://ocr.min.farm/api/get_user_name', {})
    .then(function(response){
      self.setState({studentname: response.data.name})
    })
    .catch(function(error){
      alert(error);
    });
  }

  hiddenmodal() {
    this.setState({modal_display: "none"});
  }

  render() {
  return (
    <div>
      <div className='px-3 py-3'>
        <h4 className="text-sm font-bold text-indigo-600">Hi {this.state.studentname}</h4>
        <h1 className="text-4xl font-bold text-indigo-900 mt-">View Score</h1>
      </div>

      <div className='grid gap-2 md:grid-cols-2'>
      <div className="rounded-xl mt-4 p-4 bg-white shadow-lg">
        <h1 className="text-xl font-bold text-gray-800 mt-4">Search student by Student ID</h1>
        <div className="flex justify-between space-x-4 text-center mt-6">
          <div className="py-4 p-4 bg-white rounded-xl">

            <form action="" className="relative mx-auto w-max">
            <input type="search" placeholder='Enter student ID' name="s_id" onChange={this.ID_replaceHolder}
              className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-black focus:pl-16 focus:pr-4" />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-black peer-focus:stroke-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            </form>

          </div>
          <button className="w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300" onClick={() => {this.get_info_by_id()}}>Search</button>
        </div>
      </div>

      <div className="rounded-xl mt-4 p-4 bg-white shadow-lg">
        <h1 className="text-xl font-bold text-gray-800 mt-4">Search student by Login ID</h1>
        <div className="flex justify-between space-x-4 text-center mt-6">
          <div className="py-4 p-4 bg-white rounded-xl">

            <form action="" className="relative mx-auto w-max">
            <input type="search" placeholder='Enter student Name' name="s_name" onChange={this.NAME_replaceHolder}
              className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-black focus:pl-16 focus:pr-4" />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-black peer-focus:stroke-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            </form>

          </div>
          <button className="w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300" onClick={() => {this.get_info_by_name()}}>Search</button>
        </div>
      </div>

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
          <th className="p-3" width="110px">Edit</th>
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
        section 1: {this.state.english_answers}
        <div id="section1"></div>
        <button className="ml-2 w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300" style={{display: this.state.edit_btn}} onClick={()=>{this.editanswers("section1", 52)}}>Edit</button>

	  </div>

    <div className="bg-slate-200 p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter mb-2" style={{width: "auto", height: "auto"}}>
        section 2: {this.state.writing_answers}
        <div id="section2"></div>
        <button className="ml-2 w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300" style={{display: this.state.edit_btn}} onClick={()=>{this.editanswers("section2", 44)}}>Edit</button>
	  </div>

    <div className="bg-slate-200 p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter mb-2"  style={{width: "auto", height: "auto"}}>
        section 3: {this.state.math3_answers} {this.state.math31_answers}
        <div id="section3"></div>
        <button className="ml-2 w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300" style={{display: this.state.edit_btn}} onClick={()=>{this.editanswers("section3", 20)}}>Edit</button>
	  </div>

    <div className="bg-slate-200 p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter mb-2"  style={{width: "auto", height: "auto"}}>
        section 4: {this.state.math4_answers} {this.state.math41_answers}
        <div id="section4"></div>
        <button className="ml-2 w-100 text-indigo-50 font-bold bg-blue-500 py-2 px-3 rounded-md hover:bg-indigo-500 transition duration-300" style={{display: this.state.edit_btn}} onClick={()=>{this.editanswers("section4", 38)}}>Edit</button>
	  </div>

    <button className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={this.hiddenmodal}>Ok</button>
  </div>
</div>

    </div>
  );
  }
}

export default Viewscore;