import React, { Component } from 'react';
import anime from "animejs";

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

        if (this.state.components.length === 4) {
            anime({
                targets: "#currentTimeAndDate .row, #currentWeather .body, #currentWeather .footer, #slRealTime .header, #foodMenu .header",
                translateY: -100,
                opacity: [1, 0],
                direction: 'reverse',
                easing: "easeInExpo",
                delay: anime.stagger(100)
            });

            anime({
                targets: ".futureWeather .column, #slRealTime .nextDeparture .display, #slRealTime .departure, #foodMenu .body",
                translateY: 100,
                opacity: [1, 0],
                direction: 'reverse',
                easing: "easeInExpo",
                delay: anime.stagger(100)
            });
        }

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