import React, { Component } from 'react';
import PropTypes from "prop-types";
import Odometer from "react-odometerjs";

class CurrentWeather extends Component {
    render() {
        const { temperature, summary } = this.props.data;
        return (
            <div id="currentWeather">
                <div className="body fadeIn">
                    <div className="temperature">
                        <span>
                            <Odometer value={temperature ? Math.round(temperature) : 0} format="d" />
                        </span>
                    </div>
                    <div className="degUnit">
                        <span className="deg">&deg;</span>
                        <span className="unit">C</span>
                    </div>
                </div>
                <div className="footer fadeIn">
                    <div className="title">
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