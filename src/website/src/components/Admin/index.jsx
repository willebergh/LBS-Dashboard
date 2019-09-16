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

import { Switch, Route } from "react-router-dom";
import axios from "axios";

import Dashboards from "./dashboards";
import Users from "./users";
import Settings from "./settings";
import Deployments from './Deployments';

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

class Paperbase extends React.Component {
    constructor() {
        super();
        this.state = {
            mobileOpen: false,
            routes: [
                { path: "/admin/deployments", component: Deployments },
                { path: "/admin/dashboards", component: Dashboards },
                { path: "/admin/users", component: Users },
                { path: "/admin/settings", component: Settings },
            ]
        }

        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    }

    componentDidMount() {
        const uid = JSON.parse(localStorage.getItem("user")).uid;
        axios.get(`/admin/deployment/get-all/${uid}`)
            .then(res => {
                if (!res.data.deployments) {
                    this.setState({ deployments: "nothing" });
                } else {
                    this.setState({ deployments: res.data.deployments });
                }
            })
    }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    }

    render() {
        const { classes } = this.props;
        const { mobileOpen } = this.state;
        return (
            <ThemeProvider theme={theme} >
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
                            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
                        </Hidden>
                    </nav>
                    <div className={classes.app}>

                        <Header onDrawerToggle={this.handleDrawerToggle} />

                        <main className={classes.main}>

                            <Switch>
                                {
                                    this.state.routes.map(r => {
                                        return <Route path={r.path} component={r.component} />
                                    })
                                }
                            </Switch>

                        </main>

                        <footer className={classes.footer}>
                            <Copyright />
                        </footer>

                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

Paperbase.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paperbase);