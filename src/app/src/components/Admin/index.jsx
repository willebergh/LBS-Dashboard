import React, { Component } from 'react';
import fire from "../../config/fire";
import Login from "../Login/";

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
        }
        this.authListener = this.authListener.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged(user => {
            console.log(user);
            if (user) {
                this.setState({ user });
                localStorage.setItem("user", user.uid);
            } else {
                this.setState({ user: null });
                localStorage.removeItem("user");
            }
        })
    }

    render() {
        if (!this.state.user) {
            return <Login />
        } else {
            if (this.state.user.email === "willebergh@outlook.com") {
                return (
                    <div>
                        <h1>Welcome back boss.</h1>
                    </div>
                )
            }
        }

        return (
            <Login />
        )

    }
}

export default Admin;