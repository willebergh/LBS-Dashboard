import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar, MTableHeader, MTableBodyRow, MTableActions } from 'material-table';
import { MyLocation as MyLocationIcon } from "@material-ui/icons";
import axios from "axios"


import EditRow from "../../EditRow";

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
    status: {
        color: "white",
        padding: "8px",
        borderRadius: "8px",
        width: "60px"
    }
});

class Overview extends Component {
    constructor() {
        super();
        this.state = {
            columns: [
                {
                    title: "Status", field: "status", render: r => (
                        <span className={this.props.classes.status} style={r.status === "Online" ? { backgroundColor: "#3cd178" } : { backgroundColor: "#767676" }}>
                            {r.status}
                        </span>
                    ),
                    cellStyle: {
                        width: 60,
                        alignText: "center",
                        paddingRight: 0
                    },
                    headerStyle: {
                        width: 60,
                        alignText: "center",
                        paddingRight: 0
                    }
                },
                { title: "Name", field: "name" },
            ],
            data: [],
            isLoading: false,
            key: null
        }

        this.tableRef = React.createRef();
        this.handleIdentifyDashboard = this.handleIdentifyDashboard.bind(this);
    }

    componentDidMount() {
        this.updateTable();
        this.initSocketListener();
    }

    componentDidUpdate(prevProps) {
        if (this.props.deployment.key !== prevProps.deployment.key) {
            this.updateTable();
            this.initSocketListener();
        }
    }

    updateTable() {
        return new Promise(resolve => {
            this.setState({ isLoading: true })
            axios.get(`/admin/deployment/get/${this.props.deployment.key}/dashboards`)
                .then(res => {
                    this.setState({ data: res.data.dashboards })
                    if (this.state.data.length !== 0) {
                        this.props.socket.emit("get-connected-dashboards", { key: this.props.deployment.key })
                    } else {
                        this.setState({ isLoading: false })
                    }
                })
                .then(() => resolve())
        })
    }

    initSocketListener() {
        const socket = this.props.socket;
        socket.emit("admin-connect", { key: this.props.deployment.key });
        socket.on("update-connected-dashboards", data => this.handleUpdateConnectedDashboards(data));
    }

    handleUpdateConnectedDashboards(data) {
        const newArr = this.state.data.map((dashboard, i) => {
            if (data.find(d => d === dashboard.name)) {
                return { ...dashboard, status: "Online" };
            } else {
                return { ...dashboard, status: "Offline" };
            }
        })
        this.setState({ data: newArr, isLoading: false });
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
                    isLoading={this.state.isLoading}
                    tableRef={this.tableRef}
                    columns={this.state.columns}
                    data={this.state.data}
                    icons={{
                        Add: props => <Button variant="contained" color="primary" {...props} >Add Dashboard</Button>,
                    }}
                    actions={[
                        { icon: () => <MyLocationIcon />, onClick: this.handleIdentifyDashboard, tooltip: "Identify dashboard" },
                        { icon: 'refresh', tooltip: 'Refresh Data', isFreeAction: true, onClick: () => this.updateTable() },
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
                        EditRow: props => <EditRow socket={this.props.socket} dKey={deployment.key} {...props} />,
                        Header: props => <MTableHeader className={classes.searchBar} {...props} />,
                    }}
                    editable={{
                        onRowAdd: () =>
                            new Promise(resolve => {
                                this.updateTable()
                                    .then(() => resolve())
                            }),
                        onRowUpdate: () =>
                            new Promise(resolve => {
                                this.updateTable()
                                    .then(() => resolve())
                            }),
                        onRowDelete: () =>
                            new Promise(resolve => {
                                this.updateTable()
                                    .then(() => resolve())
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