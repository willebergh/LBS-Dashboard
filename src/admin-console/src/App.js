import React, { Component } from 'react';
import { CssBaseline } from "@material-ui/core";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import axios from "axios";

import { ThemeProvider } from "./components/Theme";
import Loading from "./components/Loading";
import Login from "./components/Views/Login";
import Logout from "./components/Views/Logout";
import Register from "./components/Views/Register";
import AdminConsole from "./components/Views/AdminConsole";

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            loading: false
        }

        this.getAuthState = this.getAuthState.bind(this);
    }

    componentDidMount() {
        this.getAuthState();
    }

    getAuthState() {
        this.setState({ loading: true });
        axios.get("/api/user/me")
            .then(res => {
                this.setState({ loading: false, user: res.data.user });
                this.props.history.replace("/admin");
            })
            .catch(() => this.setState({ loading: false }))
    }

    updateAuthState = user => {
        this.setState({ user });
    }

    render() {
        const { loading, user } = this.state;

        return (
            <ThemeProvider>
                <CssBaseline />
                {loading ? (
                    <Loading />
                ) : (
                        <Switch>

                            <Route exact path="/login" render={props => (
                                !user
                                    ? <Login updateAuthState={this.updateAuthState} />
                                    : <Redirect to={() => {
                                        const state = this.props.location.state;
                                        if (state) {
                                            const from = state.from.toLowerCase();
                                            if (from === "/login" || from === "/logout" || from === "/register") {
                                                return "/admin"
                                            } else {
                                                return from;
                                            }
                                        } else {
                                            return "/admin";
                                        }
                                    }} />
                            )} />

                            <Route exact path="/register/:token" render={props => (
                                !user
                                    ? <Register {...props} />
                                    : <Redirect to="/admin" />
                            )} />

                            <Route exact path="/logout" render={props => (
                                user
                                    ? <Logout updateAuthState={this.updateAuthState} />
                                    : <Redirect to={{
                                        pathname: "/login",
                                        state: { from: props.location }
                                    }} />
                            )} />

                            <Route path="/admin" render={props => (
                                user
                                    ? <AdminConsole {...props} user={user} />
                                    : <Redirect to={{
                                        pathname: '/login',
                                        state: { from: props.location }
                                    }} />
                            )} />

                            <Route render={props => (
                                <Redirect to={{
                                    pathname: "/admin",
                                    state: { from: props.location }
                                }} />
                            )} />


                        </Switch>
                    )}
            </ThemeProvider>
        )
    }
}

export default withRouter(App);