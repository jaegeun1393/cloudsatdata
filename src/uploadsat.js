import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import {Auth} from 'aws-amplify';


import './css/App.css';
import Login from "./loginNsignup";

class Uploadsat extends Component {

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
    <div>
      { this.state.loginstate === true && (
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
        <form className="mt-8 space-y-3" action="#" method="POST">
                    <div className="grid grid-cols-1 space-y-2">
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    </div>
                                    <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                                </div>
                                <input type="file" className="hidden" />
                            </label>
                        </div>
                    </div>
                            <p className="text-sm text-gray-500">
                                <span>File type: Jpg, and png</span>
                            </p>
                    <div>
                        <button type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                        Upload
                    </button>
                    </div>
        </form>
	</div>
</div>
</section>
      )}
  </div>
  
  );
  }
}

export default Uploadsat;