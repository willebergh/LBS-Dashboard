import React, { Component } from "react";
import axios from "axios";
import moment from "moment"

import WeatherIcon from "./WeatherIcon";


class Forecast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            days: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/api/smhi/forecast")
            .then(res => {
                this.setState({
                    days: res.data.timeSeries
                })
            })
            .catch(err => console.log(err));
    }

    findParam(params, name) {
        return params.find(param => param.name === name)
    }

    render() {
        return (
            <div>
                {this.state.days.map((day, index) => {
                    const params = day.parameters;
                    return (
                        <div key={index}>
                            <WeatherIcon value={parseInt(this.findParam(params, "Wsymb2").values.toString(), 10)} />
                            {day.validTime}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Forecast;