import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";

const style = {
    container: {
        padding: 32,
    },
    header: {
        height: 72,
        borderRadius: 15,
    }
}

class Header extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.header}></div>
            </div>
        )
    }
}

export default withStyles(style)(Header);