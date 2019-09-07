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
            isDashboardOpening: false
        }

        this.hasLoaded = this.hasLoaded.bind(this);
        this.openDashboard = this.openDashboard.bind(this);

    }

    async hasLoaded(component) {
        const { loadedComponents, isTimelineOpened } = this.state;
        console.log(component)
        loadedComponents.push(component)
        if (loadedComponents.length === 4) {
            this.setState({ isAllComponentsLoaded: true })
        }
    }

    openDashboard() {
        this.setState({ isDashboardOpening: true })
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

    render() {
        const { isAllComponentsLoaded, isDashboardOpening } = this.state;

        return (
            <div>
                {isDashboardOpening ? null : <Loading play={isAllComponentsLoaded} timelineClosed={this.openDashboard} />}
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