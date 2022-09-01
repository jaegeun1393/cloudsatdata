import React, { Component } from 'react';
import axios from "axios";


import './css/App.css';
import AddSAT from "./dashboard/AddSAT";
import Viewscore from "./dashboard/Viewscore";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginstate: false,
      clicked: 0
    };
    this.setclicked = this.setclicked.bind(this)
  }

  setclicked(num) {
    this.setState({clicked: num});
  }

  render() {
  return (
    <div>
<main className="flex w-full h-auto overflow-auto	" style={{marginTop: "37px"}}>
<aside className="w-80 h-screen bg-gray w-fulll hidden sm:block">
  <div className="flex flex-col justify-between h-screen p-4">
      <div className="text-sm">
        <div className="bg-gray-600 text-blue-300 p-5 rounded mt-2 cursor-pointer" onClick={() => this.setclicked(0)}>Add SAT DB</div>
        <div className="bg-gray-200 text-blue-300 p-5 rounded mt-2 cursor-pointer" onClick={() => this.setclicked(1)}>Search Students</div>
      </div>
  </div>
</aside>

<section className="w-full p-4">
  <div className="w-full h-64 p-4 text-md">
    {this.state.clicked == 0 &&
    <AddSAT />
    }
    {this.state.clicked == 1 &&
    <Viewscore />
    }
  </div>
  </section>

</main>
    </div>
  );
  }
}

export default Dashboard;
