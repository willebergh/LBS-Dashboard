import React, { Component } from 'react';
import fire from "../../config/fire";
import { Redirect } from "react-router-dom";
import { Form, Button, Row } from "react-bootstrap";
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

    componentDidMount() {
        if (localStorage.getItem("user")) this.setState({ redirect: true })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(data => this.setState({ redirect: true }))
            .catch(err => {
                this.setState({ errorMsg: err.message, errorCode: err.code })
                console.log(err)
            })
    }

    render() {
        const { errorCode, errorMsg } = this.state;
        if (this.state.redirect) return <Redirect to="/" />
        return (
            <div class="container" style={style}>
                <Form noValidate onSubmit={this.onSubmit}>
                    <Form.Group as={Row} md="10" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control isInvalid={errorCode ? true : false} type="text" placeholder="Enter email" name="email" onChange={this.handleChange} value={this.state.email} />
                    </Form.Group>

                    <Form.Group as={Row} md="10" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control isInvalid={errorCode ? true : false} type="password" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} />
                        <Form.Control.Feedback type="invalid">
                            Wrong username or password
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Button variant="primary" type="submit" value="login" className="m-auto d-block col mt-3">
                            Login
                    </Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%)",
}

export default Login;