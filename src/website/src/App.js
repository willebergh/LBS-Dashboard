import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import fire from "./config/fire";
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
        //this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                var userData = {
                    displayName: user.displayName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                    isAnonymous: user.isAnonymous,
                    uid: user.uid,
                    providerData: user.providerData,
                }
                axios({
                    method: "post",
                    url: "/api/auth/login",
                    data: { idToken: user.ma }
                });
                this.setState({ user: userData })
                localStorage.setItem("user", JSON.stringify(userData));
            } else {
                this.setState({ user: null })
                localStorage.removeItem("user")
            }
        })
    }

    render() {
        return (
            <Router>

                <Switch>
                    <Route path="/admin" component={Admin} />

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