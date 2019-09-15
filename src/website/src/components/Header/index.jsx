import React, { Component, useState } from 'react';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Collapse } from "react-bootstrap";
import "./style.css";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.setState({ open: !this.state.open })
    }

    render() {
        const { pathname } = this.props.location
        return (
            <div className="container p-3" style={{ zIndex: 100 }}>
                <Navbar collapseOnSelect expand="md">

                    <Link
                        to="/"
                        name="home"
                        className="navbar-brand"
                        onClick={this.toggleCollapse}
                        aria-expanded={this.state.open}
                        aria-controls="responsive-navbar-nav"
                    >
                        LBS-Dashboard
                    </Link>

                    <Navbar.Toggle
                        onClick={this.toggleCollapse}
                        aria-controls="responsive-navbar-nav"
                        aria-expanded={this.state.open}
                    />

                    <Navbar.Collapse id="responsive-navbar-nav" in={this.state.open}>
                        <Nav className="ml-auto">

                            <Link
                                to="/"
                                onClick={this.toggleCollapse}
                                aria-expanded={this.state.open}
                                aria-controls="responsive-navbar-nav"
                                className={pathname === "/" ? "nav-link active" : "nav-link"}
                            >
                                Home
                            </Link>

                            <Link
                                to="/dashboard"
                                onClick={this.toggleCollapse}
                                aria-expanded={this.state.open}
                                aria-controls="responsive-navbar-nav"
                                className={pathname === "/dashboard" ? "nav-link active" : "nav-link"}
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/demo"
                                onClick={this.toggleCollapse}
                                aria-expanded={this.state.open}
                                aria-controls="responsive-navbar-nav"
                                className={pathname === "/demo" ? "nav-link active" : "nav-link"}
                            >
                                Demo
                            </Link>

                            {
                                this.props.user ?
                                    (
                                        <Link
                                            to="/logout"
                                            className="nav-link"
                                            onClick={this.toggleCollapse}
                                            aria-expanded={this.state.open}
                                            aria-controls="responsive-navbar-nav"
                                        >
                                            Logout
                                        </Link>
                                    ) : (
                                        <Link
                                            to="/login"
                                            onClick={this.toggleCollapse}
                                            aria-expanded={this.state.open}
                                            aria-controls="responsive-navbar-nav"
                                            className={pathname === "/login" ? "nav-link active" : "nav-link"}
                                        >
                                            Login
                                        </Link>
                                    )
                            }

                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
            </div>
        )
    }
}

export default withRouter(Header);