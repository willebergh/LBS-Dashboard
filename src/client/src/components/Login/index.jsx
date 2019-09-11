import React, { Component } from 'react';
import fire from "../../config/fire";
import { Redirect } from "react-router-dom";
import "./style.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: null,
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(data => this.setState({ redirect: true }))
            .catch(err => console.log(err))
    }

    render() {
        if (this.state.redirect) return <Redirect to="/" />
        return (
            <div className="login-container">
                <span className="login-title">LBS-Dashboard Login</span>
                <form className="login-form">
                    <input className="login-input" type="text" name="email" onChange={this.handleChange} value={this.state.email} placeholder="email" />
                    <input className="login-input" type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="password" />
                    <button className="login-button" onClick={this.onSubmit}>login</button>
                </form>
            </div>
        );
    }
}

export default Login;