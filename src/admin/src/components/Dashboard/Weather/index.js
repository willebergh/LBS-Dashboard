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
        this.initState();
        this.initListener();
    }

    initState() {
        axios.get("/api/weather/stockholm")
            .then(res => this.setState({ data: res.data }))
            .then(() => this.updateTheme())
            .then(() => this.props.hasLoaded("weather"))
    }

    initListener() {
        const socket = this.props.socket;
        socket.on("update-weather", data => this.setState({ data }));
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