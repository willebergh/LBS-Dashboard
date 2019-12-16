import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import io from "socket.io-client";
import axios from "axios";

import { theme } from "../Theme";
import Loading from "../Loading";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import Home from "./Home";
import Profile from "./Profile";
import Settings from "./Settings";
import Deployment from '../Deployment';
import DeploymentConfigForm from "../Forms/DeploymentConfigForm";
import Copyright from "../Copyright";
import GlobalAdmin from "./GlobalAdmin";
import Snackbar from "../Snackbar";

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

class AdminConsole extends Component {
    constructor() {
        super();
        this.state = {
            mobileOpen: false,
            deployments: [],
            loading: false,
            loginRedirect: false,
            snackbar: {
                open: false,
                message: "",
            }
        }

        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.updateDeployments = this.updateDeployments.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        const loop = setInterval(() => {
            console.log(this.props.user)
            if (this.props.user) {
                clearInterval(loop);
                this.initSocket();
            }
        }, 100)
    }

    initSocket() {
        const socket = io("/admin");
        socket.on("error", err => {
            console.log(err);
        });
        socket.on("connect", () => {
            console.log("Successfully connected to socket!");
            this.socket = socket; this.setState({ loading: false });
            this.updateDeployments();
        });
    }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    }

    updateDeployments(callback) {
        this.setState({ loading: true });
        axios.get(`/api/user/get-deployments`)
            .then(res => {
                this.setState({ deployments: res.data.deployments, loading: false });
                if (typeof callback === "function") callback();
            })
            .catch(err => console.log(err));
    }

    openSnackbar = (message, variant) => {
        this.setState({ snackbar: { ...this.state.snackbar, open: true, message, variant } })
    }

    handleSnackbarClose = () => {
        this.setState({ snackbar: { ...this.state.snackbar, open: false } })
    }

    render() {
        const { classes, user } = this.props;
        const { loading, loginRedirect, mobileOpen, snackbar } = this.state;
        return (

            <div>
                {loading ? <Loading />
                    : loginRedirect ? <Redirect to="/login" />
                        : <div className={classes.root}>
                            <Snackbar
                                open={snackbar.open}
                                message={snackbar.message}
                                variant={snackbar.variant}
                                onClose={this.handleSnackbarClose}
                                anchorOrigin={{ vertical: "top", horizontal: "right", }}
                            />
                            <nav className={classes.drawer}>
                                <Hidden smUp implementation="js">
                                    <Sidebar
                                        PaperProps={{ style: { width: drawerWidth } }}
                                        variant="temporary"
                                        open={mobileOpen}
                                        onClose={this.handleDrawerToggle}
                                        deployments={this.state.deployments}
                                        isAdmin={this.props.user.roles.user === "admin"}
                                    />
                                </Hidden>
                                <Hidden xsDown implementation="css">
                                    <Sidebar PaperProps={{ style: { width: drawerWidth } }} deployments={this.state.deployments} isAdmin={this.props.user.roles.user === "admin"} />
                                </Hidden>
                            </nav>
                            <div className={classes.app}>

                                <Header user={user} onDrawerToggle={this.handleDrawerToggle} deployments={this.state.deployments} />

                                <main className={classes.main}>

                                    <Switch>

                                        <Route exact path="/admin" render={props => <Home deployments={this.state.deployments} {...props} />} />
                                        <Route exact path="/admin/new-deployment" render={props => (
                                            <DeploymentConfigForm newDeployment updateDeployments={this.updateDeployments} {...props} />
                                        )} />
                                        <Route path={"/admin/profile"} render={(props) => <Profile user={user} {...props} />} />
                                        <Route path={"/admin/settings"} render={(props) => <Settings {...props} />} />

                                        {this.props.user.roles.user === "admin" ? (
                                            <Route path="/admin/global" render={props => (
                                                <GlobalAdmin {...props} openSnackbar={this.openSnackbar} />
                                            )} />
                                        ) : null}

                                        {this.state.deployments.length !== 0 ? (
                                            <Route path={"/admin/:deployment"} render={(props) => (
                                                <Deployment
                                                    deployment={this.state.deployments.find(d => d.name === props.match.params.deployment)}
                                                    updateDeployments={this.updateDeployments}
                                                    socket={this.socket} {...props}
                                                />
                                            )} />
                                        ) : null}

                                    </Switch>

                                </main>

                                <footer className={classes.footer}>
                                    <Copyright />
                                </footer>

                            </div>
                        </div>}
            </div>
        );
    }
}

AdminConsole.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminConsole);