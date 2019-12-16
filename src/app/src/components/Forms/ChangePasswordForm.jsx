import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
    TextField, MenuItem, Button, FormGroup,
    Paper, Typography, IconButton, Avatar
} from "@material-ui/core";
import axios from "axios";
import { withRouter } from "react-router-dom";


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

class ChangePasswordForm extends Component {
    constructor() {
        super();
        this.state = {
            currentPassword: "",
            newPassword: "",
            newPasswordRepeat: "",
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <Paper className={classes.paper}>
                <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">
                    <FormGroup className={classes.formGroup}>
                        <TextField
                            margin="dense"
                            variant="outlined"
                            name="currentPassword"
                            label="Current Password"
                            value={currentPassword}
                            onChange={this.handleChange}
                            helperText="Enter your current password"
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <TextField
                            margin="dense"
                            variant="outlined"
                            name="newPassword"
                            label="New password"
                            value={newPassword}
                            onChange={this.handleChange}
                            helperText="Enter a new password"
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <TextField
                            margin="dense"
                            variant="outlined"
                            name="newPasswordRepeat"
                            label="Repeat new password"
                            value={newPasswordRepeat}
                            onChange={this.handleChange}
                            helperText="Please repeat your new password"
                        />
                    </FormGroup>

                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                    >
                        Update
                            </Button>
                    <Button
                        color="primary"
                    >
                        Cancel
                            </Button>
                </form>
            </Paper>
        );
    }
}

export default withStyles(styles)(withRouter(ChangePasswordForm));