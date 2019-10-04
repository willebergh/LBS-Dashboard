import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import UserProfileForm from "../Forms/UserProfileForm";

const styles = {
    paper: {
        maxWidth: 600,
        margin: 'auto',
        overflow: 'hidden',
        padding: 32
    },
    container: {
        display: "flex",
        flexDirection: "column"
    },
    formGroup: {
        paddingBottom: 32
    },
    labelText: {
        padding: "0 14px"
    }
}

class Profile extends Component {
    render() {
        const { user } = this.props;
        return (
            <UserProfileForm user={user} />
        )
    }
}

export default withStyles(styles)(Profile);