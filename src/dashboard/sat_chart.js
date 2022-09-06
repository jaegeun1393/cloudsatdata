import React, { Component } from 'react';
import { Chart, registerables } from 'chart.js'; 
import { Line } from "react-chartjs-2";

const data = {
  labels: ["2022/1/4", "2022/1/6", "2022/1/7", "2022/1/14"],
  datasets: [{
    label: 'Total SAT',
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    data: [1500, 1406, 1210, 1400]
  },
  {
    label: 'SAT- Math',
    borderColor: 'rgb(50, 119, 168)',
    backgroundColor: 'rgba(50, 119, 168, 0.5)',
    data: [500, 400, 550, 380]
  },
  {
    label: 'SAT- English',
    borderColor: 'rgb(50, 168, 62)',
    backgroundColor: 'rgba(50, 168, 62, 0.5)',
    data: [600, 520, 430, 500]
  }
  ]
};

function SatChart() {
  return <div>
    <Line data={data}/>
  </div>
}

export default SatChart;