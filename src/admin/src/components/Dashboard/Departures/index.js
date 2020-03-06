import React, { Component } from 'react';
import axios from "axios";

import Departure from "./Departure";
import NextDeparture from "./NextDeparture";

class NextDepartures extends Component {

    componentDidMount() {
        this.initState();
        this.initListener();
    }

    initState() {
        axios.get("/api/sl/realtime/3404")
            .then(res => this.setState({ data: res.data }))
            .then(() => this.props.hasLoaded("stations"))
    }

    initListener() {
        const socket = this.props.socket;
        socket.on("update-station", data => this.setState({ data }))
    }

    transportType() {
        var string = this.props.transportType.toLowerCase();
        string === "bus" ? string = string + "es" : string = string + "s";
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        if (!this.state) return null;
        const departures = this.state.data[this.transportType()];
        return (
            <div id="slRealTime">
                <div className="station">
                    <div>
                        <div className="header fadeIn">
                            <span>
                                {this.transportType()} {" @ "}
                                {departures[0] ? departures[0].StopAreaName : ""}
                            </span>
                        </div>
                        <div className="departures">

                            {departures.filter((_, i) => i < 3).map((d, i) => {
                                return (
                                    <Departure
                                        key={i}
                                        destination={d.Destination}
                                        displayTime={d.DisplayTime}
                                        lineNumber={d.LineNumber}
                                    />
                                )
                            })}

                        </div>
                    </div>
                    <NextDeparture displayTime={departures[0] ? departures[0].DisplayTime : ""} />
                </div>
            </div>
        );
    }
}

export default NextDepartures;