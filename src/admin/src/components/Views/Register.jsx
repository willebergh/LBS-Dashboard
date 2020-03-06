import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Logo from "../Logo";
import RegisterForm from "../Forms/RegisterForm";

const styles = {
    container: {
        minHeight: "100vh",
    },
    paper: {
        position: "relative",
        maxWidth: 400,
        margin: "auto",
        padding: 32,
    },
    title: {
        marginBottom: 48,
        textAlign: "center"
    }
}

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            error: null
        }
    }

    componentDidMount() {
        axios.get(`/api/auth/new-user/${this.props.match.params.token}`)
            .then(res => {
                this.setState({ email: res.data.user.email });
            })
            .catch(err => {
                this.setState({ error: "invalid-token" });
            })
    }

    updateAuthState = user => {
        this.props.updateAuthState(user);
    }

    render() {
        const { classes } = this.props;

        if (this.state.error) {
            return <Redirect to={{
                pathname: "/login",
                state: { from: "/admin" }
            }} />
        }

        return (
            <Grid className={classes.container} container direction="column">

                <Grid item >
                    <Logo theme="dark" inline />
                </Grid>

                <Grid item xs="12" >
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant="h5">
                            Register your account
                            </Typography>
                        <RegisterForm updateAuthState={this.updateAuthState} email={this.state.email} />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Register);