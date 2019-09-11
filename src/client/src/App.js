import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import fire from "./config/fire";

import Header from "./components/Header/";
import Home from "./components/Home";
import About from "./components/About";
import Admin from "./components/Admin"
import Dashboard from "./components/Dashboard";

import Login from "./components/Login";
import Logout from "./components/Logout";

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user });
            } else {
                this.setState({ user: null });
            }
        })
    }

    render() {
        return (
            <Router>

                <Header user={this.state.user} />

                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/dashboard" component={Dashboard} />

                <Route exact path="/admin" component={Admin} />
                <Route exact path="/deployment" component={Dashboard} />

                <Route exact path="/login" component={Login} />

            </Router>
        );
    }
}

export default App;
