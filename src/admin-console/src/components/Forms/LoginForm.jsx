import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { FormGroup, TextField, Button } from "@material-ui/core";
import axios from "axios";

const styles = {
    form: {
        width: "100%",
    },
    formGroup: {
        paddingBottom: 16
    },
    labelText: {
        padding: "0 14px"
    }
}

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        axios.post("/api/auth/login", {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                this.props.onLoginSuccess(res.data.user);
            })
            .catch(err => console.log(err))
    }

    render() {
        const { classes } = this.props;
        const { username, password } = this.state;
        return (
            <form className={classes.form} onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <FormGroup className={classes.formGroup}>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        name="username"
                        label="Username"
                        value={username}
                        onChange={this.handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        name="password"
                        label="Password"
                        value={password}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                >
                    Login
                </Button>
            </form>
        );
    }
}

export default withStyles(styles)(LoginForm);