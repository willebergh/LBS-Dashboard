import React, { Component } from './node_modules/react';
import PropTypes from "./node_modules/prop-types";
import moment from "./node_modules/moment";

import WeatherIcon from "./WeatherIcon";

class FutureWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { time, icon, temperature, rain } = this.props;
        return (
            <div class="column">
                <div class="row">
                    {moment(time).format("HH:mm")}
                </div>
                <div class="row">
                    <WeatherIcon value={icon} />
                </div>
                <div class="row">
                    {temperature}&deg;
                    </div>
                <div class="row">
                    {rain}
                </div>
            </div>
        );
    }
}

FutureWeather.propTypes = {
    time: PropTypes.string.isRequired,
    icon: PropTypes.number.isRequired,
    temperature: PropTypes.string.isRequired,
    rain: PropTypes.string.isRequired
}

export default FutureWeather;