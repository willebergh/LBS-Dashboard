import React, { Component } from 'react';
import PropTypes from "prop-types";

import WeatherIcon from "./WeatherIcon";

class CurrentWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {

        const { temperature, icon } = this.props;

        return (
            <div id="currentWeather">
                <div class="body">
                    <div class="temperature">
                        <span>
                            {temperature}
                        </span>
                    </div>
                    <div class="degUnit">
                        <span class="deg">&deg;</span>
                        <span class="unit">C</span>
                    </div>
                </div>
                <div class="footer">
                    <div class="title">
                        <WeatherIcon value={icon} text />
                    </div>
                </div>
            </div>
        );
    }
}

CurrentWeather.propTypes = {
    temperature: PropTypes.object.isRequired,
    icon: PropTypes.number.isRequired
}

export default CurrentWeather;