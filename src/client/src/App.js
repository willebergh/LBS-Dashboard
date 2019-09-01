import React from 'react';
import "./App.css";

// Components
import CurrentTimeAndDate from "./components/CurrentTimeAndDate";
import Weather from "./components/Weather";

function App() {
  return (
    <div id="grid">
      <CurrentTimeAndDate />
      <Weather />
    </div>
  );
}

export default App;
