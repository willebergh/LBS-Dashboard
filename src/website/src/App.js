import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login"
import Logout from "./components/Logout";
import PrivateRoute from "./middleware/PrivateRoute";
import Admin from "./components/Admin";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.initUserState();
    }

    initUserState() {
        axios.get("/api/user/me")
            .then(res => this.setState({ user: res.data.user }))
    }

    render() {
        return (
            <Router>

                <Switch>

                    <Route path="/" render={props => (
                        <React.Fragment>
                            <Header user={this.state.user} />

                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/logout" component={Logout} />

                            <Footer />
                        </React.Fragment>
                    )} />

                </Switch>

            </Router>
        );
    }
}   