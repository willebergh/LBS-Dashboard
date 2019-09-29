import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Theme from "./components/Theme";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Landing from "./components/Landing";



const style = theme => ({
    root: {
        minHeight: "100vh",
    }
})

class App extends Component {
    constructor() {
        super();
    }


    render() {
        const { classes } = this.props;
        return (
            <Theme>
                <div className={classes.root}>
                    <Header />


                    <Switch>

                        <Route exact path="/" component={Landing} />

                    </Switch>

                    <Footer />
                </div>
            </Theme>
        );
    }
}

export default withStyles(style)(App);