import React, { Component } from 'react';
import axios from "axios";
import moment from "moment";

import CurrentWeather from "./CurrentWeather";
import FutureWeather from "./FutureWeather";

class Weather extends Component {
    constructor() {
        super()
        this.state = {
            data: {
                currently: {},
                hourly: {},
            }
        }
    }

    componentDidMount() {
        this.clock();
    }

    clock() {
        axios.get("/api/weather/stockholm")
            .then(res => {
                this.setState({ data: res.data });
                this.updateTheme();
                this.props.hasLoaded("Weather");
            })
        setInterval(() => {
            this.updateTheme();
            const time = moment().format("mm:ss");
            if (time === "01:00") this.updateState();
        }, 1000)
    }

    updateState() {
        axios.get("/api/weather/stockholm")
            .then(res => {
                this.setState({ data: res.data })
            })
    }

    updateTheme() {
        const sunRise = moment.unix(this.state.data.daily.data[0].sunriseTime);
        const sunSet = moment.unix(this.state.data.daily.data[0].sunsetTime);
        let isSunOut = moment().isBetween(sunRise, sunSet);
        this.props.updateTheme(isSunOut ? "light" : "dark");
    }

    render() {
        const { currently, hourly } = this.state.data;
        return (
            <div id="weatherContainer" >

                <CurrentWeather data={currently} />

                <FutureWeather data={hourly} theme={this.props.theme} />

            </div>
        );
    }
}

export default Weather;