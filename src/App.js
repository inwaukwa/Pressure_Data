import React from 'react';
import pressure from './pressure.json';
import PressureChart from './PressureChart'
import PressureStats from './PressureStats'
import './App.css';


function App() {
  return (
    <div className="App">
      {/* <PressureChart data={pressure.pressure_points}/>
              <PressureStats
              num_contractions={pressure.count_contractions}
              contraction_per_sec={pressure.count_contractions}
              /> */}
      {/* <pre>{JSON.stringify(pressure.pressure_points, null, 2) }</pre> */}
      <PressureChart/>
      <PressureStats/>
    </div>
  )
}

export default App
