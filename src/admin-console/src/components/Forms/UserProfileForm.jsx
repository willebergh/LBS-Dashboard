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

class UserProfileForm extends Component {
    constructor() {
        super();
        this.state = {
            values: {
                avatarUrl: "",
                email: "",
                fullName: "",

                uid: "",
                username: ""
            },
            loading: false
        }

    }

    componentDidMount() {
        this.updateState();
    }

    updateState() {
        const { roles, deployments, ...filter } = this.props.user;
        this.setState({ values: { ...filter, password: "", passwordRepeat: "" } })
    }

    handleChange = e => {
        this.setState({ values: { ...this.state.values, [e.target.name]: e.target.value } })
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        const { classes, user } = this.props
        const { avatarUrl, email, fullName, currentPassword, newPassword, newPasswordRepeat, uid, username } = this.state.values
        return (


            this.state.loading ? (
                "loading..."
            ) : (
                    <React.Fragment>
                        <Paper className={classes.paper}>
                            <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">

                                <FormGroup className={classes.formGroup}>
                                    <Typography variant="h6" component="h3">
                                        <IconButton color="inherit" className={classes.iconButtonAvatar}>
                                            <Avatar src={user.avatarUrl} alt="User avatar" />
                                        </IconButton>
                                        {user.fullName}
                                    </Typography>
                                    <Typography component="p">

                                    </Typography>
                                </FormGroup>

                                <FormGroup className={classes.formGroup}>
                                    <TextField
                                        disabled
                                        margin="dense"
                                        variant="outlined"
                                        name="uid"
                                        label="UID"
                                        value={uid}
                                        helperText="Your unique identifier"
                                    />
                                </FormGroup>

                                <FormGroup className={classes.formGroup}>
                                    <TextField
                                        disabled
                                        margin="dense"
                                        variant="outlined"
                                        name="username"
                                        label="Username"
                                        value={username}
                                        helperText="Your unique username"
                                    />
                                </FormGroup>

                                <FormGroup className={classes.formGroup}>
                                    <TextField
                                        margin="dense"
                                        variant="outlined"
                                        name="fullName"
                                        label="Full Name"
                                        value={fullName}
                                        onChange={this.handleChange}
                                        helperText="Your first and last name"
                                    />
                                </FormGroup>

                                <FormGroup className={classes.formGroup}>
                                    <TextField
                                        margin="dense"
                                        variant="outlined"
                                        name="avatarUrl"
                                        label="Avatar url"
                                        value={avatarUrl}
                                        onChange={this.handleChange}
                                        helperText="A link to an image"
                                    />
                                </FormGroup>

                                <FormGroup className={classes.formGroup}>
                                    <TextField
                                        margin="dense"
                                        variant="outlined"
                                        name="email"
                                        label="Email Address"
                                        value={email}
                                        onChange={this.handleChange}
                                        helperText="Your email address"
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
                    </React.Fragment>
                )
        )
    }
}

export default withStyles(styles)(withRouter(UserProfileForm));