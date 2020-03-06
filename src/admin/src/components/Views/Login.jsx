import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";

import Logo from "../Logo";
import LoginForm from "../Forms/LoginForm";

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

class Login extends Component {

    updateAuthState = user => {
        this.props.updateAuthState(user);
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid className={classes.container} container direction="column">

                <Grid item >
                    <Logo theme="dark" inline />
                </Grid>

                <Grid item xs="12" >
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant="h5">
                            Login
                            </Typography>
                        <LoginForm updateAuthState={this.updateAuthState} />
                    </Paper>
                </Grid>

            </Grid>
        );
    }
}

export default withRouter(withStyles(styles)(Login));