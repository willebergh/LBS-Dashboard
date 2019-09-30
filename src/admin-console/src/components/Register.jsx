import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

import RegisterForm from "./Forms/RegisterForm";

const styles = {
    paper: {
        maxWidth: 600,
        margin: 'auto',
        overflow: 'hidden',
        padding: 32
    },
}

class Register extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>

            </Paper>
        );
    }
}

export default withStyles(styles)(Register);