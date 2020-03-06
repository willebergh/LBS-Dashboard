import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
    TextField, MenuItem, Button, FormGroup,
    Paper, Typography
} from "@material-ui/core";
import axios from "axios";
import { withRouter } from "react-router-dom";


const styles = {
    paper: {
        maxWidth: 600,
        margin: 'auto',
        overflow: 'hidden',
        padding: 32
    },
    container: {
        display: "flex",
        flexDirection: "column"
    },
    formGroup: {
        paddingBottom: 32
    },
    labelText: {
        padding: "0 14px"
    }
}

class DeploymentConfigForm extends Component {
    constructor() {
        super();
        this.state = {
            values: {
                deploymentName: "",
                displayName: "",
                restaurant: "",
                station: "",
                weather: ""
            },
            available: {
                restaurants: [],
                stations: [],
                weathers: [],
            },
            loading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.updateState();
    }

    componentDidUpdate(prevProps) {
        if (!this.props.newDeployment) {
            if (this.props.deployment.key !== prevProps.deployment.key) {
                this.updateState();
            }
        }
    }

    updateState() {
        if (!this.props.newDeployment) {
            this.setState({
                values: {
                    deploymentName: this.props.deployment.name,
                    displayName: this.props.deployment.displayName,
                    restaurant: this.props.deployment.restaurant,
                    station: this.props.deployment.station,
                    weather: this.props.deployment.weather
                }
            })
        }
        axios.get("/api/available/all")
            .then(res => this.setState({ available: res.data.available }));
    }

    handleChange(e) {
        if (e.target.name === "displayName") {
            const newState = e.target.value;
            this.setState({
                values: {
                    ...this.state.values,
                    displayName: newState.replace(/([ ])\1{0,}/g, " "),
                    deploymentName: newState.replace(/([ ])\1{0,}/g, "-").toLowerCase().replace(/([^a-z0-9-])/g, "")
                }
            });
        } else {
            this.setState({ values: { ...this.state.values, [e.target.name]: e.target.value } });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { deploymentName, displayName, restaurant, station, weather } = this.state.values;
        const url = this.props.newDeployment ? "/admin/deployment/new" : `/admin/deployment/update/${this.props.deployment.key}`;
        axios({
            method: "post", url, data: {
                name: deploymentName, displayName, restaurant, station, weather
            }
        }).then(res => {
            if (res.data.msg === "success") {
                this.deploymentWillUpdate();
            }
        })
    }

    deploymentWillUpdate() {
        this.props.updateDeployments(() => {
            this.props.history.replace(`/admin/${this.state.values.deploymentName}/config`)
        })
    }

    render() {
        const { classes, newDeployment } = this.props
        const { available } = this.state;
        const { deploymentName, displayName, restaurant, station, weather, } = this.state.values
        return (
            <Paper className={classes.paper}>
                {this.state.loading ? (
                    "loading..."
                ) : (
                        <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">

                            <FormGroup className={classes.formGroup}>
                                <Typography variant="h6" component="h3">
                                    {newDeployment ? (
                                        "Setup new deployment config"
                                    ) : (
                                            "Deployment config for " + this.props.deployment.name
                                        )}
                                </Typography>
                                <Typography component="p">
                                    {newDeployment ? (
                                        "Choose what data is going to be displayed on all dashboards for this deployment. The config can be changed in the future"
                                    ) : (
                                            "To change what data is being displayed on all dashboards for this deployment (" + this.props.deployment.name + "), just change the config down below."
                                        )}
                                </Typography>
                            </FormGroup>

                            <FormGroup className={classes.formGroup}>
                                <TextField
                                    margin="dense"
                                    variant="outlined"
                                    label="Deployment name"
                                    value={window.location.origin + "/admin/" + deploymentName}
                                    helperText="Deployment name is a unique name that identifies a deployment. It's used for example in the url of the deployment."
                                />
                            </FormGroup>

                            <FormGroup className={classes.formGroup}>
                                <TextField
                                    margin="dense"
                                    variant="outlined"
                                    name="displayName"
                                    label="Display name"
                                    value={displayName}
                                    onChange={this.handleChange}
                                    helperText="Display name is what's going to be shown to the user."
                                />
                            </FormGroup>

                            <FormGroup className={classes.formGroup}>
                                <TextField
                                    select
                                    margin="dense"
                                    variant="outlined"
                                    name="restaurant"
                                    label="Restaurant"
                                    value={restaurant}
                                    onChange={this.handleChange}
                                    helperText="Which restaurant to get data from."
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                >
                                    {available.restaurants.map(option => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormGroup>

                            <FormGroup className={classes.formGroup}>
                                <TextField
                                    select
                                    margin="dense"
                                    variant="outlined"
                                    name="station"
                                    label="Station"
                                    value={station}
                                    onChange={this.handleChange}
                                    helperText="The site-id of what station to get real time data from."
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                >
                                    {available.stations.map(option => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormGroup>

                            <FormGroup className={classes.formGroup}>
                                <TextField
                                    select
                                    margin="dense"
                                    variant="outlined"
                                    name="weather"
                                    label="Weather"
                                    value={weather}
                                    onChange={this.handleChange}
                                    helperText=" Which city to get weather data from."
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                >
                                    {available.weathers.map(option => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormGroup>



                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                            >
                                {newDeployment ? "Create" : "Update"}
                            </Button>
                            <Button
                                color="primary"
                            >
                                Cancel
                            </Button>
                        </form>
                    )}
            </Paper>
        )
    }
}

export default withStyles(styles)(withRouter(DeploymentConfigForm));