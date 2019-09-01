import React from "./node_modules/react";

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
import HeavySnowShowers from "./icons/HeavySnowShowers";
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

function WeatherIcon({ value, text }) {

    switch (value) {

        case 1:
            return <ClearSky text={text} />

        case 2:
            return <NearlyClearSky text={text} />

        case 3:
            return <VariableCloudiness text={text} />

        case 4:
            return <HalfclearSky text={text} />

        case 5:
            return <CloudySky text={text} />

        case 6:
            return <Overcast text={text} />

        case 7:
            return <Fog text={text} />

        case 8:
            return <LightRainShowers text={text} />

        case 9:
            return <ModerateRainShowers text={text} />

        case 10:
            return <HeavyRainShowers text={text} />

        case 11:
            return <Thunderstorm text={text} />

        case 12:
            return <LightSleetShowers text={text} />

        case 13:
            return <ModerateSleetShowers text={text} />

        case 14:
            return <HeavySleetShowers text={text} />

        case 15:
            return <LightSnowShowers text={text} />

        case 16:
            return <ModerateSnowShowers text={text} />

        case 17:
            return <HeavySnowShowers text={text} />

        case 18:
            return <LightRain text={text} />

        case 19:
            return <ModerateRain text={text} />

        case 20:
            return <HeavyRain text={text} />

        case 21:
            return <Thunder text={text} />

        case 22:
            return <LightSleet text={text} />

        case 23:
            return <ModerateSleet text={text} />

        case 24:
            return <HeavySleet text={text} />

        case 25:
            return <LightSnowfall text={text} />

        case 26:
            return <ModerateSnowfall text={text} />

        case 27:
            return <HeavySnowfall text={text} />

        default:
            return <span>WeatherIcon</span>
    }

}

export default WeatherIcon