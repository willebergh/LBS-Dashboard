import React, { Component } from 'react';
import {
    Paper, Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
    paper: {
        maxWidth: 600,
        margin: 'auto',
        overflow: 'hidden',
        padding: 32
    },
}

class Home extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        const { classes, deployments } = this.props;
        return (
            <Paper className={classes.paper}>
                {deployments.length === 0 ? (
                    <div>
                        <Typography variant="h6" component="h3" style={{ textAlign: "center" }}>
                            Welcome!
                        </Typography>
                        <Typography component="p" style={{ textAlign: "center" }}>
                            You don't have access to any deployments yet. <br />
                            Start with creating one or get invited by another user.
                        </Typography>
                    </div>
                ) : (
                        <div>
                            <Typography variant="h6" component="h3" style={{ textAlign: "center" }}>
                                Welcome back boss!
                            </Typography>
                        </div>
                    )}
            </Paper>
        )
    }
}

export default withStyles(styles)(Home);