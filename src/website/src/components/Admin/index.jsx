import React, { Component } from 'react';
import { Spinner } from "react-bootstrap";
import fire from "../../config/fire";

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
        }
    }

    render() {
        const user = fire.auth().currentUser;

        if (user && user.email === "willebergh@outlook.com") {
            return (
                <div>
                    <h1>Welcome back boss.</h1>
                </div>
            )
        }

        return null;

    }
}

export default Admin;