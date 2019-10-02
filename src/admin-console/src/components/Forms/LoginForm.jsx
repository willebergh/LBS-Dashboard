import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { FormGroup, TextField, Button, Grid, Link, CircularProgress } from "@material-ui/core";
import axios from "axios";
import Loading from "../Loading";

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
            error: null,
            loading: false
        }
    }

    handleChange = e => {
        if (this.state.error) this.setState({ error: false });
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        this.setState({ loading: true })
        e.preventDefault();
        axios.post("/api/auth/login", {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                this.setState({ loading: false })
                this.props.updateAuthState(res.data.user)
            })
            .catch(err => this.setState({ loading: false, error: true }))
    }

    render() {
        const { classes } = this.props;
        const { username, password, loading, error } = this.state;
        return (
            <React.Fragment>
                {loading ? <Loading position="absolute" /> : null}
                <form className={classes.form} onSubmit={this.handleSubmit} noValidate autoComplete="off">
                    <FormGroup className={classes.formGroup} >
                        <TextField
                            fullWidth
                            type="text"
                            margin="dense"
                            variant="outlined"
                            name="username"
                            label="Username"
                            value={username}
                            error={error}
                            disabled={loading}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup className={classes.formGroup}>
                        <TextField
                            fullWidth
                            type="password"
                            margin="dense"
                            variant="outlined"
                            name="password"
                            label="Password"
                            value={password}
                            error={error}
                            disabled={loading}
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
                        disabled={loading}
                        className={classes.loginBtn}
                    >
                        Login
                    </Button>
                </form >
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(LoginForm);