import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { FormGroup, TextField, Button, Grid, Link } from "@material-ui/core";
import axios from "axios";

const styles = {
    form: {
        width: "100%",
    },
    formGroup: {
        margin: "16px 0"
    },
    otherActions: {
        marginTop: "-16px",
        padding: "8px 14px"
    },
    loginBtn: {
        marginTop: 48
    },
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
                this.props.updateAuthState(res.data.user);
            })
            .catch(err => console.log(err))
    }

    render() {
        const { classes } = this.props;
        const { username, password } = this.state;
        return (
            <form className={classes.form} onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <FormGroup className={classes.formGroup} >
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        name="username"
                        label="Username"
                        value={username}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup className={classes.formGroup}>
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

                <FormGroup className={classes.otherActions} >
                    <Grid container direction="row" justify="space-between">
                        <Grid item>
                            <Link>Forgot password</Link>
                        </Grid>
                        <Grid item>
                            <Link>I don't have an account</Link>
                        </Grid>
                    </Grid>
                </FormGroup>

                <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    className={classes.loginBtn}
                >
                    Login
                    </Button>
            </form>
        );
    }
}

export default withStyles(styles)(LoginForm);