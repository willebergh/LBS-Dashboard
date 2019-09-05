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
                this.props.hasLoaded("Weather");
            })
        setInterval(() => {
            const time = moment().format("mm:ss");
            if (time === "01:00") this.updateState();
        }, 1000)
    }

    updateState() {
        axios.get("/api/weather/stockholm")
            .then(res => { this.setState({ data: res.data }) })
    }

    render() {
        const { currently, hourly } = this.state.data;
        return (
            <div id="weatherContainer" >

                <CurrentWeather data={currently} />

                <FutureWeather data={hourly} />

            </div>
        );
    }
}

export default Weather;