import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Navigator from './Navigator';
import Header from './header';

import { CircularProgress } from "@material-ui/core"

import { Switch, Route } from "react-router-dom";
import axios from "axios";

import Users from "./users";
import Settings from "./settings";
import Deployment from './Deployment';

import io from "socket.io-client";
const socket = io("http://localhost:5000/admin");

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                LBS-Dashboard
                </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

let theme = createMuiTheme({
    palette: {
        primary: {
            light: '#63ccff',
            main: '#009be5',
            dark: '#006db3',
        },
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
    },
    shape: {
        borderRadius: 8,
    },
    props: {
        MuiTab: {
            disableRipple: true,
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
});

theme = {
    ...theme,
    overrides: {
        MuiDrawer: {
            paper: {
                backgroundColor: '#18202c',
            },
        },
        MuiButton: {
            label: {
                textTransform: 'none',
            },
            contained: {
                boxShadow: 'none',
                '&:active': {
                    boxShadow: 'none',
                },
            },
        },
        MuiTabs: {
            root: {
                marginLeft: theme.spacing(1),
            },
            indicator: {
                height: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                backgroundColor: theme.palette.common.white,
            },
        },
        MuiTab: {
            root: {
                textTransform: 'none',
                margin: '0 16px',
                minWidth: 0,
                padding: 0,
                [theme.breakpoints.up('md')]: {
                    padding: 0,
                    minWidth: 0,
                },
            },
        },
        MuiIconButton: {
            root: {
                padding: theme.spacing(1),
            },
        },
        MuiTooltip: {
            tooltip: {
                borderRadius: 4,
            },
        },
        MuiDivider: {
            root: {
                backgroundColor: '#404854',
            },
        },
        MuiListItemText: {
            primary: {
                fontWeight: theme.typography.fontWeightMedium,
            },
        },
        MuiListItemIcon: {
            root: {
                color: 'inherit',
                marginRight: 0,
                '& svg': {
                    fontSize: 20,
                },
            },
        },
        MuiAvatar: {
            root: {
                width: 32,
                height: 32,
            },
        },
    },
};

const drawerWidth = 256;

const styles = {
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    loading: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    app: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        flex: 1,
        padding: theme.spacing(6, 4),
        background: '#eaeff1',
    },
    footer: {
        padding: theme.spacing(2),
        background: '#eaeff1',
    },
};

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            mobileOpen: false,
            routes: [
                { path: "/admin/users", component: Users },
                { path: "/admin/settings", component: Settings },
                { path: "/admin/:deployment", component: Deployment },
            ],
            deployments: [],
            loading: false,
        }

        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    }

    componentWillMount() {
        this.setState({ loading: true })
    }

    componentDidMount() {
        axios.get(`/api/user/get-deployments`)
            .then(res => this.setState({ deployments: res.data, loading: false }))
            .catch(err => console.log(err));
    }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    }

    render() {
        const { classes } = this.props;
        const { mobileOpen } = this.state;
        return (

            <ThemeProvider theme={theme} >
                {
                    this.state.loading ? (
                        <div className={classes.loading}>
                            <CircularProgress />
                        </div>
                    ) : (
                            <div className={classes.root}>
                                <CssBaseline />
                                <nav className={classes.drawer}>
                                    <Hidden smUp implementation="js">
                                        <Navigator
                                            PaperProps={{ style: { width: drawerWidth } }}
                                            variant="temporary"
                                            open={mobileOpen}
                                            onClose={this.handleDrawerToggle}
                                        />
                                    </Hidden>
                                    <Hidden xsDown implementation="css">
                                        <Navigator PaperProps={{ style: { width: drawerWidth } }} deployments={this.state.deployments} />
                                    </Hidden>
                                </nav>
                                <div className={classes.app}>

                                    <Header onDrawerToggle={this.handleDrawerToggle} />

                                    <main className={classes.main}>

                                        <Switch>

                                            <Route path={"/admin/users"} render={(props) => <Users {...props} />} />
                                            <Route path={"/admin/settings"} render={(props) => <Settings {...props} />} />
                                            <Route path={"/admin/:deployment"} render={(props) => (
                                                <Deployment deployments={this.state.deployments} socket={socket} {...props} />
                                            )} />

                                        </Switch>

                                    </main>

                                    <footer className={classes.footer}>
                                        <Copyright />
                                    </footer>

                                </div>
                            </div>
                        )
                }
            </ThemeProvider>
        );
    }
}

Admin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);