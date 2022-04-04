import React from 'react';
import ReactDOM from 'react-dom';
import {Amplify, Auth } from 'aws-amplify';
import awsmobile from './aws-exports';
import {BrowserRouter} from 'react-router-dom'; 

import App from './App';
import Nav from './navbar';
import Footer from './footer';
import reportWebVitals from './reportWebVitals';

import './css/index.css';

import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Users, Post } from './models';

Amplify.configure(awsmobile);
Auth.configure(awsmobile);

async function onQuery() {
  const models = await DataStore.query(Users);
  console.log(models);
}


async function onDeleteAll() {
  const modelToDelete = await DataStore.query(Users);
  DataStore.delete(modelToDelete[0]);
}

ReactDOM.render(
  <BrowserRouter>
    <Nav />
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
