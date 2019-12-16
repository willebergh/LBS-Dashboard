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

                <Route exact path={["/admin", "/admin/new-deployment", "/admin/profile"]} render={props => (
                    <Tabs value={0}>
                        <Tab value={0} />
                    </Tabs>
                )
                } />

                <Route path="/admin/settings" render={props => (
                    <Tabs onChange={this.handleChange} value={this.props.location.pathname}>
                        <Tab label="Account" value="/admin/settings/account" />
                    </Tabs>
                )} />

                <Route path="/admin/global" render={props => (
                    <Tabs onChange={this.handleChange} value={this.props.location.pathname}>
                    </Tabs>
                )} />

                < Route path="/admin/:deployment" render={props => (
                    <Tabs onChange={this.handleChange} value={this.props.history.location.pathname}>
                        <Tab label="Dashboards" value={`/admin/${props.match.params.deployment}/dashboards`} />
                        <Tab label="Config" value={`/admin/${props.match.params.deployment}/config`} />
                    </Tabs>
                )} />


            </Switch >
        )
    }
}

export default withRouter(TabList);