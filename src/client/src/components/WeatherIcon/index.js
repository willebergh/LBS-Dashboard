import React from "react";

import ClearDay from "./icons/ClearDay";
import ClearNight from "./icons/ClearNight";
import Cloudy from "./icons/Cloudy";
import Fog from "./icons/Fog";
import Hail from "./icons/Hail";
import PartlyCloudyDay from "./icons/PartlyCloudyDay";
import PartlyCloudyNight from "./icons/PartlyCloudyNight";
import Rain from "./icons/Rain";
import Sleet from "./icons/Sleet";
import Snow from "./icons/Snow";
import Thunderstorm from "./icons/Thunderstorm";
import Tornado from "./icons/Tornado";
import Wind from "./icons/Wind";

function WeatherIcon({ value }) {
    switch (value) {
        case "clear-day": return <ClearDay />
        case "clear-night": return <ClearNight />
        case "rain": return <Rain />
        case "snow": return <Snow />
        case "sleet": return <Sleet />
        case "wind": return <Wind />
        case "fog": return <Fog />
        case "cloudy": return <Cloudy />
        case "partly-cloudy-day": return <PartlyCloudyDay />
        case "partly-cloudy-night": return <PartlyCloudyNight />
        case "hail": return <Hail />
        case "thunderstorm": return <Thunderstorm />
        case "tornado": return <Tornado />
        default: return "icon"
    }
}

export default WeatherIcon