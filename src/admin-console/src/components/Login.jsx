import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import axios from "axios";

import Logo from "./Logo";
import LoginForm from "./Forms/LoginForm";

const styles = {
    container: {
        minHeight: "100vh",
    },
    paper: {
        padding: 32,
    },
    title: {
        marginTop: 8,
        marginBottom: 32,
        textAlign: "center"
    }
}

class Login extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid className={classes.container} container direction="column" justify="center" alignItems="center">

                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item >
                        <Logo theme="dark" inline />
                    </Grid>
                </Grid>

                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs="12" sm="6" md="4" lg="3">
                        <Paper className={classes.paper}>
                            <Typography className={classes.title} variant="h5">
                                Login
                            </Typography>
                            <LoginForm />
                        </Paper>
                    </Grid>
                </Grid>

            </Grid>
        );
    }
}

export default withRouter(withStyles(styles)(Login));