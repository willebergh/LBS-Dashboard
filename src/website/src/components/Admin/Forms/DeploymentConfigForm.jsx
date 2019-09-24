import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
    TextField, MenuItem, Button, FormGroup,
    Paper, Typography
} from "@material-ui/core";
import axios from "axios";


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

class Config extends Component {
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
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.updateState();
    }

    componentDidUpdate(prevProps) {
        if (this.props.deployment.key !== prevProps.deployment.key) {
            this.updateState();
        }
    }

    updateState() {
        this.setState({
            values: {
                deploymentName: this.props.deployment.name,
                displayName: this.props.deployment.displayName,
                restaurant: this.props.deployment.restaurant,
                station: this.props.deployment.station,
                weather: this.props.deployment.weather
            }
        })
        axios.get("/api/available/all")
            .then(res => this.setState({ available: res.data.available }));
    }

    handleChange(e) {
        this.setState({ values: { ...this.state.values, [e.target.id]: e.target.value } })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { values } = this.state;
        console.log(values)
    }

    render() {
        const { classes } = this.props
        const { available } = this.state;
        const { deploymentName, displayName, restaurant, station, weather, } = this.state.values
        return (
            <Paper className={classes.paper}>
                <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">

                    <FormGroup className={classes.formGroup}>
                        <Typography variant="h6" component="h3">
                            Deployment config for {this.props.deployment.name}
                        </Typography>
                        <Typography component="p">
                            To change what data is being displayed on all dashboards for this deployment ({this.props.deployment.name}),
                            just change the config down below.
                        </Typography>
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <TextField
                            margin="dense"
                            variant="outlined"
                            id="deploymentName"
                            label="Deployment name"
                            value={deploymentName}
                            onChange={this.handleChange}
                            helperText="Deployment name is a unique name that identifies a deployment. It's used for example in the url of the deployment."
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <TextField
                            margin="dense"
                            variant="outlined"
                            id="displayName"
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
                            id="restaurant"
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
                                <MenuItem key={option.value} value={option.id}>
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
                            id="station"
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
                                <MenuItem key={option.value} value={option.id}>
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
                            id="weather"
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
                                <MenuItem key={option.value} value={option.id}>
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
                        Update
                    </Button>
                    <Button
                        color="primary"
                    >
                        Cancel
                    </Button>
                </form>
            </Paper>
        )
    }
}

export default withStyles(styles)(Config);