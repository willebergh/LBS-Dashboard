import React, { Component } from 'react';
import moment from "moment";

import WeatherIcon from "../WeatherIcon";

class FutureWeather extends Component {
    render() {
        if (!this.props.data.data) {
            return ""
        } else {
            return (
                <div className="futureWeather">
                    {this.props.data.data.map((d, i) => {
                        if (i < 6) {

                            if (i === 0) {
                                return (
                                    <div key={i} className="column fadeIn">
                                        <div className="row">
                                            Now
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

                            return (
                                <div key={i} className="column fadeIn">
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


export default FutureWeather;