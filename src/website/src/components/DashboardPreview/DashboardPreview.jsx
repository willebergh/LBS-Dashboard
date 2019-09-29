import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import ScreenshotLight from "./screenshot-light.png"
import ScreenshotDark from "./screenshot-dark.png"
import zIndex from '@material-ui/core/styles/zIndex';

const style = {
    container: {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
    },
    frame: {
        padding: "30px 32px",
        borderRadius: 15,
        zIndex: 10
    },
    screenshot: {
        maxWidth: 430,
        borderRadius: 10,
        zIndex: 10
    },
    divider: {
        width: window.innerWidth * 2,
        height: 440,
        position: "absolute",
        top: "50%",
        transform: "rotate(10deg) translateY(-50%)"
    }
}

class DashboardPreview extends Component {
    render() {
        const { classes, light, dark } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.frame}>

                    {light ? (
                        <img className={classes.screenshot} src={ScreenshotLight} alt="Dashboard screenshot with a light theme" />
                    ) : (
                            <img className={classes.screenshot} src={ScreenshotDark} alt="Dashboard screenshot with a light theme" />
                        )}

                </div>
                <span className={classes.divider}></span>
            </div>
        )
    }
}

export default withStyles(style)(DashboardPreview);