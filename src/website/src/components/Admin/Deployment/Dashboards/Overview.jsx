import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    InputBase
} from "@material-ui/core";
import MaterialTable, { MTableToolbar, MTableHeader } from 'material-table';
import { MyLocation as MyLocationIcon } from "@material-ui/icons";
import axios from "axios"


import AddDashboardForm from "./AddDashboardForm";

const styles = theme => ({
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
});

class Overview extends Component {
    constructor() {
        super();
        this.state = {
            columns: [
                { title: "Name", field: "name" },
                { title: "Status", field: "status" },
            ],
            data: [],
        }

        this.handleIdentifyDashboard = this.handleIdentifyDashboard.bind(this);
        this.AddDashboardDialog_toggle = this.AddDashboardDialog_toggle.bind(this);
    }

    componentWillReceiveProps(props) {
        const data = props.deployment.connectedDashboards.map(cd => { return { name: cd } });
        this.setState({ deployment: props.deployment, data })
    }

    AddDashboardDialog_toggle() {
        this.setState({ AddDashboardDialog_open: !this.state.AddDashboardDialog_open });
    }

    handleIdentifyDashboard(e, rowData) {
        const socket = this.props.socket;
        const data = { key: this.props.deployment.key, name: rowData.name };
        socket.emit("identify-dashboard", data)
    }

    render() {
        const { classes, deployment } = this.props;
        return (
            <Paper className={classes.paper}>

                <MaterialTable
                    title="Overview"
                    columns={this.state.columns}
                    data={this.state.data}
                    icons={{
                        Add: props => <Button variant="contained" color="primary" {...props} >Add Dashboard</Button>,
                    }}
                    actions={[
                        { icon: () => <MyLocationIcon />, onClick: this.handleIdentifyDashboard, tooltip: "Identify a dashboard" }
                    ]}
                    options={{
                        addRowPosition: "first",
                        searchFieldStyle: {
                            width: "100%"
                        },
                        headerStyle: {
                            backgroundColor: "#f5f5f5",
                            fontWeight: 600,
                        },
                        actionsColumnIndex: -1

                    }}
                    components={{
                        Toolbar: props => (
                            <AppBar position="static" color="default" elevation={0}>
                                <MTableToolbar {...props} />
                            </AppBar>
                        ),
                        EditRow: props => (
                            <tr>
                                <td colspan={this.state.columns.length + 1}>
                                    <AddDashboardForm dKey={deployment.key} {...props} />
                                </td>
                            </tr>
                        ),
                        Header: props => (
                            <MTableHeader className={classes.searchBar} {...props} />
                        )
                    }}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    const data = [...this.state.data];
                                    data.push(newData);
                                    this.setState({ ...this.state, data });
                                    resolve();
                                }, 600);
                            }),
                    }}
                />
            </Paper>
        );
    }
}

Overview.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Overview);


function MaterialTableTesting({ classes }) {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Surname', field: 'surname' },
            { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
            {
                title: 'Birth Place',
                field: 'birthCity',
                lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            },
        ],
        data: [
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            {
                name: 'Zerya Betül',
                surname: 'Baran',
                birthYear: 2017,
                birthCity: 34,
            },
        ],
    });

    return (
        <MaterialTable
            color="default"
            title="Editable Example"
            columns={state.columns}
            data={state.data}
            icons={{
                Add: props => <Button variant="contained" color="primary" {...props} >Add Dashboard</Button>
            }}
            components={{
                Toolbar: props => (
                    <AppBar position="static" color="default" elevation={0}>
                        <MTableToolbar {...props} />
                    </AppBar>
                ),
                EditRow: props => (
                    <tr>
                        <td colspan={state.columns.length + 1}>
                            <AddDashboardForm {...props} />
                        </td>
                    </tr>
                ),
                Header: props => (
                    <MTableHeader className={classes.searchBar} {...props} />
                )
            }}
            options={{
                addRowPosition: "first",
                searchFieldStyle: {
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                }

            }}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.push(newData);
                            setState({ ...state, data });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data[data.indexOf(oldData)] = newData;
                            setState({ ...state, data });
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.splice(data.indexOf(oldData), 1);
                            setState({ ...state, data });
                        }, 600);
                    }),
            }}
        />
    );
}


function MaterialTableDemo() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Surname', field: 'surname' },
            { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
            {
                title: 'Birth Place',
                field: 'birthCity',
                lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            },
        ],
        data: [
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            {
                name: 'Zerya Betül',
                surname: 'Baran',
                birthYear: 2017,
                birthCity: 34,
            },
        ],
    });

    return (
        <MaterialTable
            title="Editable Example"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.push(newData);
                            setState({ ...state, data });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data[data.indexOf(oldData)] = newData;
                            setState({ ...state, data });
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.splice(data.indexOf(oldData), 1);
                            setState({ ...state, data });
                        }, 600);
                    }),
            }}
        />
    );
}