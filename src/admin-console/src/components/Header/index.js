import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Menu as MenuIcon, Notifications as NotificationsIcon } from "@material-ui/icons";
import { Typography, Tooltip, Toolbar, Link, IconButton, Hidden, Grid, Avatar, AppBar } from '@material-ui/core';

import TabList from "./TabList";

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
    secondaryBar: {
        zIndex: 0,
    },
    menuButton: {
        marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
        padding: 4,
    },
    link: {
        textDecoration: 'none',
        color: lightColor,
        '&:hover': {
            color: theme.palette.common.white,
        },
    },
    button: {
        borderColor: lightColor,
    },
});

function Title() {
    const str = window.location.pathname.split("/")[2];
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

class Header extends Component {

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {

        }
    }

    render() {
        const { classes, onDrawerToggle, user } = this.props;
        return (
            <React.Fragment>
                <AppBar color="primary" position="sticky" elevation={0}>
                    <Toolbar>
                        <Grid container spacing={1} alignItems="center">
                            <Hidden smUp>
                                <Grid item>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={onDrawerToggle}
                                        className={classes.menuButton}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                            </Hidden>
                            <Grid item xs />
                            <Grid item>
                                {user.fullName}
                            </Grid>
                            <Grid item>
                                <IconButton color="inherit" className={classes.iconButtonAvatar}>
                                    <Avatar src={user.avatarUrl} alt="User avatar" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <AppBar
                    component="div"
                    className={classes.secondaryBar}
                    color="primary"
                    position="static"
                    elevation={0}
                >
                    <Toolbar>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs>
                                <Typography color="inherit" variant="h5" component="h1">
                                    <Title />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <AppBar
                    component="div"
                    className={classes.secondaryBar}
                    color="primary"
                    position="static"
                    elevation={0}
                >
                    <TabList />
                </AppBar>
            </React.Fragment>
        );
    }

}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);