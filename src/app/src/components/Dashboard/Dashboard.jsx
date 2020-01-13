import React, { Component } from 'react';
import anime from "animejs";
import axios from "axios";

// Components
import Loading from "./Loading"
import Weather from "./Weather";
import FoodMenu from "./FoodMenu";
import Departures from "./Departures";
import CurrentTimeAndDate from "./CurrentTimeAndDate";

import io from "socket.io-client";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            loadedComponents: [],
            isAllComponentsLoaded: false,
            isDashboardOpen: false,
            theme: "light",
            loading: true,
            isIdentifying: false
        }

        this.hasLoaded = this.hasLoaded.bind(this);
        this.openDashboard = this.openDashboard.bind(this);
        this.updateTheme = this.updateTheme.bind(this);

    }

    componentDidMount() {
        this.initSocket();
    }

    initSocket() {
        const config = JSON.parse(localStorage.getItem("dashboard-config"));
        const socket = io("/dashboards", { query: { token: config.token } });

        socket.on("error", err => {
            if (err.message === "jwt expired") {
                return this.refreshToken(config);
            }
        });

        socket.on("connect", () => {
            console.log("Successfully connected to socket!");
            this.socket = socket; this.setState({ loading: false });
            this.socket.emit("dashboard-connect", config);
            this.socket.on("update-connected-dashboards", data => console.log(data));
            this.socket.on("dashboard-identified", () => this.onDashboardIdentified());
            this.socket.on("dashboard-refresh", () => this.onDashboardRefresh());
            this.socket.on("dashboard-delete", this.onDashboardDelete);
        });
    }

    refreshToken(config) {
        axios({ method: "post", url: "/api/auth/refresh-token", data: { config } })
            .then(res => {
                if (res.data.msg === "success" && res.data.config) {
                    localStorage.setItem("dashboard-config", JSON.stringify(res.data.config));
                    return this.initSocket();
                }
            })
            .catch(err => console.log(err))
    }

    onDashboardIdentified() {
        if (this.state.isIdentifying) {
            return;
        } else {
            this.setState({ isIdentifying: true });
            var i = 0;
            const interval = setInterval(() => {
                i++;
                if (i > 6) {
                    this.setState({ isIdentifying: false });
                    return clearInterval(interval);
                } else {
                    this.updateTheme(this.state.theme === "light" ? "dark" : "light");
                }
            }, 500)
        }
    }

    onDashboardRefresh() {
        window.location.reload();
    }

    onDashboardDelete() {
        localStorage.removeItem("dashboard-config");
        window.location.reload();
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

        if (this.state.loading) return "loading";

        const { isAllComponentsLoaded, isDashboardOpen, theme } = this.state;

        return (
            <div style={themes[theme]}>
                {isDashboardOpen ? null : <Loading play={isAllComponentsLoaded} timelineClosed={this.openDashboard} theme={theme} />}
                <div id="grid">
                    <CurrentTimeAndDate hasLoaded={this.hasLoaded} />
                    <Weather hasLoaded={this.hasLoaded} socket={this.socket} theme={theme} updateTheme={this.updateTheme} />
                    <Departures hasLoaded={this.hasLoaded} socket={this.socket} station="3404" transportType="bus" />
                    <FoodMenu hasLoaded={this.hasLoaded} socket={this.socket} />
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