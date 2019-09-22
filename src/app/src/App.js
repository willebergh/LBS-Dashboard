import React, { Component } from 'react';
import Dashboard from "./components/Dashboard";
import Setup from "./components/Setup";

class App extends Component {
    render() {
        const dashboardConfig = localStorage.getItem("dashboard-config");
        if (!dashboardConfig) {
            return <Setup />
        }
        return (
            <Dashboard />
        );
    }
}

export default App;
