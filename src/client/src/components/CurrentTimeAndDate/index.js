import React, { Component } from 'react';
import moment from "moment";
import "./style.css";

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
        this.clock()
    }

    clock() {
        setInterval(() => {
            this.setState({
                day: moment().format("dddd").toLowerCase(),
                date: moment().format("D MMMM").toLowerCase(),
                time: moment().format("HH:mm")
            });
        }, 1000)
    }

    render() {
        const { day, date, time } = this.state;
        return (
            <div id="currentTimeAndDate">
                <div class="row">
                    <span class="day">
                        {day}
                    </span>
                </div>
                <div class="row">
                    <span class="date">
                        {date}
                    </span>
                </div>
                <div class="row">
                    <span class="time">
                        {time}
                    </span>
                </div>
            </div>
        );
    }
}

export default CurrentTimeAndDate;