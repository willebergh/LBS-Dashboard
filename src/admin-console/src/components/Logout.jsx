import React, { Component } from 'react';
import axios from "axios";
import Loading from "./Loading";
import { Redirect } from "react-router-dom";

class Logout extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        axios.post("/api/auth/logout")
            .then(res => {
                if (res.data.msg === "success") {
                    //window.location.reload();
                }
            })
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            //return <Redirect to="/login" />
        } else {
            return <Loading />
        }
    }
}

export default Logout;