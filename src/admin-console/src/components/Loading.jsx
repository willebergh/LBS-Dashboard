import React, { Component } from 'react';
import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const style = {
    loading: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
}

class Loading extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }
}

export default withStyles(style)(Loading);