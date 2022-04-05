import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'; 
import Amplify, { Auth, Storage } from 'aws-amplify';
import aws_exports from './aws-exports';

import App from './App';
import Nav from './navbar';
import Footer from './footer';
import reportWebVitals from './reportWebVitals';

import './css/index.css';

import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Users, Post } from './models';

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:0accfe82-27bc-4efe-a870-67f0443ba3a7', //REQUIRED - Amazon Cognito Identity Pool ID
    region: 'us-east-1', // REQUIRED - Amazon Cognito Region
    userPoolId: 'us-east-1_WyWx1roqn', //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: '1o849n4vrrb878cu8ra2fhhv9q', //OPTIONAL - Amazon Cognito Web Client ID
},
Storage: {
    AWSS3: {
        bucket: 'cloudsatdata-storage-b83a98ff73847-staging',
        region: 'us-east-1', //OPTIONAL -  Amazon service region
    }
}
});
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
