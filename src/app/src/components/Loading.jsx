import React, { Component } from 'react';
import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const style = {
    loading: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000
    },
}

class Loading extends Component {
    render() {
        const { classes, position } = this.props;
        return (
            <div className={classes.loading} style={position ? { position } : { position: "fixed" }}>
                <CircularProgress />
            </div>
        )
    }
}

export default withStyles(style)(Loading);