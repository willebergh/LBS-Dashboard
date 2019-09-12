import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./style.css";

class Header extends Component {
    render() {
        const { pathname } = this.props.location
        return (
            <div className="container" style={{ zIndex: 100 }}>
                <Navbar collapseOnSelect expand="md" >
                    <Link className="navbar-brand" name="home" to="/">LBS-Dashboard</Link>
                    <Nav className="ml-auto">
                        <Link to="/" className={pathname === "/" ? "nav-link active" : "nav-link"}>Home</Link>
                        <Link to="/about" className={pathname === "/about" ? "nav-link active" : "nav-link"}>About</Link>
                        <Link to="/dashboard" className={pathname === "/dashboard" ? "nav-link active" : "nav-link"}>Dashboard</Link>
                        {
                            this.props.user ?
                                (
                                    <Link to="/logout" className="nav-link">Logout</Link>
                                ) : (
                                    <Link to="/login" className={pathname === "/login" ? "nav-link active" : "nav-link"}>Login</Link>
                                )
                        }
                    </Nav>
                </Navbar>
            </div>
        )
    }
}


export default withRouter(Header);