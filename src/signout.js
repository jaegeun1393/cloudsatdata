import React, { Component } from 'react';
import { Navigate  } from "react-router-dom";
import axios from "axios";
import './css/App.css';

class Signout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: props
    };
  }

  async componentDidMount() {
    var self = this
    axios.post('https://ocr.min.farm/api/logout', {})
    .then(function(response){
      alert(response.data.message);
      window.location.replace("https://ocr.min.farm");
    })
    .catch(function(error){
      alert(error);
    });
  }

  render() {
  return (
    <div>

  </div>
  
  );
  }
}

export default Signout;
