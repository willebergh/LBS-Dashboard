import React, { Component } from 'react';
import axios from "axios";
import {
    FormControl,
    Button,
    TextField,
    Paper,
    Typography,
    Grid
} from "@material-ui/core";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ButtonProgress from "../ButtonProgress";

const styles = theme => ({
    paper: {
        padding: theme.spacing(3, 2),
    },
});

class AddRow extends Component {
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
        this.props.onEditingCanceled("add");
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true })
        const { code, name } = this.state;
        axios({
            method: "post",
            url: "/admin/deployment/add",
            data: { code, name, key: this.props.dKey }
        })
            .then(res => {
                this.setState({ loading: false });
                if (res.data.msg === "success") return this.props.onEditingApproved("add", { name });
            })
    }

    render() {
        const { classes, columns } = this.props;
        return (
            <tr>
                <td colspan={columns.length + 1}>
                    <Paper className={classes.paper}>
                        <Grid container justify="space-around">

                            <Grid item style={{ maxWidth: "50%" }}>
                                <Typography variant="h6" component="h3">
                                    Add a new Dashboard
                                    </Typography>
                                <Typography component="p">
                                    Please enter the code that's shown on the dashboards screen that you want to add,
                                    then give your new dashboard a name so you can identify it.
                                    </Typography>
                            </Grid>

                            <Grid item style={{ maxWidth: "50%" }}>
                                <form onSubmit={this.handleSubmit}>
                                    <FormControl>

                                        <TextField
                                            id="name"
                                            type="text"
                                            name="name"
                                            label="Name"
                                            margin="dense"
                                            variant="outlined"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                        />

                                        <TextField
                                            id="code"
                                            type="text"
                                            name="code"
                                            label="Code"
                                            margin="dense"
                                            variant="outlined"
                                            value={this.state.code}
                                            onChange={this.handleChange}
                                        />

                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            disabled={this.state.loading}
                                        >
                                            Add
                                            </Button>

                                        <Button
                                            type="button"
                                            color="primary"
                                            onClick={this.handleCancel}
                                            disabled={this.state.loading}
                                        >
                                            Cancel
                                            </Button>

                                    </FormControl>
                                </form>
                            </Grid>

                        </Grid>
                    </Paper>
                </td>
            </tr>
        )
    }
}

export default withStyles(styles)(AddRow);
