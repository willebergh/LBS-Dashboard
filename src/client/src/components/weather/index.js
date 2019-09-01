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
            data: [],
            currentWeather: {}
        }
    }

    componentDidMount() {
        this.updateWeather();
    }

    updateWeather() {
        setInterval(() => {
            axios.get("/api/weather/18.06263/59.32946")
                .then(res => {
                    this.setState({
                        data: res.data,
                        currentWeather: res.data.find(x => x.validTime === this.some())
                    });

                })
        }, 1000)
    }

    some() {
        var date = new Date();
        date.setMinutes(0);
        date.setMilliseconds(0);
        return date.toISOString().toString().split(".")[0] + "Z";
    }

    findCurrentHour() {

        Date.prototype.addHours = function (h) {
            this.setTime(this.getTime() + (h * 60 * 60 * 1000));
            return this;
        }

        var date = new Date();
        date.setSeconds(0);
        date.setMilliseconds(0);

        if (date.getMinutes() < 30) {
            date.setMinutes(0);
            const iso = date.toISOString();
            return iso.toString().split(".")[0] + "Z";
        } else {
            date.addHours(1);
            date.setMinutes(0);
            const iso = date.toISOString();
            return iso.toString().split(".")[0] + "Z";
        }

    }

    findParam(params, name) {
        if (!params) {
            return {
                level: "",
                levelType: "",
                name: "",
                unit: "",
                values: [""]
            }
        } else {
            return params.find(param => param.name === name);
        }
    }

    render() {

        let count = 0;
        const { currentWeather } = this.state;

        return (
            <div id="weatherContainer">

                <CurrentWeather
                    //    temperature={this.findParam(currentWeather.parameters, "t").values[0]}
                    //icon={this.findParam(currentWeather.parameters, "Wsymb2").values[0]}
                    temperature={30}
                    icon={5}
                />

                <div class="futureWeather">
                    {this.state.data.map((d, i) => {
                        if (count < 5) {
                            if (this.findCurrentHour() < d.validTime) {
                                count++;
                                const time = d.validTime;
                                const icon = this.findParam(d.parameters, "Wsymb2").values[0];
                                const temperature = this.findParam(d.parameters, "t").values[0];
                                return (
                                    <FutureWeather time={time} icon={icon} temperature={temperature} rain={"rain"} />
                                )
                            }
                        }
                    })}
                </div>

            </div>
        );
    }
}

export default Weather;