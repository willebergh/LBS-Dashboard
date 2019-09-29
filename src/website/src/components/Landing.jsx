import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core/";
import DashboardPreview from "./DashboardPreview/DashboardPreview";

const style = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    landingTextContainer: {
        margin: "150px 0",
        textAlign: "center"
    },
    landingTitle: {
        fontSize: 48,
    },
    landingText: {
        fontSize: 36,
        fontWeight: 400,
    },

}

class Landing extends Component {
    constructor() {
        super();
        this.state = {

        }

    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>

                <div className={classes.landingTextContainer}>
                    <h1 className={classes.landingTitle}>LBS-Dashboard</h1>
                    <h1 className={classes.landingText}>Simply look & go.</h1>
                    <Button variant="contained" color="primary">Buy Now</Button>
                </div>

                <DashboardPreview />
            </div>
        )
    }
}

export default withStyles(style)(Landing);