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
            isDashboardOpen: false,
            theme: "light",
        }

        this.hasLoaded = this.hasLoaded.bind(this);
        this.openDashboard = this.openDashboard.bind(this);
        this.updateTheme = this.updateTheme.bind(this);

    }

    componentDidMount() {
        this.socketListener();
    }

    socketListener() {
        const socket = this.props.socket;
        const config = JSON.parse(localStorage.getItem("dashboard-config"));
        socket.emit("dashboard-connect", config);
        socket.on("update-connected-dashboards", data => console.log(data));
    }

    async hasLoaded(component) {
        const { loadedComponents } = this.state;
        console.log(component)
        loadedComponents.push(component)
        if (loadedComponents.length === 4) {
            this.setState({ isAllComponentsLoaded: true })
        }
    }

    openDashboard() {
        if (!this.state.isDashboardOpen) {
            this.setState({ isDashboardOpen: true })
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
    }

    updateTheme(theme) {
        this.setState({ theme });
    }

    render() {
        const { isAllComponentsLoaded, isDashboardOpen, theme } = this.state;

        return (
            <div style={themes[theme]}>
                {isDashboardOpen ? null : <Loading play={isAllComponentsLoaded} timelineClosed={this.openDashboard} theme={theme} />}
                <div id="grid">
                    <CurrentTimeAndDate hasLoaded={this.hasLoaded} />
                    <Weather hasLoaded={this.hasLoaded} socket={this.props.socket} theme={theme} updateTheme={this.updateTheme} />
                    <Departures hasLoaded={this.hasLoaded} socket={this.props.socket} station="3404" transportType="bus" />
                    <FoodMenu hasLoaded={this.hasLoaded} socket={this.props.socket} />
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