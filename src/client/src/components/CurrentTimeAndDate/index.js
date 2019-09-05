import React, { Component } from 'react';
import moment from "moment";
import Odometer from "react-odometerjs";

class CurrentTimeAndDate extends Component {
    constructor() {
        super();
        this.state = {
            day: "",
            date: "",
            time: ""
        }
    }

    componentDidMount() {
        this.updateTime();
        this.clock();
        this.props.hasLoaded("CurrentTimeAndDate");
    }

    clock() {
        setInterval(() => {
            this.updateTime();
        }, 1000)
    }

    updateTime() {
        this.setState({
            day: moment().format("dddd").toLowerCase(),
            date: moment().format("D MMMM").toLowerCase(),
            time: moment().format("HH:mm")
        });
    }

    render() {
        const { day, date, time } = this.state;
        return (
            <div id="currentTimeAndDate">
                <div className="fadeIn row">
                    <span className="day">
                        {day}
                    </span>
                </div>
                <div className="fadeIn row">
                    <span className="date">
                        {date}
                    </span>
                </div>
                <div className="fadeIn row">
                    <span className="time">
                        <Odometer value={time.split(":")[0]} format="d" />
                        :
                        <Odometer value={time.split(":")[1]} format="d" />
                    </span>
                </div>
            </div>
        );
    }
}

export default CurrentTimeAndDate;