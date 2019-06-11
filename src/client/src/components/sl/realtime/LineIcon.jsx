import React, { Component } from 'react';

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
            <span style={{ width: 10, height: 10, backgroundColor: this.getLineColor(this.props.groupOfLine) }}>
                {this.props.lineNumber}
            </span>
        );
    }
}

export default LineIcon;