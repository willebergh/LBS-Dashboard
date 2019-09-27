import React, { Component } from 'react';
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

    }

    render() {
        return this.state.redirect ? <Redirect to="/login" /> : null;
    }
}

export default Logout;