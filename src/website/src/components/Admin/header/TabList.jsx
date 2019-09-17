import React, { Component, Fragment } from 'react';
import { Tabs, Tab } from "@material-ui/core";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import LinkButton from "../../LinkButton";

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
            <Tabs onChange={this.handleChange} value={this.props.history.location.pathname}>

                {
                    tabLinks[window.location.pathname.split("/")[2].toLowerCase()].map(link => {
                        return <Tab label={link.label} value={link.value} />
                    })
                }

            </Tabs>
        )
    }
}

const tabLinks = {
    "dashboards": [
        { label: "Overview", value: "/admin/dashboards/overview" },
        { label: "Test", value: "/admin/dashboards/test" }
    ],
    "users": [
        { label: "Overview", value: "/admin/users/overview" },
    ],
    "settings": [
        { label: "Overview", value: "/admin/settings/overview" },
    ]
}

export default withRouter(TabList);