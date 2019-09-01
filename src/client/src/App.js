import React from 'react';
import "./App.css";

// Components
import CurrentTimeAndDate from "./components/CurrentTimeAndDate";
import Weather from "./components/Weather";
import Departures from "./components/Departures";

function App() {
  return (
    <div id="grid">
      <CurrentTimeAndDate />
      <Weather />
      <Departures station="3404" transportType="bus" />
    </div>
  );
}

export default App;
