import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Overview from "./Overview";
import Test from "./Test";

class Dashboards extends Component {
    render() {
        return (
            <Switch>

                <Route
                    path="/admin/:deployment/dashboards/overview"
                    render={(props) => <Overview deployment={this.props.deployment} {...props} />}
                />
                <Route
                    path="/admin/:deployment/dashboards/test"
                    component={Test}
                />

            </Switch>
        );
    }
}

export default Dashboards;