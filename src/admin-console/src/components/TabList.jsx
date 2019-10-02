import React, { Component } from 'react';
import { Tabs, Tab } from "@material-ui/core";
import { withRouter, Switch, Route } from "react-router-dom";

class TabList extends Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, value) {
        this.props.history.push(value);
    }

    render() {
        return (
            <Switch>

                <Route path={["/admin/new-deployment", "/admin/profile", "/admin/settings"]} render={props => (
                    <Tabs>
                        <Tab />
                    </Tabs>
                )} />

                <Route path="/admin/:deployment" render={props => (
                    <Tabs onChange={this.handleChange} value={this.props.history.location.pathname}>
                        <Tab label="Dashboards" value={`/admin/${props.match.params.deployment}/dashboards`} />
                        <Tab label="Config" value={`/admin/${props.match.params.deployment}/config`} />
                    </Tabs>
                )} />


            </Switch>
        )
    }
}

export default withRouter(TabList);