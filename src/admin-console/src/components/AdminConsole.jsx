import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { CssBaseline, Hidden, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import io from "socket.io-client";
import axios from "axios";

import { theme } from "./Theme";
import Loading from "./Loading";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Home from "./Home";
import Profile from "./Profile";
import Settings from "./settings";
import Deployment from './Deployment';
import DeploymentConfigForm from "./Forms/DeploymentConfigForm";
import Copyright from "./Copyright";

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
            loginRedirect: false
        }

        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.updateDeployments = this.updateDeployments.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.initSocket();
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

    render() {
        const { classes, user } = this.props;
        const { loading, loginRedirect, mobileOpen } = this.state;
        return (

            <div>
                {loading ? <Loading />
                    : loginRedirect ? <Redirect to="/login" />
                        : <div className={classes.root}>
                            <CssBaseline />
                            <nav className={classes.drawer}>
                                <Hidden smUp implementation="js">
                                    <Sidebar
                                        PaperProps={{ style: { width: drawerWidth } }}
                                        variant="temporary"
                                        open={mobileOpen}
                                        onClose={this.handleDrawerToggle}
                                        deployments={this.state.deployments}
                                    />
                                </Hidden>
                                <Hidden xsDown implementation="css">
                                    <Sidebar PaperProps={{ style: { width: drawerWidth } }} deployments={this.state.deployments} />
                                </Hidden>
                            </nav>
                            <div className={classes.app}>

                                <Header user={user} onDrawerToggle={this.handleDrawerToggle} />

                                <main className={classes.main}>

                                    <Switch>

                                        <Route exact path="/admin" render={props => <Home deployments={this.state.deployments} {...props} />} />
                                        <Route exact path="/admin/new-deployment" render={props => (
                                            <DeploymentConfigForm newDeployment updateDeployments={this.updateDeployments} {...props} />
                                        )} />
                                        <Route path={"/admin/profile"} render={(props) => <Profile user={user} {...props} />} />
                                        <Route path={"/admin/settings"} render={(props) => <Settings {...props} />} />
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