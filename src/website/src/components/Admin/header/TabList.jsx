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
        const path = window.location.pathname.replace(/\//gi, ",/").split(",");
        const menuLink = path.length - 2;
        return (
            <Tabs onChange={this.handleChange} value={this.props.history.location.pathname}>

                {
                    tabLinks[path[menuLink].toLowerCase()].map(link => {
                        return <Tab label={link.label} value={path[1] + (path.length > 4 ? path[2] : "") + path[menuLink] + link.value} />
                    })
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
    "/users": [
        { label: "Overuuuview", value: "/overview" },
    ],
    "/settings": [
        { label: "Oversssview", value: "/overview" },
    ]
}

export default withRouter(TabList);