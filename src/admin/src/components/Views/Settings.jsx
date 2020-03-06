import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Account from "../Tabs/Account";

class Settings extends Component {
    render() {
        return (
            <Switch>

                <Route exact path="/admin/settings/account" render={props => (
                    <Account />
                )} />

            </Switch>
        );
    }
}

export default Settings;