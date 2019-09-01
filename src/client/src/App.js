import React from 'react';
import "./App.css";

// Components
import Weather from "./components/Weather";
import FoodMenu from "./components/FoodMenu";
import Departures from "./components/Departures";
import CurrentTimeAndDate from "./components/CurrentTimeAndDate";

function App() {
  return (
    <div id="grid">
      <CurrentTimeAndDate />
      <Weather />
      <Departures station="3404" transportType="bus" />
      <FoodMenu />
    </div>
  );
}

export default App;
