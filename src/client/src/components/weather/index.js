import React, { Component } from 'react';
import axios from "axios";
import moment from "moment";
import "./style.css";

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
        this.updateWeather();
    }

    clock() {
        setInterval(() => {
            const time = moment().format("mm:ss");
            if (time === "00:00") this.updateWeather();
        }, 1000)
    }

    updateWeather() {
        console.log(moment().format("HH:mm:ss") + " - Updating weather...");
        axios.get("/api/weather/test")
            .then(res => { this.setState({ data: res.data }) })
    }

    render() {
        const { currently, hourly } = this.state.data;
        return (
            <div id="weatherContainer">

                <CurrentWeather data={currently} />

                <FutureWeather data={hourly} />

            </div>
        );
    }
}

export default Weather;