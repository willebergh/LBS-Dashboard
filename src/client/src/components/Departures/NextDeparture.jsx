import React, { Component } from 'react';

class NextDeparture extends Component {

    formatDisplayTime() {
        const t = this.props.displayTime;

        if (t.charAt(2) === ":") {
            return (
                <div className="display">
                    <span className="int">
                        {t}
                    </span>
                </div>
            )
        } else if (t.toLowerCase() === "nu") {
            return (
                <div className="display">
                    <span className="int">
                        {t}
                    </span>
                </div>
            )
        } else {
            return (
                <div className="display">
                    <span className="int">
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