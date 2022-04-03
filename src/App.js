import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

import './css/App.css';


function App() {

  const [greeting, setGreeting] = useState(null)
  async function fetchGreeting() {
    const apiData = await API.get('cloudsatapi', '/users')
    setGreeting(apiData.message)
  }
  useEffect(() => {
    fetchGreeting()
  }, [])

  return (
    <div className="App">
      <section className="w-full px-6 pb-12 antialiased bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="container max-w-lg px-4 py-16 mx-auto text-left md:max-w-none md:text-center">
            <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
            <span className="inline md:block">Get the SAT Score</span> 
            <span className="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block">In 5 seconds!</span></h1>
            <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg">You can give fast feedback to students in less than a minute with us.</div>
            <div className="flex flex-col items-center mt-12 text-center">
            <span className="relative inline-flex w-full md:w-auto">
            <a href="#_" type="button" className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
              Join our Community {greeting}
            </a>
            </span>
            <a href="#" className="mt-3 text-sm text-indigo-500">Learn More</a>
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
              <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
              <span className="font-medium text-gray-500">Faster Processing and Delivery</span>
            </li>
            <li className="flex items-center py-2 space-x-4 xl:py-3">
              <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              <span className="font-medium text-gray-500">Out of the Box Tracking and Monitoring</span>
            </li>
            <li className="flex items-center py-2 space-x-4 xl:py-3">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              <span className="font-medium text-gray-500">100% Protection and Security for Your App</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0"><img className="mx-auto sm:max-w-sm lg:max-w-full" src="https://cdn.devdojo.com/images/november2020/feature-graphic.png" alt="feature image" /></div>
    </div>
  </div>
</section>

<section className="py-20 bg-white">
    <div className="container max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight text-center">Our Features</h2>
        <p className="mt-2 text-lg text-center text-gray-600">Check out our list of awesome features below.</p>
        <div className="grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">

            <div className="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 sm:rounded-xl hover:scale-125 transition-all ease-out cursor-pointer duration-200">
                <div className="p-3 text-white bg-blue-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 " viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M5 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5"></path><circle cx="6" cy="14" r="3"></circle><path d="M4.5 17l-1.5 5l3 -1.5l3 1.5l-1.5 -5"></path></svg>
                </div>
                <h4 className="text-xl font-medium text-gray-700">Certifications</h4>
                <p className="text-base text-center text-gray-500">Each of our plan will provide you and your team with certifications.</p>
            </div>

            <div className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl hover:scale-125 transition-all ease-out cursor-pointer duration-200">
                <div className="p-3 text-white bg-blue-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 " viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M18 8a3 3 0 0 1 0 6"></path><path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5"></path><path d="M12 8h0l4.524 -3.77a0.9 .9 0 0 1 1.476 .692v12.156a0.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8"></path></svg>
                </div>
                <h4 className="text-xl font-medium text-gray-700">Notifications</h4>
                <p className="text-base text-center text-gray-500">Send out notifications to all your customers to keep them engaged.</p>
            </div>

            <div className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl hover:scale-125 transition-all ease-out cursor-pointer duration-200">
                <div className="p-3 text-white bg-blue-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 " viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline><line x1="12" y1="12" x2="20" y2="7.5"></line><line x1="12" y1="12" x2="12" y2="21"></line><line x1="12" y1="12" x2="4" y2="7.5"></line><line x1="16" y1="5.25" x2="8" y2="9.75"></line></svg>
                </div>
                <h4 className="text-xl font-medium text-gray-700">Bundles</h4>
                <p className="text-base text-center text-gray-500">High-quality bundles of awesome tools to help you out.</p>
            </div>

            <div className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl hover:scale-125 transition-all ease-out cursor-pointer duration-200">
                <div className="p-3 text-white bg-blue-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 " viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M8 9l3 3l-3 3"></path><line x1="13" y1="15" x2="16" y2="15"></line><rect x="3" y="4" width="18" height="16" rx="2"></rect></svg>
                </div>
                <h4 className="text-xl font-medium text-gray-700">Developer Tools</h4>
                <p className="text-base text-center text-gray-500">Developer tools to help grow your application and keep it up-to-date.</p>
            </div>

            <div className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl hover:scale-125 transition-all ease-out cursor-pointer duration-200">
                <div className="p-3 text-white bg-blue-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 " viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="9.5" y1="11" x2="9.51" y2="11"></line><line x1="14.5" y1="11" x2="14.51" y2="11"></line><path d="M9.5 15a3.5 3.5 0 0 0 5 0"></path><path d="M7 5h1v-2h8v2h1a3 3 0 0 1 3 3v9a3 3 0 0 1 -3 3v1h-10v-1a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3"></path></svg>
                </div>
                <h4 className="text-xl font-medium text-gray-700">Building Blocks</h4>
                <p className="text-base text-center text-gray-500">The right kind of building blocks to take your company to the next level.</p>
            </div>

            <div className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl hover:scale-125 transition-all ease-out cursor-pointer duration-200">
                <div className="p-3 text-white bg-blue-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 " viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="15" y1="5" x2="15" y2="7"></line><line x1="15" y1="11" x2="15" y2="13"></line><line x1="15" y1="17" x2="15" y2="19"></line><path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2"></path></svg>
                </div>
                <h4 className="text-xl font-medium text-gray-700">Coupons</h4>
                <p className="text-base text-center text-gray-500">Coupons system to provide special offers and discounts for your app.</p>
            </div>

        </div>
    </div>
</section>



  </div>
  );
}

export default App;
