import React, { Component } from 'react';
import { Routes, Route, Navigate, Link } from "react-router-dom";
import {Auth} from 'aws-amplify';


import './css/App.css';
import StudentDash from "./dashboard/studentmanagement";

class Dashboard extends Component {

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
    const pathname = window.location.pathname;
  return (
    <div>


<main className="flex w-full h-screen">
<aside className="w-80 h-screen w-fulll hidden sm:block">
  <div className="flex flex-col justify-between h-screen p-4">
      <div className="text-sm">
        <div className="items-center mt-2 justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-blue-50 focus:outline-none focus:shadow-none cursor-pointer">Generate the SAT</div>
        <Link to={`${pathname}/StudentDash`} className="items-center mt-2 justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-blue-50 focus:outline-none focus:shadow-none cursor-pointer">SAT management</Link>
        <div className="items-center mt-2 justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-blue-50 focus:outline-none focus:shadow-none cursor-pointer">Students management</div>
        <div className="items-center mt-2 justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-blue-50 focus:outline-none focus:shadow-none cursor-pointer">Setting</div>
        <div className="items-center mt-2 justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-blue-50 focus:outline-none focus:shadow-none cursor-pointer">Sign Out</div>
      </div>
  </div>
</aside>

<section className="w-full bg-gray-200">
    <Routes>
        <Route path="StudentDash/" element={<StudentDash />}></Route>
      </Routes>
</section>

</main>

  </div>
  
  );
  }
}

export default Dashboard;
