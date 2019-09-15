import React, { Component } from 'react';
import fire from "../../config/fire";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Logout extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        fire.auth().signOut()
            .then(() => {
                axios.get("/api/auth/logout")
                    .then(() => this.setState({ redirect: true }))
            })
    }

    render() {
        return this.state.redirect ? <Redirect to="/login" /> : null;
    }
}

export default Logout;