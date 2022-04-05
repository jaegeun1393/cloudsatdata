import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import './css/App.css';
import { Storage } from 'aws-amplify';
function Downloads() {

  async function downoadpdf() {
    try {
      await Storage.get("mmt_sat_paper.png", {
        level: "public",
        progressCallback(progress) {
          console.log(`Downloaded: ${progress.loaded}/${progress.total}`);
      }
      });
    } catch(error) {
      alert(error)
    }
  
  }

  return (
  <div>

<section className="w-full bg-white">

    <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row">
            <div className="relative w-full bg-cover lg:w-6/12 xl:w-7/12 bg-gradient-to-r from-white via-white to-gray-100">
                <div className="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0">
                    <div className="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
                        <div className="relative">
                            <p className="mb-2 font-medium text-gray-700 uppercase">Download the preset Document</p>
                            <h2 className="text-5xl font-bold text-gray-900 xl:text-6xl">We will help you work smarter</h2>
                        </div>
                        <p className="text-2xl text-gray-700">Scan the document with the official pdf file provide by us. You can download wihtout signin.</p>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white lg:w-6/12 xl:w-5/12">
                <div className="flex flex-col items-start justify-start w-full h-full p-10 lg:p-16 xl:p-24">
                    <h4 className="w-full text-3xl font-bold">Download</h4>
                    <p className="text-lg text-gray-500">Share this to everyone!</p>
                    <div className="relative w-full mt-10 space-y-8">
                        <div className="relative">
                            <button className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease" onClick={downoadpdf}>Download PDF</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</section>

<section className="py-20">
  <div className="container items-center max-w-6xl px-4 px-10 mx-auto sm:px-20 md:px-32 lg:px-16">
    <div className="flex flex-wrap items-center -mx-3">
      <div className="order-1 w-full px-3 lg:w-1/2 lg:order-0">
        <div className="w-full lg:max-w-md">
          <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl font-heading">Helps to reduce the waiting time for students.</h2>
          <p className="mb-4 font-medium tracking-tight text-gray-400 xl:mb-6">You can easily build the student's study pathway!</p>
          <ul>
            <li className="flex items-center py-2 space-x-4 xl:py-3">
              <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
              <span className="font-medium text-gray-500">Faster Processing and Delivery</span>
            </li>
            <li className="flex items-center py-2 space-x-4 xl:py-3">
              <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              <span className="font-medium text-gray-500">Out of the Box Tracking and Monitoring</span>
            </li>
            <li className="flex items-center py-2 space-x-4 xl:py-3">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              <span className="font-medium text-gray-500">100% Protection and Security for Your App</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0"><img className="mx-auto sm:max-w-sm lg:max-w-full" src="https://cdn.devdojo.com/images/november2020/feature-graphic.png" alt="feature image" /></div>
    </div>
  </div>
</section>

  </div>
  )
}

export default Downloads;
