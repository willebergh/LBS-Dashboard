import React, { Component } from "react";
import axios from "axios";
import moment from "moment"

import Day from "./Day";
import CurrentWeather from "./CurrentWeather";
import NextHours from "./NextHours";


class Forecast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            sorted: []
        }
    }

    async componentDidMount() {
        await axios.get("http://localhost:5000/api/smhi/test")
            .then(res => {
                this.setState({
                    data: res.data.timeSeries
                })
            })
            .catch(err => console.log(err));

        this.sortByDay();

    }

    async sortByDay() {
        const unique = []
        await this.state.data.forEach(day => {
            if (!unique.find(date => date === moment(day.validTime).format("YYYY-MM-DD"))) unique.push(moment(day.validTime).format("YYYY-MM-DD"))
        })

        const sorted = []
        await unique.forEach(unique => {
            sorted.push(this.state.data.filter(x => moment(x.validTime).format("YYYY-MM-DD") === unique))
        })

        await this.setState({ sorted })

        console.log(this.state.sorted)
    }


    render() {
        const { data, sorted } = this.state;
        return (
            <div>
                <CurrentWeather data={data} />
                <br />
                <NextHours data={data} />
                <br />
                {sorted.map((day, index) => {
                    return (
                        <div key={index}>
                            <Day day={day} />
                            <br />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Forecast;