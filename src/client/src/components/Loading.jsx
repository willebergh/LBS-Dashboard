import React, { Component } from 'react';

class Loading extends Component {
    render() {
        return (
            <div style={styling}>

            </div>
        );
    }
}

const styling = {
    width: "100%",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "#fff"
}

export default Loading;