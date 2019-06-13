import React, { Component } from 'react';
import axios from "axios";
import Departure from "./Departure";
import { List, Divider } from "@material-ui/core"

class RealTime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: {}
        }
    }

    componentDidMount() {
        axios.get("http://dampgang.com:5000/api/sl/realtime/9189")
            .then(res => {
                this.setState({
                    data: res.data,
                    loading: false
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { loading, data } = this.state
        if (loading) {
            return <h1>loading...</h1>
        } else {
            return (
                <div>
                    <List>
                        {data.ResponseData.Buses.map(bus => {
                            return <Departure data={bus} />
                        })}
                    </List>
                </div>
            );
        }
    }
}

export default RealTime;