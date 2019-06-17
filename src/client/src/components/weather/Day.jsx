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

    async componentDidMount() {
        await this.setState({
            day: this.props.day
        })

        console.log(this.state.day)
    }

    findParam(params, name) {
        return params.find(param => param.name === name)
    }

    render() {
        return (
            <div>
                {this.state.day.map((day, index) => {
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