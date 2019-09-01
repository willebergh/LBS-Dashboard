import React, { Component } from 'react';

class NextDeparture extends Component {

    formatDisplayTime() {
        const t = this.props.displayTime;

        if (t.charAt(2) === ":") {
            return (
                <div className="display" style={{ paddingTop: 16 }}>
                    <span className="int" style={{ fontSize: "4em" }}>
                        {t}
                    </span>
                </div>
            )
        } else if (t.toLowerCase() === "nu") {
            return (
                <div className="display">
                    <span className="int" style={{ fontSize: "8em" }}>
                        {t}
                    </span>
                </div>
            )
        } else {
            return (
                <div className="display">
                    <span className="int" style={{ marginLeft: 25, fontSize: "8em" }}>
                        {t.split(" ")[0]}
                    </span>
                    <span className="unit">
                        {t.split(" ")[1]}
                    </span>
                </div>
            )
        }

    }

    render() {
        return (
            <div className="nextDeparture">
                <div className="header">
                    <span>Next departure in...</span>
                </div>

                {this.formatDisplayTime()}

            </div>
        );
    }
}

export default NextDeparture;