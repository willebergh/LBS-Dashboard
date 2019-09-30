import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
    TextField, Button, FormGroup,
} from "@material-ui/core";
import axios from "axios";

const styles = {
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

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            fullName: "",
            password: "",
            passwordRepeat: ""
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefautl();
        console.log(this.state);
    }

    render() {
        const { classes } = this.props;
        return (
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
        );
    }
}

export default withStyles(styles)(RegisterForm);