import React, { Component } from 'react';
import fire from "../config/fire";
import { Redirect } from "react-router-dom";

class Logout extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        fire.auth().signOut()
            .then((a) => console.log(a))
    }

    render() {
        return this.state.redirect ? <Redirect path="/" /> : "loading";
    }
}

export default Logout;