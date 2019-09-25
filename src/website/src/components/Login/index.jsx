import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import "./style.css";
import axios from "axios";

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

    componentDidMount() {
        if (localStorage.getItem("user")) this.setState({ redirect: true })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value, errorCode: null, errorMsg: null })
    }

    onSubmit(e) {
        e.preventDefault();
        axios({
            method: "post",
            url: "/api/auth/login",
            data: {
                email: this.state.email,
                password: this.state.password
            }
        })
            .then(res => {
                if (res.data.user) {
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    this.setState({ redirect: true })
                }
            })
            .catch(err => {
                this.setState({ errorCode: true })
            })
    }

    render() {
        const { errorCode } = this.state;
        if (this.state.redirect) return <Redirect to="/" />
        return (
            <div className="container d-flex flex-column" style={{ marginTop: "-88px" }}>
                <div className="row align-items-center justify-content-center no-gutters min-vh-100">
                    <div className="col-12 col-md-5 col-lg-4">
                        <h1 className="mb-0 font-weight-bold text-center">Login</h1>
                        <p className="mb-6 text-center text-muted">LBS-Dashboard, simply look & go.</p>
                        <form className="mb-6" noValidate onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label for="email">Email Address</label>
                                <input
                                    type="text"
                                    name="email"
                                    id="login_email"
                                    autoComplete="off"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className={errorCode ? "form-control is-invalid" : "form-control"}
                                />
                            </div>
                            <div className="form-group mb-5">
                                <label for="password">Password</label>
                                <input type="password"
                                    name="password"
                                    id="login_password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    className={errorCode ? "form-control is-invalid" : "form-control"}
                                />
                                <div className="invalid-feedback">
                                    Wrong username or password
                                </div>
                            </div>
                            <button className="btn btn-block btn-primary" type="submit">
                                Sign in
                            </button>

                        </form>
                        <p className="mb-0 font-size-sm text-center text-muted">
                            Contact <a href="mailto:willebergh@outlook.com">willebergh@outlook.com</a> for more information.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;