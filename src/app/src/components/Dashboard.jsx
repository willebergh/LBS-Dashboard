import React, { Component } from 'react';
import anime from "animejs";
import moment from "moment";

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
            isDashboardOpening: false,
            theme: "light",
        }

        this.hasLoaded = this.hasLoaded.bind(this);
        this.openDashboard = this.openDashboard.bind(this);
        this.updateTheme = this.updateTheme.bind(this);

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

    updateTheme(theme) {
        this.setState({ theme });
    }

    render() {
        const { isAllComponentsLoaded, isDashboardOpening, theme } = this.state;

        return (
            <div style={themes[theme]}>
                {isDashboardOpening ? null : <Loading play={isAllComponentsLoaded} timelineClosed={this.openDashboard} theme={theme} />}
                <div id="grid">
                    <CurrentTimeAndDate hasLoaded={this.hasLoaded} />
                    <Weather hasLoaded={this.hasLoaded} theme={theme} updateTheme={this.updateTheme} />
                    <Departures hasLoaded={this.hasLoaded} station="3404" transportType="bus" />
                    <FoodMenu hasLoaded={this.hasLoaded} />
                </div>
            </div>
        );
    }
}

const themes = {
    light: {

    },
    dark: {
        color: "#eee",
        backgroundColor: "#000",
        borderColor: "#eee"
    }
}

export default Dashboard;