import React, { Component } from 'react';
import { Button, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";

const styles = theme => ({
    container: {
        padding: theme.spacing(3, 5),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttonContainer: {
        display: "grid",
        gridGap: 16,
        gridTemplateColumns: "1fr 1fr"
    }
});

class DeleteRow extends Component {
    constructor() {
        super();

        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleDelete() {
        axios({
            method: "post",
            url: "/admin/deployment/delete",
            data: { key: this.props.dKey, dashboardName: this.props.data.name }
        }).then(res => {
            console.log(res.data)
            if (res.data.msg === "error") {
                this.props.onEditingCanceled("delete");
            } else {
                this.props.onEditingApproved("delete");
            }
        })
    }

    handleCancel() {
        this.props.onEditingCanceled("delete")
    }

    render() {
        const { classes, columns, localization } = this.props;
        return (
            <tr>
                <td colSpan={columns.length + 1}>
                    <div className={classes.container}>
                        <Typography>
                            {localization.deleteText}
                        </Typography>
                        <div className={classes.buttonContainer}>
                            <Button
                                color="primary"
                                onClick={this.handleCancel}

                            >
                                Cancel
                                </Button>
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={this.handleDelete}

                            >
                                Delete
                                </Button>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}

export default withStyles(styles)(DeleteRow);