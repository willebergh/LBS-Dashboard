import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Menu as MenuIcon } from "@material-ui/icons";
import { Typography, Toolbar, IconButton, Hidden, Grid, AppBar } from '@material-ui/core';

import HeaderTitle from "./HeaderTitle";
import TabList from "../TabList";
import ProfileDropdown from "../Menus/ProfileDropdown";

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
    AppBar: {
        paddingTop: theme.spacing(2),
    },
    menuButton: {
        marginLeft: -theme.spacing(1),
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

class Header extends Component {
    render() {
        const { classes, onDrawerToggle, user } = this.props;
        return (
            <React.Fragment>
                <AppBar
                    component="div"
                    className={classes.AppBar}
                    color="primary"
                    position="static"
                    elevation={0}
                >
                    <Toolbar>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs>
                                <Typography color="inherit" variant="h5" component="h1">
                                    <HeaderTitle deployments={this.props.deployments} />
                                </Typography>
                            </Grid>
                        </Grid>
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
                                <Typography>
                                    {user.fullName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <ProfileDropdown user={user} />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <AppBar
                    style={{ zIndex: 0 }}
                    component="div"
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