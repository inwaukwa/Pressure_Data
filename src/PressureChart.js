import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-3'
import pressure from './pressure.json'
import axios from 'axios'

function PressureChart () {

  const [chartData, setChartData] = useState({});

  const chart = () => {
    let pressure_this = [];
    let ms_this = [];
    axios
      .get("")
      .then(res => {
        console.log(res);
        for (const dataObj of pressure.pressure_points) {
          pressure_this.push(parseFloat(dataObj.pressure));
          ms_this.push(parseFloat(dataObj.ms));
        }
        setChartData({
          labels: ms_this,
          datasets: [
            {
              label: "pressure",
              data: pressure_this,
              backgroundColor: ["red"],
              borderWidth: 4
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(pressure_this, ms_this);
}

useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <h1>Innocent Nwaukwa</h1>
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "PRESSURE CONTRACTIONS", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
    </div>
  );
};

export default PressureChart
