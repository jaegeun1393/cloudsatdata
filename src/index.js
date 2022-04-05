import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'; 
import { Amplify, Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

import App from './App';
import Nav from './navbar';
import Footer from './footer';
import reportWebVitals from './reportWebVitals';

import './css/index.css';

import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Users, Post } from './models';

Amplify.configure(aws_exports);
Auth.configure(aws_exports);

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
