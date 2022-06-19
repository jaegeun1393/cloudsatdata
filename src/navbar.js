import React, { Component } from 'react';
import {Auth, Hub} from 'aws-amplify';
import { Link } from "react-router-dom";

import "./css/App.css"

class Navibar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formState: false
    };
  }

  async componentDidMount() {
    try {
        await Auth.currentAuthenticatedUser();
        this.setState({ formState: true })
    } catch {
      this.setState({ formState: false })
     }
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
                <Link to={"/userdashboard"} className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-blue-50 focus:outline-none focus:shadow-none">
                  Dash Board
                </Link>
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
