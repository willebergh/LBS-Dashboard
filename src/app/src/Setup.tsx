import React from "react";
import styled from "styled-components";
import io from "socket.io-client";

const Root = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`

const Setup: React.FC = props => {
    const [code, setCode] = React.useState<string>("");
    const socket = io("/new-dashboards");

    React.useEffect(() => {
        initSocket();
        createCode(6, (code: string) => {
            socket.emit("new-dashboard", code);
            setCode(code);
        })
    }, []);

    const initSocket = () => {
        socket.on("new-dashboard-add", (data: any) => {
            localStorage.setItem("dashboard-config", JSON.stringify(data));
            window.location.reload();
        });
    }

    const createCode = (length: number, callback: CallableFunction) => {
        var code = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            code += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        callback(code);
    }


    return (
        <Root>
            <h1>Setup</h1>
            <p>Welcome to your new dashboard</p>
            {code}
        </Root>
    )
}

export default Setup;