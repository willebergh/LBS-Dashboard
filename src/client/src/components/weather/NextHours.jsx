import React, { Component } from 'react';
import moment from "moment";

import WeatherIcon from "./WeatherIcon";

class NextHours extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.waitForData();
    }

    waitForData() {
        const { data } = this.props;
        if (data.length === 0) {
            setTimeout(() => {
                this.waitForData();
            }, 100)
        } else {
            this.setState({ data });
        }
    }

    findCurrentHour() {
        if (parseInt(moment().format("mm")) < 30) {
            return moment().format("MM-DD HH:00")
        } else {
            return moment().add(1, "h").format("MM-DD HH:00")
        }
    }

    findParam(params, name) {
        return params.find(param => param.name === name)
    }

    render() {
        return (
            <div>
                {this.state.data.map((d, index) => {
                    if (moment().isSameOrBefore(d.validTime, "hour") && 11 > index) {
                        console.log(index)
                        return (
                            <div key={index}>
                                <span>
                                    {moment(d.validTime).format("MM-DD HH:mm")}
                                </span>
                                <span>
                                    <WeatherIcon value={this.findParam(d.parameters, "Wsymb2").values[0]} />
                                </span>
                                <span>
                                    {this.findParam(d.parameters, "t").values[0]}
                                </span>
                            </div>
                        )
                    }
                })}
            </div>
        );
    }
}

export default NextHours;