import React, { Component } from 'react';
import axios from "axios";
import {
    FormGroup,
    Button,
    TextField,
    Paper,
    Typography
} from "@material-ui/core";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ButtonProgress from "../../ButtonProgress";

const styles = theme => ({
    paper: {
        padding: theme.spacing(3, 2),
    },
});

class AddDashboardDialog extends Component {
    constructor() {
        super();
        this.state = {
            code: "",
            name: "",
            loading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCancel(e) {
        e.preventDefault();
        this.setState({ code: "", name: "" });
        this.props.handleToggle();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true })
        const { code, name } = this.state;
        this.props.onEditingApproved("add", { name: "TEST NAME" })

        /**
         * axios({
            method: "post",
            url: "/admin/deployment/add",
            data: { code, name, key: this.props.dKey }
        })
            .then(res => {
                this.setState({ loading: false });
                if (res.data.msg === "success") return this.props.onSuccess();
            })
         */

    }

    render() {
        const { classes, open, handleToggle } = this.props;
        return (
            <Paper className={classes.paper}>
                <Typography variant="h5" component="h3">
                    Add a new Dashboard
                </Typography>
                <Typography component="p">
                    Please enter the code that's shown on the dashboards screen that you want to add,
                    then give your new dashboard a name so you can identify it.
                </Typography>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <TextField
                            variant="outlined"
                            margin="dense"
                            id="code"
                            label="Code"
                            type="text"
                            name="code"
                            value={this.state.code}
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </FormGroup>

                    <FormGroup>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </FormGroup>


                    <Button
                        type="button"
                        onClick={this.handleCancel}
                        type="submit"
                        color="primary"
                        disabled={this.state.loading}
                    >
                        Cancel
                         </Button>

                    <ButtonProgress
                        text="Add"
                        type="submit"
                        color="primary"
                        variant="contained"
                        loading={this.state.loading}
                    />

                    <Button>
                        TEST
                    </Button>

                </form>
            </Paper>
        )
    }

}

export default withStyles(styles)(AddDashboardDialog);