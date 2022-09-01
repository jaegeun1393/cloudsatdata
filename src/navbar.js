import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/App.css"

class Navibar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formState: false,
      role:""
    };
    this.checkloginsession = this.checkloginsession.bind(this)
    this.set_role = this.set_role.bind(this)
  }

  async set_role() {
    var self = this
    if (this.state.formState == true) {
      //axios.post('https://cloudsatdata.com/api/get_user_role', {})
      axios.post('http://127.0.0.1:5000/get_user_role', {})
      .then(function(response){
        self.setState({role: response.data.role});
      })
      .catch(function(error){
        alert(error);
      });
    }
  }

  async checkloginsession() {
    var self = this
    //axios.post('https://cloudsatdata.com/api/userchecklogin', {})
    axios.post('http://127.0.0.1:5000/userchecklogin', {})
    .then(function(response){
      if(response.data.message == "True") {
        self.setState({formState: true});
        self.set_role();
      }
    })
    .catch(function(error){
      alert(error);
    });
  }

  componentDidMount() {   
    this.checkloginsession();
  }

  render() {
  return (
    <div>
      <header className="navbar-header">
        <section className="relative w-full px-8 text-gray-700 bg-white body-font">
          <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
            <Link to={"/"} className="relative z-10 flex items-center w-auto text-2xl font-extrabold leading-none text-black select-none">
              <a style={{color:"#5A79B6"}}>Cloud.</a> SAT</Link>

            <nav className="top-0 left-0 z-0 flex items-center justify-center w-full h-full py-5 -ml-0 space-x-5 text-base md:-ml-5 md:py-0 md:absolute">
            <Link to={"/uploadsat"} className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900" x-data="{ hover: false }">
              <span className="block">Upload</span>
            </Link>
            
            <Link to={"/viewscore"} className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900" x-data="{ hover: false }">
                <span className="block">View</span>
            </Link>

            <Link to={"/downloads"} className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900" x-data="{ hover: false }">
                <span className="block">Download</span>
            </Link>
            </nav>
            {
              this.state.formState === false && (
                <div className="relative z-10 inline-flex items-center space-x-3 md:ml-5 lg:justify-end">
                <Link to={"/Login"} className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none">
                  Login
                </Link>
              </div>
              )
            }
            {
              this.state.formState === true && (
                <div className="relative z-10 inline-flex items-center space-x-3 md:ml-5 lg:justify-end">
                <Link to={"/signout"} className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none">
                  Sign Out
                </Link>
                {
                  this.state.role === "student" && (
                    <Link to={"/userdashboard_student"} className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-blue-50 focus:outline-none focus:shadow-none">
                    Student Dash Board
                  </Link>
                  )
                }
                {
                  this.state.role === "manager" && (
                    <Link to={"/userdashboard"} className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-blue-50 focus:outline-none focus:shadow-none">
                    Manager Dash Board
                  </Link>
                  )
                }
              </div>         
              )
            }

          </div>
        </section>

      </header>
    </div>
  );
  }
}

export default Navibar;
