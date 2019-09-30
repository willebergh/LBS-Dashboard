import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
    TextField, Button, FormGroup,
} from "@material-ui/core";
import axios from "axios";

const styles = {
    form: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    formGroup: {
        paddingBottom: 16
    },
    labelText: {
        padding: "0 14px"
    }
}

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            fullName: "",
            password: "",
            passwordRepeat: ""
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        const { classes, email } = this.props;
        const { username, fullName, password, passwordRepeat } = this.state;
        return (
            <form className={classes.form} onSubmit={this.handleSubmit} noValidate autoComplete="off">

                <FormGroup className={classes.formGroup}>
                    <TextField
                        margin="dense"
                        variant="outlined"
                        name="fullName"
                        label="Full Name"
                        value={fullName}
                        onChange={this.handleChange}
                        helperText="Enter your first and last name"
                    />
                    <TextField
                        margin="dense"
                        variant="outlined"
                        name="username"
                        label="Username"
                        value={username}
                        onChange={this.handleChange}
                        helperText="Enter a username"
                    />
                    <TextField
                        disabled
                        margin="dense"
                        variant="outlined"
                        label="Email Address"
                        value={email}
                        helperText="Your email address"
                    />
                </FormGroup>

                <FormGroup className={classes.formGroup}>
                    <TextField
                        margin="dense"
                        variant="outlined"
                        name="password"
                        label="Password"
                        value={password}
                        onChange={this.handleChange}
                        helperText="Enter a password"
                    />
                    <TextField
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
                    type="submit"
                    color="primary"
                    variant="contained"
                >
                    Register
                </Button>
                <Button
                    color="primary"
                >
                    Cancel
                </Button>
            </form>
        );
    }
}

export default withStyles(styles)(RegisterForm);