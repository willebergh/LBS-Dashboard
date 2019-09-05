import React, { Component } from 'react';

// Components
import Weather from "./Weather";
import FoodMenu from "./FoodMenu";
import Departures from "./Departures";
import CurrentTimeAndDate from "./CurrentTimeAndDate";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            components: []
        }

        this.hasLoaded = this.hasLoaded.bind(this);
    }

    hasLoaded(component) {
        this.setState({ components: [...this.state.components, component] })
    }

    render() {

        if (this.state.components.length === 4) console.log("All components has loaded")

        return (
            <div id="grid">
                <CurrentTimeAndDate hasLoaded={this.hasLoaded} />
                <Weather hasLoaded={this.hasLoaded} />
                <Departures hasLoaded={this.hasLoaded} station="3404" transportType="bus" />
                <FoodMenu hasLoaded={this.hasLoaded} />
            </div>
        );
    }
}

export default Dashboard;