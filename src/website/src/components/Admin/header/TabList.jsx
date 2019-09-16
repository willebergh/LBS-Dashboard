import React, { Component } from 'react';
import { Tabs, Tab } from "@material-ui/core";

class TabList extends Component {
    constructor() {
        super();
        this.state = {
            tabs: [],
            currentTab: null
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({ tabs: props.tabs, currentTab: props.currentTab });
    }

    handleClick(e) {
        this.setState({ currentTab: e.target.index })
    }

    render() {
        return (
            <Tabs value={this.state.currentTab}>
                {
                    this.state.tabs.map((tab, i) => {
                        return (
                            <Tab onCLick={this.handleClick} label={tab.label} index={i} />
                        )
                    })
                }
            </Tabs>
        )
    }
}

const tabs = {
    "/admin/dashboars": [
        "add",
        "test",
        "something-else"
    ]
}


export default TabList;