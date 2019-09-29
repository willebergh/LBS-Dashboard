import React from 'react';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider, baseTheme } from '@material-ui/styles';
import { CssBaseline } from "@material-ui/core";

let theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: "#EFEFEF",
            main: "#1967DC",
            dark: "#101010",
        },
        secondary: {
            light: "#1967DC",
            main: "#1967DC",
            dark: "#1967DC",
        },
        background: {
            default: "#101010"
        }
    },
});

theme = {
    ...theme,
    overrides: {
        MuiButton: {
            label: {
                textTransform: 'none',
            },
            contained: {
                boxShadow: 'none',
                '&:active': {
                    boxShadow: 'none',
                },
            },
        }
    }
}



export default function Theme(props) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    )
}