import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
    TextField, Button, FormGroup,
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Loading from "../Loading";

const styles = {
    form: {
        width: "100%",
    },
    formGroup: {
        margin: "16px 0"
    },
    registerBtn: {
        marginTop: 48
    },
}

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            fullName: "",
            password: "",
            passwordRepeat: "",
            loading: false,
            redirect: false
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        this.setState({ loading: true });
        e.preventDefault();
        const token = window.location.pathname.split("/")[2];
        const { fullName, username, password } = this.state;
        axios.post(`/api/auth/register/${token}`, { fullName, username, password })
            .then(res => {
                if (res.data.msg === "success") {
                    this.setState({ loading: false });
                    console.log(res.data.user)
                    return this.props.updateAuthState(res.data.user);
                }
                this.setState({ loading: false });
            })
            .catch(err => {
                this.setState({ loading: false });
            })
    }

    render() {
        const { classes, email } = this.props;
        const { username, fullName, password, passwordRepeat, loading, redirect } = this.state;
        return (
            <React.Fragment>
                {loading ? <Loading /> : null}
                {redirect ? <Redirect to="/login" /> : null}
                <form className={classes.form} onSubmit={this.handleSubmit} noValidate autoComplete="off">
                    <FormGroup className={classes.formGroup}>
                        <TextField
                            disabled
                            margin="dense"
                            variant="outlined"
                            label="Email Address"
                            value={email}
                        />
                        <TextField
                            disabled={loading}
                            type="text"
                            margin="dense"
                            variant="outlined"
                            name="fullName"
                            label="Full Name"
                            value={fullName}
                            onChange={this.handleChange}
                            helperText="Enter your first and last name"
                        />
                        <TextField
                            disabled={loading}
                            type="text"
                            margin="dense"
                            variant="outlined"
                            name="username"
                            label="Username"
                            value={username}
                            onChange={this.handleChange}
                            helperText="Enter a username"
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <TextField
                            disabled={loading}
                            type="password"
                            margin="dense"
                            variant="outlined"
                            name="password"
                            label="Password"
                            value={password}
                            onChange={this.handleChange}
                            helperText="Enter a password"
                        />
                        <TextField
                            disabled={loading}
                            type="password"
                            margin="dense"
                            variant="outlined"
                            name="passwordRepeat"
                            label="Repeat password"
                            value={passwordRepeat}
                            onChange={this.handleChange}
                            helperText="Please repeat your password"
                        />
                    </FormGroup>

                    <Button
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        className={classes.registerBtn}
                    >
                        Register
                    </Button>
                </form>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(RegisterForm);