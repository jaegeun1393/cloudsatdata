import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'; 

import App from './App';
import Footer from './footer';
import reportWebVitals from './reportWebVitals';
import './css/index.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <Footer />
  </BrowserRouter>,
  document.getElementById('root')
);


reportWebVitals();