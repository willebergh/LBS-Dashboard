import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Paper, List, ListItem, ListItemText, ListItemSecondaryAction, Button, Grid, TextField } from "@material-ui/core";

const styles = {
    paper: {
        maxWidth: 800,
        margin: "auto",
        padding: 32
    }
}

class Account extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item>
                        <span style={{ backgroundColor: "#000", display: "block", width: 128, height: 128, borderRadius: "50%" }}></span>
                    </Grid>
                    <Grid item>
                        <form>
                            <TextField
                                margin="dense"
                                value="William Bergh"
                                variant="outlined"
                                label="Full name"
                            />
                            <TextField
                                margin="dense"
                                value="William Bergh"
                                variant="outlined"
                                label="Full name"
                            />
                            <TextField
                                margin="dense"
                                value="William Bergh"
                                variant="outlined"
                                label="Full name"
                            />
                            <TextField
                                margin="dense"
                                value="William Bergh"
                                variant="outlined"
                                label="Full name"
                            />
                        </form>
                    </Grid>
                </Grid>
                <List>
                    <ListItem>
                        <ListItemText>Full Name</ListItemText>
                        <ListItemSecondaryAction>
                            <Button>Change</Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Email Address</ListItemText>
                        <ListItemSecondaryAction>
                            <Button>Reset</Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Password</ListItemText>
                        <ListItemSecondaryAction>
                            <Button>Reset</Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Paper>
        )
    }
}

export default withStyles(styles)(Account);
