import React, { Component } from 'react';
import anime from "animejs";

// Components
import Loading from "./Loading"
import Weather from "./Weather";
import FoodMenu from "./FoodMenu";
import Departures from "./Departures";
import CurrentTimeAndDate from "./CurrentTimeAndDate";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            loadedComponents: [],
            isAllComponentsLoaded: false,
            show: false
        }

        this.hasLoaded = this.hasLoaded.bind(this);
    }

    async hasLoaded(component) {
        const { loadedComponents } = this.state;
        console.log(component)
        loadedComponents.push(component)
        if (loadedComponents.length === 4) {
            setTimeout(() => {
                this.setState({ isAllComponentsLoaded: true })
            }, 10000)
        }
    }

    render() {
        const { show, isAllComponentsLoaded } = this.state;

        return (
            <div>
                <Loading loop={isAllComponentsLoaded ? false : true} />
                <div id="grid">
                    <CurrentTimeAndDate hasLoaded={this.hasLoaded} />
                    <Weather hasLoaded={this.hasLoaded} />
                    <Departures hasLoaded={this.hasLoaded} station="3404" transportType="bus" />
                    <FoodMenu hasLoaded={this.hasLoaded} />
                </div>
            </div>
        );
    }
}

export default Dashboard;