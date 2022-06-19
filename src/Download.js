import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import './css/App.css';
import { Storage } from 'aws-amplify';

function Downloads() {

  const pdffile = () => 
    async() => {
      await Storage.get("mmt_sat_paper.png", {
        level: "public",
        download: true
      });
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
                            <a href="https://drive.google.com/file/d/1A4Tgcucr66VSDphkhwaoyvH4iNLkKoQY/view?usp=sharing" className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease">Download PDF</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</section>

<div className="full-row flex full-col gap-5 items-center justify-center bg-white py-40">

  <card className="border-gray-300 border-2 rounded-xl w-[30rem] py-7 px-5">
    <div className="grid grid-cols-6 gap-3">
      
      <div className="col-span-2">
        <img src="https://events.duolingo.com/images/why_global.svg" />
      </div>

      <div className="col-span-4">
        <p className="text-gray-700 font-bold"> You can get the result anywhere! </p>
        <p className="text-gray-500 mt-4"> Just grab the smartphone and enter the student ID code! </p>
      </div>

    </div>
  </card>

  <card className="border-gray-300 border-2 rounded-xl w-[30rem] py-7 px-5">
    <div className="grid grid-cols-6 gap-3">
      
      <div className="col-span-4">
        <p className="text-gray-700 font-bold"> See where you are </p>
        <p className="text-gray-500 mt-4"> Gain confidence and challenge for a high score! </p>
      </div>

      <div className="col-span-2">
        <img src="https://events.duolingo.com/images/why_impact.svg" />
      </div>

    </div>
  </card>

  <card className="border-gray-300 border-2 rounded-xl w-[30rem] py-7 px-5">
    <div className="grid grid-cols-6 gap-3">
      
      <div className="col-span-2">
        <img src="https://events.duolingo.com/images/why_access.svg" />
      </div>

      <div className="col-span-4">
        <p className="text-gray-700 font-bold"> High Security Services </p>
        <p className="text-gray-500 mt-4"> Enjoy to access our service wit the strong security service! </p>
      </div>

    </div>
  </card>

</div>

  </div>
  )
}

export default Downloads;
