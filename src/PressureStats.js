import pressure from './pressure.json'

function PressureChart () {
    return (
        <div className="App">
          <pre>Number of Contractions: {pressure.count_contractions}</pre>
          <pre>Contractions / Second: {pressure.contractions_per_sec}</pre>
        </div>
      )
}

export default PressureChart