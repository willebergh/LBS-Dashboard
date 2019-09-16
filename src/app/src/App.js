import React, { Component } from 'react';
import Dashboard from "./components/Dashboard";
import Setup from "./components/Setup";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

class App extends Component {
    render() {
        const dashboardConfig = localStorage.getItem("dashboard-config");
        if (!dashboardConfig) {
            return <Setup socket={socket} />
        }
        return (
            <Dashboard socket={socket} />
        );
    }
}

export default App;
