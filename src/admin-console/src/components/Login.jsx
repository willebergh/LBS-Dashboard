import React, { Component } from 'react';
import axios from "axios";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post("/api/auth/login", {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                this.props.updateAuthState(res.data.user);
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" onChange={this.handleChange} />
                <input type="password" name="password" onChange={this.handleChange} />
                <button type="submit">login</button>
            </form>
        );
    }
}

export default Login;