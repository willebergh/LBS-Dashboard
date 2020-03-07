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

import { ThemeContext } from "../Theme";

interface IProps {
    icon: string;
}

const WeatherIcon: React.FC<IProps> = ({ icon }) => {

    const { theme } = React.useContext(ThemeContext);

    const getIcon = () => {
        switch (icon) {
            case "clear-day": return <ClearDay theme={theme} />
            case "clear-night": return <ClearNight theme={theme} />
            case "rain": return <Rain theme={theme} />
            case "snow": return <Snow theme={theme} />
            case "sleet": return <Sleet theme={theme} />
            case "wind": return <Wind theme={theme} />
            case "fog": return <Fog theme={theme} />
            case "cloudy": return <Cloudy theme={theme} />
            case "partly-cloudy-day": return <PartlyCloudyDay theme={theme} />
            case "partly-cloudy-night": return <PartlyCloudyNight theme={theme} />
            case "hail": return <Hail theme={theme} />
            case "thunderstorm": return <Thunderstorm theme={theme} />
            case "tornado": return <Tornado theme={theme} />
            default: return "icon"
        }
    }

    return (
        <React.Fragment>
            {getIcon()}
        </React.Fragment>
    )
}

export default WeatherIcon;