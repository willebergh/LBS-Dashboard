import React, { Component } from 'react';
import App from "./components/Dashboard/Dashboard";
import Setup from "./components/Dashboard/Setup";
import "./components/Dashboard/reset.css"
import "./components/Dashboard/odometer.css";
import "./components/Dashboard/main.css";

class Dashboard extends Component {
    render() {
        const dashboardConfig = localStorage.getItem("dashboard-config");
        if (!dashboardConfig) {
            return <Setup />
        }
        return (
            <App />
        );
    }
}

export default Dashboard;
