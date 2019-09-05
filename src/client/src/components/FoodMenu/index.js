import React, { Component } from 'react';
import moment from "moment";
import axios from "axios";
import "./style.css";


class FoodMenu extends Component {
    constructor() {
        super();
        this.state = {
            menuItems: [],
            restaurant: null
        }
    }

    componentDidMount() {
        this.clock();
    }

    clock() {
        axios.get("/api/restaurant/jonsjacob")
            .then(res => {
                this.setState({ menuItems: res.data.today.menu, restaurant: res.data.displayName });
                this.props.hasLoaded("FoodMenu")
            })
        setInterval(() => {
            const time = moment().format("HH:mm:ss");
            if (time === "00:00:00") this.updateState();
        }, 1000)
    }

    updateState() {
        axios.get("/api/restaurant/jonsjacob")
            .then(res => {
                this.setState({ menuItems: res.data.today.menu, restaurant: res.data.displayName })
            })
    }

    render() {
        return (
            <div id="foodMenu">
                <div className="header">
                    <span>
                        {this.state.restaurant ? "Idag @ " + this.state.restaurant : ""}
                    </span>
                </div>
                <div className="body">
                    {this.state.menuItems.map((item, i) => {
                        return (
                            <span key={i} className="item">
                                {item}
                            </span>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default FoodMenu;