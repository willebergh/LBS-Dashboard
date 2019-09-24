import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

// Components
import Dashboards from "./Dashboards/";
import DeploymentConfigForm from "../Forms/DeploymentConfigForm";

class Deployment extends Component {
    constructor() {
        super();
        this.state = {

        }
        this.findDeployment = this.findDeployment.bind(this);
    }

    findDeployment(name) {
        return this.props.deployments.find(d => d.name === name);
    }

    render() {
        const { deployment, socket } = this.props;
        return (
            <Switch>

                <Route path={"/admin/:deployment/dashboards"} render={props => (
                    <Dashboards deployment={deployment} socket={socket} {...props} />
                )} />

                <Route path="/admin/:deployment/config" render={props => (
                    <DeploymentConfigForm deployment={deployment} socket={socket} {...props} />
                )} />

            </Switch>
        );
    }
}

export default Deployment;