import React, { Component } from 'react';
import axios from "axios";

import './css/App.css';

class Uploadsat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginstate: "",
      profileImg:'https://static.thenounproject.com/png/643663-200.png',
      imgdata: "",
      sat_id: "",
      s_name: "",
      sat_total_score: "Total SAT Score: 1600",
      sat_sum_score: "English Score: 600 + English Score: 600",
      modal_display: "none",
      english_answers: "",
      writing_answers: "",
      math3_answers: "",
      math31_answers: "",
      math4_answers: "",
      math41_answers: "",
      edit_btn: "block",
      sat_real_id: ""
    };
    this.imageHandler = this.imageHandler.bind(this)
    this.uploadfile = this.uploadfile.bind(this)
    this.inputchange = this.inputchange.bind(this)
    this.inputchange2 = this.inputchange2.bind(this)
    this.hiddenmodal = this.hiddenmodal.bind(this)
    this.editanswers = this.editanswers.bind(this)
    this.updateSATscore = this.updateSATscore.bind(this)
  }

  updateSATscore(section, num) {
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
        sat_id: this.state.sat_id,
        sat_real_id: this.state.sat_real_id,
        s_id: this.state.s_name,
        section1: this.state.english_answers.toString().replaceAll(" ", "").replaceAll("'", "").replaceAll("[", "").replaceAll("]", ""),
        section2: this.state.writing_answers.toString().replaceAll(" ", "").replaceAll("'", "").replaceAll("[", "").replaceAll("]", ""),
        section3: this.state.math3_answers.toString().replaceAll(" ", "").replaceAll("'", "").replaceAll("[", "").replaceAll("]", ""),
        section31: this.state.math31_answers.toString().replaceAll(" ", "").replaceAll("'", "").replaceAll("[", "").replaceAll("]", ""),
        section4: this.state.math4_answers.toString().replaceAll(" ", "").replaceAll("'", "").replaceAll("[", "").replaceAll("]", ""),
        section41: this.state.math41_answers.toString().replaceAll(" ", "").replaceAll("'", "").replaceAll("[", "").replaceAll("]", "")
      }

    this.setState({edit_btn: "block"});

    var self = this
    axios.post('https://cloudsatdata.com/api/upload/sat/answer/update', data)
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

  hiddenmodal() {
    this.setState({profileImg:'https://static.thenounproject.com/png/643663-200.png'});
    this.setState({sat_id: ""});
    var satid = document.getElementById("sat_id");
    satid.value = "";
    this.setState({s_id: ""});
    var sname = document.getElementById("s_name");
    sname.value = "";
    this.setState({modal_display: "none"});
  }

  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        this.setState({profileImg: reader.result})
      }
    }
    reader.readAsDataURL(e.target.files[0]);
    this.setState({imgdata: e.target.files[0]});
  };

  inputchange = (e) => {
    this.setState({sat_id: e.target.value});
  }

  inputchange2 = (e) => {
    this.setState({s_name: e.target.value});
  }

  async uploadfile() {
    if(this.state.imgdata != "" && this.state.sat_id != "" && this.state.s_name != "") {
      const formData = new FormData();
      formData.append("imgurl", this.state.imgdata);
      formData.append("imgname", this.state.imgdata.name);
      formData.append("imgtype", this.state.imgdata.type);
      formData.append("imgsize", this.state.imgdata.size);
      formData.append("s_id", this.state.s_name);
      formData.append("sat_id", this.state.sat_id);

      var self = this
      axios.post('https://cloudsatdata.com/api/uploadimg', formData)
      //axios.post('http://127.0.0.1:5000/uploadimg', formData)
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
          self.setState({sat_real_id: response.data.sat_real_id});
        } else {
          alert(response.data.error)
        }
      })
      .catch(function(error){
        alert(error);
      });
    } else {
      alert("Please check the missing blank.");
    }
  }

  render() {
    const { profileImg } = this.state
  return (
    <div>

<div className="modal bg-slate-800 absolute bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-20" style={{display: this.state.modal_display, height: '2500px'}}>
  <div className="bg-white mx-16 my-16 px-16 py-8 rounded-md text-center">
    <h1 className="text-xl mb-4 font-bold text-slate-500">SAT Result</h1>
  	<div className="bg-slate-200 p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter mb-2" id="total_score">
        {this.state.sat_total_score}
	  </div>
    <div className="bg-slate-200 p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter mb-2" id="sum_score">
        {this.state.sat_sum_score}
	  </div>

    <h6>* Please double check the answer *</h6>

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

    <h6>For more detail and edit the answer, please visit the Dash board</h6>
    <button className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={this.hiddenmodal}>Ok</button>
  </div>
</div>

     <section className="w-full px-6 pb-10 antialiased bg-white">
     <div className="relative min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gray-10 bg-no-repeat bg-cover relative items-center">
	<div className="absolute inset-0 z-0"></div>
	<div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
		<div className="text-center">
			<h2 className="mt-5 text-3xl font-bold text-gray-900">
				File Upload!
			</h2>
			<p className="mt-2 text-sm text-gray-400">Upload the picture of the SAT answersheet.</p>
		</div>
    <img src={profileImg} alt="" className="flex items-center m-auto"/>

    <h5>Enter SAT ID:</h5>
    <input type="text" id="sat_id" name="sat_id" className="border bg-gray-100 outline-none w-full focus:ring-2 focus:ring-indigo-400 rounded" placeholder='SAT_#1' onChange={this.inputchange}/>

    <h5>Enter Student ID:</h5>
    <input type="text" id="s_name" name="s_name" className="border bg-gray-100 outline-none w-full focus:ring-2 focus:ring-indigo-400 rounded" placeholder='Ex). 44477' onChange={this.inputchange2}/>

        <form className="mt-8 space-y-3" action="#">
                    <div className="grid grid-cols-1 space-y-2">
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                                    <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                                </div>
                                <input type="file" accept=".png, .jpg" name="file" className="hidden"  onChange={this.imageHandler}/>
                            </label>
                        </div>
                    </div>
                            <p className="text-sm text-gray-500">
                                <span>File type: jpg, png ONLY</span>
                            </p>
                    <div>
                        <button type="button" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                                    onClick={this.uploadfile}>
                        Upload
                    </button>
                    </div>
        </form>
	</div>
</div>
</section>

  </div>
  );
  }
}

export default Uploadsat;
