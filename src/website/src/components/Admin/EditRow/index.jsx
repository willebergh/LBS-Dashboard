import React, { Component } from 'react';

// Components
import AddRow from "./AddRow";
import UpdateRow from "./UpdateRow";
import DeleteRow from "./DeleteRow";

function EditRow(props) {
    if (props.mode === "add") {
        return (
            <AddRow {...props} />
        )
    } else if (props.mode === "update") {
        return (
            <UpdateRow {...props} />
        )
    } else if (props.mode === "delete") {
        return (
            <DeleteRow {...props} />
        )
    } else {
        return null;
    }
}

export default EditRow;