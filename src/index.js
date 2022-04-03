import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Nav from './navbar';
import Footer from './footer';

import './css/index.css';
import reportWebVitals from './reportWebVitals';

import Amplify from 'aws-amplify'
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

ReactDOM.render(
  <React.StrictMode>
    <Nav />
    <App />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
