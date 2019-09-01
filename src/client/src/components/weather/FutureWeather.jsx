import React, { Component } from 'react';
import moment from "moment";

import WeatherIcon from "../WeatherIcon";

class FutureWeather extends Component {
    render() {
        let count = 0;
        if (!this.props.data.data) {
            return (
                <div className="futureWeather">
                    <PlaceHolder />
                    <PlaceHolder />
                    <PlaceHolder />
                    <PlaceHolder />
                    <PlaceHolder />
                </div>
            )
        } else {
            return (
                <div className="futureWeather">
                    {this.props.data.data.map((d, i) => {
                        if (count < 5) {
                            count++;
                            return (
                                <div className="column">
                                    <div className="row">
                                        {moment.unix(d.time).format("HH:mm")}
                                    </div>
                                    <div className="row">
                                        <WeatherIcon value={d.icon} />
                                    </div>
                                    <div className="row">
                                        {Math.round(d.temperature)}&deg;
                                    </div>
                                    <div className="row">
                                        {d.rain}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            );
        }
    }
}

function PlaceHolder() {
    return (
        <div className="column">
            <div className="row">
                00:00
                </div>
            <div className="row">
                icon
                </div>
            <div className="row">
                0&deg;
                </div>
            <div className="row">
                rain
                </div>
        </div>
    )
}


export default FutureWeather;