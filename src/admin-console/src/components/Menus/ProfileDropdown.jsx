import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles"
import { Popper, Paper, IconButton, Avatar, Grow, ClickAwayListener, MenuList, MenuItem, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = {
    iconButtonAvatar: {
        padding: 4,
    },
    avatar: {
        backgroundColor: "#000",
    },
}

class ProfileDropdown extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }

        this.anchorRef = React.createRef(null);
    }

    handleToggle = e => {
        this.setState({ open: !this.state.open });
    }

    handleClose = e => {
        this.setState({ open: false });
    }

    render() {
        const { classes, user } = this.props;
        const { open } = this.state;
        return (
            <React.Fragment>
                <IconButton
                    aria-controls="menu-list-grow"
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                    ref={this.anchorRef}
                    color="inherit"
                    className={classes.iconButtonAvatar}>
                    <Avatar className={classes.avatar} alt="User avatar">
                        <Typography>{user.fullName.charAt(0)}</Typography>
                    </Avatar>
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={this.anchorRef.current}
                    transition
                    disablePortal
                    placement="bottom-end"
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement.startsWith('bottom') ? 'center top' : 'center bottom' }}
                        >
                            <Paper id="menu-list-grow" >
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList disablePadding autoFocusItem={open}>
                                        <MenuItem className={classes.item} onClick={this.handleClose} component={Link} to="/admin/profile">
                                            Profile
                                            </MenuItem>
                                        <MenuItem className={classes.item} onClick={this.handleClose} component={Link} to="/admin/settings">
                                            Settings
                                            </MenuItem>
                                        <MenuItem className={classes.item} onClick={this.handleClose} component={Link} to="/logout">
                                            Logout
                                            </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ProfileDropdown);