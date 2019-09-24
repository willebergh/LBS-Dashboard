import React, { Component } from 'react';
import { Tabs, Tab } from "@material-ui/core";
import { withRouter } from "react-router-dom";

class TabList extends Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, value) {
        this.props.history.push(value);
    }

    render() {
        const path = window.location.pathname.replace(/\//gi, ",/").split(",");
        const menuLink = path.length - 2;
        return (
            <Tabs onChange={this.handleChange} value={this.props.history.location.pathname}>

                {
                    tabLinks[path[menuLink].toLowerCase()] ? tabLinks[path[menuLink].toLowerCase()].map((link, i) => {
                        return <Tab key={i} label={link.label} value={path[1] + (path.length > 4 ? path[2] : "") + path[menuLink] + link.value} />
                    }) : null
                }

            </Tabs>
        )
    }
}

const tabLinks = {
    "/dashboards": [
        { label: "Overview", value: "/overview" },
        { label: "Test", value: "/test" }
    ],
    "/config": [
        { label: "Deployment", value: "/deployment" },
    ],
    "/users": [
        { label: "Overview", value: "/overview" },
    ],
    "/settings": [
        { label: "Overview", value: "/overview" },
    ]
}

export default withRouter(TabList);