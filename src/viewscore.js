import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import {Auth} from 'aws-amplify';


import './css/App.css';
import Login from "./loginNsignup";

class Viewscore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginstate: ""
    };
  }

  async componentDidMount() {
    try {
        await Auth.currentAuthenticatedUser();
        this.setState({ loginstate: true })
    } catch {
      this.setState({ loginstate: false })
     }
  }

  render() {
    if (this.state.loginstate === false) return <Navigate to="/Login" />
  return (
    <div className='w-full px-6 pb-12 antialiased bg-white'>
      <div className='container max-w-lg px-4 py-16 mx-auto text-left md:max-w-none md:text-center'>
      <div className='mr-4 text-gray-700 font-bold inline-block mb-2'>Enter the Student ID</div>
        <div className='w-full p-2 bg-white rounded-xl z-10'>
		        <div className="font-semibold">
              <input type="text" className="items-center focus:outline-none border rounded px-2 py-1" placeholder="User Id" />
              <button className=" px-4 py-1 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none">Check</button>

            </div>
    
        </div>
      </div>
    </div>
  );
  }
}

export default Viewscore;
