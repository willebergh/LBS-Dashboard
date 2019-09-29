import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const style = theme => ({
    container: {
        padding: 64
    },
    grid: {
        justifyContent: "space-around",
        textAlign: "center",
    },
    item: {
        marginBottom: 32
    },
    title: {
        textTransform: "uppercase",
        marginBottom: 8,
    },
    trademark: {
        justifyContent: "center",
        textAlign: "center"
    },
})

class Footer extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Grid className={classes.grid} container spacing={3}>

                    <Grid className={classes.grid} container>
                        <Grid className={classes.item} item>
                            <Typography className={classes.title} variant="h6" component="h1">lbs-dashboard</Typography>
                            <Typography variant="p">
                                A perfectly engineered <br />piece of software on your wall.
                            </Typography>
                        </Grid>

                        <Grid className={classes.item} item>
                            <Typography className={classes.title} variant="h6" component="h1">have you?</Typography>
                            <Typography variant="p">
                                Checked out the <Link to="/demo">dashboard demo</Link>?<br />
                                Played around with the <Link to="/dashboard">desktop version</Link>?<br />
                                If you haven't, you should.
                            </Typography>
                        </Grid>

                        <Grid className={classes.item} item>
                            <Typography className={classes.title} variant="h6" component="h1">contact</Typography>
                            <Typography variant="p">
                                You can contact us by email:<br />
                                <a href="mailto:willebergh@outlook.com">willebergh@outlook.com</a><br />
                                <a href="mailto:henry.dickenson@lbs.se">henry.dickenson@lbs.se</a>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid className={classes.trademark} container spacing={1}>
                        <Grid item>
                            This site was published by
                            </Grid>
                        <Grid item>
                            <a href="https://willebergh.io" target="_blank" rel="noopener noreferrer">William Bergh</a>
                            {" & "}
                            <a href="https://www.lbs.se/stockholmnorra/" target="_blank" rel="noopener noreferrer">LBS Stockholm Norra</a>.
                            </Grid>
                    </Grid>

                </Grid>
            </div >
        );
    }
}

export default withStyles(style)(Footer);