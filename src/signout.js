import React, { Component } from 'react';
import { Navigate  } from "react-router-dom";
import {Auth} from 'aws-amplify';


import './css/App.css';

class Signout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  async componentDidMount() {
    try {
      await Auth.signOut();
      this.setState({ redirect: true }) 
    } catch (error) {
      alert(error);
    }
  }

  render() {
    if (this.state.redirect) return <Navigate to="/Login" />
  return (
    <div>

  </div>
  
  );
  }
}

export default Signout;
