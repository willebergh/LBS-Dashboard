import React, { Component } from 'react';
import LineIcon from "./LineIcon";

class Departure extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render() {
        const d = this.props.data;
        return (
            <div className="">
                <div>
                    <LineIcon lineNumber={d.LineNumber} groupOfLine={d.GroupOfLine} />
                    {d.Destination}
                </div>
                <div>
                    {d.DisplayTime}
                </div>
            </div>
        );
    }
}

export default Departure;