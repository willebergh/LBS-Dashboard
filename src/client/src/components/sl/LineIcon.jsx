import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, ListItemText } from "@material-ui/core";

class LineIcon extends Component {
    constructor(props) {
        super(props);
    }

    getLineColor = (GroupOfLine) => {
        const GoL = GroupOfLine;
        if (!GoL) return "red"
        if (GoL === "blåbuss") return "blue"
    }

    render() {
        return (
            <Chip label={
                this.props.lineNumber
            } style={{
                color: "#fff",
                fontWeight: "bolder",
                fontSize: 16,
                backgroundColor: this.getLineColor(this.props.groupOfLine)
            }} />
        );
    }
}

export default LineIcon;