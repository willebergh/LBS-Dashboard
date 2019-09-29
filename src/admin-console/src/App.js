import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import axios from "axios";

import Login from "./components/Login";
import Logout from "./components/Logout";
import AdminConsole from "./components/AdminConsole";
import Loading from "./components/Loading";

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

        if (loading) {
            return <Loading />
        }

        return (
            <Switch>

                <Route exact path="/logout" render={props => (
                    <Logout updateAuthState={this.updateAuthState} />
                )} />

                <Route exact path="/login" render={props => (
                    !user ? <Login updateAuthState={this.updateAuthState} /> : <Redirect to="/admin" />
                )} />

                <Route path="/admin" render={props => (
                    user ? <AdminConsole user={user} /> : <Redirect to="/login" />
                )} />

                <Route render={props => (
                    <Redirect to="/admin" />
                )} />

            </Switch>
        )
    }
}

export default withRouter(App);