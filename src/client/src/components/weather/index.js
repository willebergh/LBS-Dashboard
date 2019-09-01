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
    }

    clock() {
        this.updateState();
        setInterval(() => {
            const time = moment().format("mm:ss");
            if (time === "01:00") this.updateState();
        }, 1000)
    }

    updateState() {
        console.log(moment().format("HH:mm:ss") + " - Updating weather...");
        axios.get("/api/weather/new")
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