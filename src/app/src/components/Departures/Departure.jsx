import React, { Component } from 'react';

class Departure extends Component {
    render() {
        const { destination, displayTime, lineNumber } = this.props;
        return (
            <div className="departure fadeIn">
                <div>
                    <span className="lineNr">
                        {lineNumber}
                    </span>
                    <span className="destination">
                        {destination}
                    </span>
                </div>
                <div>
                    <span className="timeUntilDeparture">
                        {displayTime}
                    </span>
                </div>
            </div>
        );
    }
}

export default Departure;