import React, { Component } from 'react';
import PropTypes from "prop-types";

class CurrentWeather extends Component {
    render() {
        const { temperature, summary } = this.props.data;
        return (
            <div id="currentWeather">
                <div class="body">
                    <div class="temperature">
                        <span>
                            {Math.round(temperature)}
                        </span>
                    </div>
                    <div class="degUnit">
                        <span class="deg">&deg;</span>
                        <span class="unit">C</span>
                    </div>
                </div>
                <div class="footer">
                    <div class="title">
                        {summary}
                    </div>
                </div>
            </div>
        );
    }
}

CurrentWeather.propTypes = {
    data: PropTypes.object.isRequired
}

export default CurrentWeather;