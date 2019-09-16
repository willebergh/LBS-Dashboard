import React, { Component } from 'react';
import { Tabs, Tab } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

class TabList extends Component {
    constructor() {
        super();
        this.state = {
            tabs: [],
            currentTab: 0
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, value) {
        this.setState({ currentTab: value });
    }

    render() {
        return (
            <Tabs onChange={this.handleChange} value={this.state.currentTab}>

                <Tab index={0} label="Overview" />

            </Tabs>
        )
    }
}

export default TabList;