import React, { Component } from 'react';
import moment from "moment";

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
            day: moment().format("dddd"),
            date: moment().format("D MMMM"),
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
                        {time}
                    </span>
                </div>
            </div>
        );
    }
}

export default CurrentTimeAndDate;