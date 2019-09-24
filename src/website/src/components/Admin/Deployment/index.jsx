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
        const { deployments, socket } = this.props;
        return (
            <Switch>

                {
                    deployments.map((deployment, i) => {
                        return (
                            <Route
                                key={i}
                                path={`/admin/${deployment.name}/dashboards`}
                                render={props => (
                                    <Dashboards deployment={deployment} socket={socket} {...props} />
                                )}
                            />
                        );
                    })
                }

            </Switch>
        );
    }
}

export default Deployment;