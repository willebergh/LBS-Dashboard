import React, { Component } from 'react';
import moment from "moment";
import axios from "axios";
import "./style.css";


class FoodMenu extends Component {
    constructor() {
        super();
        this.state = {
            menuItems: []
        }
    }

    componentDidMount() {
        this.clock();
    }

    clock() {
        this.updateState();
        setInterval(() => {
            const time = moment().format("HH:mm:ss");
            if (time === "00:00:00") this.updateState();
        }, 1000)
    }

    updateState() {
        axios.get("/api/FoodMenu")
            .then(res => {
                this.setState({ menuItems: res.data.today.menu })
            })
    }

    render() {
        return (
            <div id="foodMenu">
                <div className="header">
                    <span>Idag @ Jöns Jacob</span>
                </div>
                <div className="body">
                    {this.state.menuItems.map(item => {
                        return (
                            <span className="item">
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