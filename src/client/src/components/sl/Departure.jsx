import React, { Component } from 'react';
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Divider } from "@material-ui/core"
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
            <div>
                <Divider />
                <ListItem>
                    <ListItemIcon style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                        <LineIcon lineNumber={d.LineNumber} groupOfLine={d.GroupOfLine} />
                    </ListItemIcon>
                    <ListItemText style={{ marginLeft: 8 }} primary={
                        d.Destination
                    } />
                    <ListItemSecondaryAction>
                        <ListItemText primary={d.DisplayTime} />
                    </ListItemSecondaryAction>
                </ListItem>
            </div>
        );
    }
}

export default Departure;