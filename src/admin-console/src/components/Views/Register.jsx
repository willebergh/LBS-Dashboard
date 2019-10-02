import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";
import axios from "axios";

import RegisterForm from "../Forms/RegisterForm";

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        padding: 32,
        width: "100%",
        maxWidth: 500
    },
    title: {
        marginTop: 8,
        marginBottom: 32,
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

    render() {
        const { classes } = this.props;

        if (this.state.error) {
            return "error";
        }

        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.container}
            >
                <Grid item >
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant="h5">
                            Register your account
                        </Typography>
                        <RegisterForm email={this.state.email} />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Register);