import React, { Component } from 'react';

class Setup extends Component {
    constructor() {
        super();
        this.state = {
            code: null
        }
    }

    componentDidMount() {
        this.socketListener();
        this.createCode(6)
            .then(code => {
                this.props.socket.emit("new-dashboard", code);
                this.setState({ code });
            })
    }

    socketListener() {
        this.props.socket.on("new-dashboard-add", data => {
            localStorage.setItem("dashboard-config", JSON.stringify(data));
            window.location.reload();
        })
    }

    createCode(length) {
        return new Promise((resolve, reject) => {
            var code = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                code += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return resolve(code)
        });
    }

    render() {
        return (
            <div style={style}>
                <h1>
                    {this.state.code}
                </h1>
            </div>
        );
    }
}

const style = {
    fontSize: 50,
}

export default Setup;