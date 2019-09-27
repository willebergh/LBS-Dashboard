import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

// Components
import Dashboards from "./Dashboards";
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

        if (!deployment) {
            return (
                <Route render={props => (
                    <Redirect to="/admin" />
                )} />
            )
        }

        return (
            <Switch>

                <Route path={`/admin/${deployment.name}/dashboards`} render={props => (
                    <Dashboards deployment={deployment} socket={socket} {...props} />
                )} />

                <Route path={`/admin/${deployment.name}/config`} render={props => (
                    <DeploymentConfigForm updateDeployments={this.props.updateDeployments} deployment={deployment} socket={socket} {...props} />
                )} />



            </Switch>
        );
    }
}

export default Deployment;