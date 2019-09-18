import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Dashboards from "./Dashboards/";

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
        return (
            <Switch>

                <Route
                    path="/admin/:deployment/dashboards"
                    render={(props) => (
                        <Dashboards deployment={this.findDeployment(props.match.params.deployment)}{...props} />
                    )}
                />

            </Switch>
        );
    }
}

export default Deployment;