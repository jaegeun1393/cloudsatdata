import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'; 
import Amplify, { Auth, API } from 'aws-amplify';
import config from './aws-exports';

import App from './App';
import Footer from './footer';
import reportWebVitals from './reportWebVitals';

import './css/index.css';

import { DataStore } from '@aws-amplify/datastore';
import { Usersat } from './models';
Amplify.configure(config);
Auth.configure(config);

API.configure({
  API: {
    endpoints: [
        {
            name: "cloudsatapi",
            endpoint: "https://7jcyii03d3.execute-api.us-east-1.amazonaws.com/staging"
        }
    ]
}
});

async function onQuery() {
  const models = await DataStore.query(Usersat);
  console.log(models);
}


async function onDeleteAll() {
  const modelToDelete = await DataStore.query(Usersat);
  DataStore.delete(modelToDelete[0]);
}

ReactDOM.render(
  <BrowserRouter>
    <App />
    <Footer />
  </BrowserRouter>,
  document.getElementById('root')
);

  //  <input type="button" value="update" onClick={onCreate} />
  //  <input type="button" value="click" onClick={onQuery} />

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
