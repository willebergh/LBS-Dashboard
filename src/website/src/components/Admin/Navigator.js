import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
    Home as HomeIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
    DashboardRounded as DashboardRoundedIcon
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";



const deploymentLinks = [
    { id: "Dashboards", icon: <DashboardRoundedIcon />, category: "/dashboards", path: "/overview" },
];

const categories = [
    {
        id: "Other", links: [
            { id: "Users", icon: <PeopleIcon />, path: "/admin/users/overview" },
            { id: "Settings", icon: <SettingsIcon />, path: "/admin/settings/overview" },
        ]
    }
];

const styles = theme => ({
    categoryHeader: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
        color: theme.palette.common.white,
    },
    item: {
        paddingTop: 1,
        paddingBottom: 1,
        color: 'rgba(255, 255, 255, 0.7)',
        '&:hover,&:focus': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
    },
    itemCategory: {
        backgroundColor: '#232f3e',
        boxShadow: '0 -1px 0 #404854 inset',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    firebase: {
        fontSize: 24,
        color: theme.palette.common.white,
    },
    itemActiveItem: {
        color: '#4fc3f7',
    },
    itemPrimary: {
        fontSize: 'inherit',
    },
    itemIcon: {
        minWidth: 'auto',
        marginRight: theme.spacing(2),
    },
    divider: {
        marginTop: theme.spacing(2),
    },
});

function CustomLink({ children, ...props }) {
    return (
        <Link {...props} style={{ textDecoration: "none" }}>
            {children}
        </Link>
    )
}

class Navigator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { } = this.props;
        const { deployments, classes, ...other } = this.props;
        return (
            <Drawer variant="permanent" {...other}>
                <List disablePadding>
                    <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
                        LBS-Dashboard
                    </ListItem>

                    {deployments ? deployments.map(({ name }) => (
                        <React.Fragment key={name}>
                            <ListItem className={classes.categoryHeader}>
                                <ListItemText
                                    classes={{
                                        primary: classes.categoryHeaderPrimary,
                                    }}
                                >
                                    {name.replace(/-/g, " ")}
                                </ListItemText>
                            </ListItem>

                            {deploymentLinks.map(({ id, icon, category, path }, i) => (
                                <CustomLink to={`/admin/${name}${category}${path}`} >
                                    <ListItem
                                        key={i}
                                        button
                                        className={clsx(classes.item, window.location.pathname.startsWith(`/admin/${name}${category}`) && classes.itemActiveItem)}
                                    >
                                        <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                                        <ListItemText
                                            classes={{
                                                primary: classes.itemPrimary,
                                            }}
                                        >

                                            {id}

                                        </ListItemText>
                                    </ListItem>
                                </CustomLink>
                            ))}

                            <Divider className={classes.divider} />
                        </React.Fragment>
                    )) : null}

                    {categories.map(({ id, links }) => (
                        <React.Fragment key={id}>
                            <ListItem className={classes.categoryHeader}>
                                <ListItemText
                                    classes={{
                                        primary: classes.categoryHeaderPrimary,
                                    }}
                                >
                                    {id}
                                </ListItemText>
                            </ListItem>
                            {links.map(({ id, icon, path }, i) => (
                                <CustomLink to={path} >
                                    <ListItem
                                        key={i}
                                        button
                                        className={clsx(classes.item, window.location.pathname.startsWith(path) && classes.itemActiveItem)}
                                    >
                                        <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                                        <ListItemText
                                            classes={{
                                                primary: classes.itemPrimary,
                                            }}
                                        >

                                            {id}

                                        </ListItemText>
                                    </ListItem>
                                </CustomLink>
                            ))}
                            <Divider className={classes.divider} />
                        </React.Fragment>
                    ))}

                </List>
            </Drawer>
        );
    }
}

Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);