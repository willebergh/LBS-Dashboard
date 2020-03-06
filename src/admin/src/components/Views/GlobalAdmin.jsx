import React, { useState, } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Grid, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import ButtonProgress from "../ButtonProgress";

const useStyles = makeStyles(theme => createStyles({
    gridItem: {
        width: "100%",
    }
}))


function GlobalAdmin(props) {

    const { openSnackbar } = props;

    return (
        <Switch>
            <Route path="/admin/global/adduser" render={props => <AddUser {...props} openSnackbar={openSnackbar} />} />
            <Route path="/admin/global/adduser" render={props => <AddUser {...props} openSnackbar={openSnackbar} />} />
        </Switch>
    )
}

function AddUser(props) {
    const [open, setOpen] = useState(true);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState("");

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        axios.post("/api/auth/new-user", { email })
            .then(res => {
                setLoading(false);
                props.openSnackbar(res.data.msg, "success");
            })
            .catch(err => {
                setLoading(false);
                setFeedback(err.response.data.msg)
                props.openSnackbar(err.response.data.msg, "error");
            })
    }

    const classes = useStyles();
    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Add new user</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill out the form to add a new user.
                </DialogContentText>
                <form onSubmit={handleSubmit}>
                    <Grid container direction="column">
                        <Grid item className={classes.gridItem}>
                            <TextField
                                autoFocus
                                fullWidth
                                type="text"
                                label="Email"
                                value={email}
                                margin="dense"
                                variant="outlined"
                                disabled={loading}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item className={classes.gridItem}>

                            <ButtonProgress
                                fullWidth
                                type="submit"
                                text="Create"
                                color="primary"
                                loading={loading}
                                variant="contained"
                            />
                        </Grid>
                        <Grid item className={classes.gridItem}>
                            <Typography>
                                {feedback}
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default GlobalAdmin;