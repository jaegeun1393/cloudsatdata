import React, { Component } from 'react';
import axios from "axios";

import './css/App.css';

class Viewscore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      student_id: ""
    };
    this.onChangesid = this.onChangesid.bind(this);
    this.checksatscore = this.checksatscore.bind(this);
  }

  onChangesid = (e) => {
    this.setState({student_id: e.target.value});
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

      getmain.appendChild(maintr);
    } 
  }

  async checksatscore() {
    if (this.state.student_id != "") {
      var data = {
        s_id: this.state.student_id
      }
      var self = this
      axios.post('https://cloudsatdata.com/api/get/student/info', data)
      //axios.post('http://127.0.0.1:5000/get/student/info', data)
      .then(function(response){
        self.lst_score(response.data, response.data.eng_sc.length);
      })
      .catch(function(error){
        alert(error);
      });
    }
  }

  render() {
  return (
    <div className='w-full px-6 pb-12 antialiased bg-white'>
      <div className='container max-w-lg px-4 py-4 mx-auto text-left md:max-w-none md:text-center'>
      <div className='mr-4 text-gray-700 font-bold inline-block mb-2'>Enter the Student ID</div>
        <div className='w-full p-2 bg-white rounded-xl z-10'>
		        <div className="font-semibold">
              <input name="student_id" className="items-center focus:outline-none border rounded px-2 py-1" placeholder="User Id" onChange={this.onChangesid}/>
              <button className=" px-4 py-1 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none" onClick={this.checksatscore}>Check</button>

            </div>
    
        </div>
      </div>

      <div className="rounded-xl p-4 bg-white shadow-lg">
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
				</tr>
			</thead>

			<tbody className="flex-1 sm:flex-none" id="sat_result">
			</tbody>

		</table>
	</div>

          </div>
        </div>
      </div>
    </div>
  );
  }
}

export default Viewscore;
