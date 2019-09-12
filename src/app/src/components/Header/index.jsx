import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import "./style.css";
import { Button, Menu, MenuItem } from "@material-ui/core";
import fire from "../../config/fire";

class Header extends Component {

    logout() {
        fire.auth().signOut();
    }

    render() {
        const { pathname } = this.props.location
        return (
            <div className="main-header">

                <div className="site-title">
                    <Link className="action" name="home" to="/">LBS-Dashboard</Link>
                </div>

                <div className="links">
                    <Link className="action" to="/" style={pathname === "/" ? { backgroundColor: "white", color: "black" } : null}>Home</Link>
                    <Link className="action" to="/about" style={pathname === "/about" ? { backgroundColor: "white", color: "black" } : null}>About</Link>
                    <Link className="action" to="/dashboard" style={pathname === "/dashboard" ? { backgroundColor: "white", color: "black" } : null}>Dashboard</Link>

                    {
                        this.props.user ?
                            (
                                <span class="action" onClick={this.logout}>Logout</span>
                            ) : (
                                <Link className="action" to="/login" style={pathname === "/login" ? { backgroundColor: "white", color: "black" } : null}>Login</Link>
                            )}
                </div>

            </div>
        )
    }
}


export default withRouter(Header);