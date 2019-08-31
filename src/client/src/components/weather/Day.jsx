import React, { Component } from 'react';
import moment from "moment";

import WeatherIcon from "./WeatherIcon";

class Day extends Component {
    constructor(props) {
        super(props)

        this.state = {
            day: []
        }
    }

    componentDidMount() {
        this.setState({
            day: this.props.day
        })
    }

    findParam(params, name) {
        return params.find(param => param.name === name)
    }

    render() {
        const { day } = this.state;
        return (
            <div>
                {day.map((day, index) => {
                    const params = day.parameters;
                    return (
                        <div key={index}>

                            <span>
                                {moment(day.validTime).format("MM-DD HH:mm")}
                            </span>
                            <span>
                                <WeatherIcon value={this.findParam(params, "Wsymb2").values[0]} />
                            </span>
                            <span>
                                {this.findParam(params, "t").values[0]}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Day;