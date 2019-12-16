import React, { Component } from 'react';
import axios from "axios";

class FoodMenu extends Component {
    constructor() {
        super();
        this.state = {
            menuItems: [],
            restaurant: null
        }
    }

    componentDidMount() {
        this.initState();
        this.initListener();
    }

    initState() {
        axios.get("/api/restaurant/jonsjacob")
            .then(res => this.setState({ menuItems: res.data.today.menu, restaurant: res.data.displayName }))
            .then(() => this.props.hasLoaded("restaurant"))
    }

    initListener() {
        const socket = this.props.socket;
        socket.on("update-restaurant", data => this.setState({ menuItems: data.today.menu, restaurant: data.displayName }));
    }

    render() {
        return (
            <div id="foodMenu">
                <div className="header fadeIn">
                    <span>
                        {this.state.restaurant ? "Today @ " + this.state.restaurant : ""}
                    </span>
                </div>
                <div className="body fadeIn">
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