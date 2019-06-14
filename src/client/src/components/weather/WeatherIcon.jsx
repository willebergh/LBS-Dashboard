import React from "react";

import ClearSky from "./icons/ClearSky";
import NearlyClearSky from "./icons/NearlyClearSky";
import VariableCloudiness from "./icons/VariableCloudiness";
import HalfclearSky from "./icons/HalfclearSky";
import CloudySky from "./icons/CloudySky";
import Overcast from "./icons/Overcast";
import Fog from "./icons/Fog";
import LightRainShowers from "./icons/LightRainShowers";
import ModerateRainShowers from "./icons/ModerateRainShowers";
import HeavyRainShowers from "./icons/HeavyRainShowers";
import Thunderstorm from "./icons/Thunderstorm";
import LightSleetShowers from "./icons/LightSleetShowers";
import ModerateSleetShowers from "./icons/ModerateSleetShowers";
import HeavySleetShowers from "./icons/HeavySleetShowers";
import LightSnowShowers from "./icons/LightSnowShowers";
import ModerateSnowShowers from "./icons/ModerateSnowShowers";
import HeavySnowShowers from "./icons/HeavySnowShowers.jsx";
import LightRain from "./icons/LightRain";
import ModerateRain from "./icons/ModerateRain";
import HeavyRain from "./icons/HeavyRain";
import Thunder from "./icons/Thunder";
import LightSleet from "./icons/LightSleet";
import ModerateSleet from "./icons/ModerateSleet";
import HeavySleet from "./icons/HeavySleet";
import LightSnowfall from "./icons/LightSnowfall";
import ModerateSnowfall from "./icons/ModerateSnowfall";
import HeavySnowfall from "./icons/HeavySnowfall";

function WeatherIcon({ value }) {



    switch (value) {

        case 1:
            return <ClearSky />

        case 2:
            return <NearlyClearSky />

        case 3:
            return <VariableCloudiness />

        case 4:
            return <HalfclearSky />

        case 5:
            return <CloudySky />

        case 6:
            return <Overcast />

        case 7:
            return <Fog />

        case 8:
            return <LightRainShowers />

        case 9:
            return <ModerateRainShowers />

        case 10:
            return <HeavyRainShowers />

        case 11:
            return <Thunderstorm />

        case 12:
            return <LightSleetShowers />

        case 13:
            return <ModerateSleetShowers />

        case 14:
            return <HeavySleetShowers />

        case 15:
            return <LightSnowShowers />

        case 16:
            return <ModerateSnowShowers />

        case 17:
            return <HeavySnowShowers />

        case 18:
            return <LightRain />

        case 19:
            return <ModerateRain />

        case 20:
            return <HeavyRain />

        case 21:
            return <Thunder />

        case 22:
            return <LightSleet />

        case 23:
            return <ModerateSleet />

        case 24:
            return <HeavySleet />

        case 25:
            return <LightSnowfall />

        case 26:
            return <ModerateSnowfall />

        case 27:
            return <HeavySnowfall />

        default:
            return <span>WeatherIcon</span>
    }

}

export default WeatherIcon