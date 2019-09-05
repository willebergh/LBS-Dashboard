import React, { Component } from 'react';
import PropTypes from "prop-types";

class CurrentWeather extends Component {
    render() {
        const { temperature, summary } = this.props.data;
        return (
            <div id="currentWeather">
                <div className="body">
                    <div className="temperature">
                        <span>
                            {temperature ? Math.round(temperature) : 0}
                        </span>
                    </div>
                    <div className="degUnit">
                        <span className="deg">&deg;</span>
                        <span className="unit">C</span>
                    </div>
                </div>
                <div className="footer">
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