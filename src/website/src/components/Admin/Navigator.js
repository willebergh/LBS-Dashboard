import React from 'react';
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



const categories = [
    {
        id: 'Deployment',
        children: [
            { id: "Dashboards", icon: <DashboardRoundedIcon />, path: "/admin/dashboards" },
            { id: "Users", icon: <PeopleIcon />, path: "/admin/users" },
            { id: "Settings", icon: <SettingsIcon />, path: "/admin/settings" },
        ],
    },
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

function Navigator(props) {
    const { classes, ...other } = props;

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
                    LBS-Dashboard
                </ListItem>
                <ListItem className={clsx(classes.item, classes.itemCategory)}>
                    <ListItemIcon className={classes.itemIcon}>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                        }}
                    >
                        Deployment Overview
                    </ListItemText>
                </ListItem>
                {categories.map(({ id, children }) => (
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
                        {children.map(({ id: childId, icon, path }) => (
                            <CustomLink to={path} >
                                <ListItem
                                    key={childId}
                                    button
                                    className={clsx(classes.item, window.location.pathname === path && classes.itemActiveItem)}
                                >
                                    <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.itemPrimary,
                                        }}
                                    >

                                        {childId}

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

Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);