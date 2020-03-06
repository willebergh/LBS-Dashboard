import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        margin: 32
    },
    logo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        flexFlow: "wrap"
    },
    text: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        fontSize: 32,
        color: "#EFEFEF",
        whiteSpace: "nowrap"
    }
}

function LogoSvg({ margin, themeColor }) {
    return (
        <svg style={margin ? { margin } : null} width="100" viewBox="0 0 396 170" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
                <rect x="283" width="76" height="95" rx="15" transform="rotate(90 283 0)" fill={themeColor} />
                <rect x="95" width="76" height="95" rx="15" transform="rotate(90 95 0)" fill={themeColor} />
                <rect x="170" width="76" height="57" rx="15" transform="rotate(90 170 0)" fill={themeColor} />
                <rect x="358" width="76" height="57" rx="15" transform="rotate(90 358 0)" fill={themeColor} />
                <rect x="283" y="94" width="76" height="57" rx="15" transform="rotate(90 283 94)" fill={themeColor} />
                <rect x="95" y="94" width="76" height="57" rx="15" transform="rotate(90 95 94)" fill={themeColor} />
                <rect x="208" y="94" width="76" height="95" rx="15" transform="rotate(90 208 94)" fill={themeColor} />
                <rect x="396" y="94" width="76" height="95" rx="15" transform="rotate(90 396 94)" fill={themeColor} />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="396" height="170" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}

class Logo extends Component {
    render() {
        const { classes, theme, inline, noText } = this.props;
        const themeColor = theme === "dark" ? "#202020" : "#EFEFEF";
        return (
            <div className={classes.container}>
                <div className={classes.logo} style={!inline ? { flexDirection: "column" } : null}>
                    <LogoSvg margin="0 16 0 0" themeColor={themeColor} />
                    {noText ? null : (
                        <span className={classes.text} style={{ color: themeColor }}>
                            LBS-Dashboard
                        </span>
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Logo);