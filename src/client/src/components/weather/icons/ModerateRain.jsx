import React from "react";

function ModerateRain({text}) {
    
    if (text) return <span>Moderate Rain</span>
    
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 30 30" space="preserve">
        <path d="M4.65,16.96c0,1.32,0.47,2.46,1.4,3.41c0.93,0.96,2.06,1.46,3.38,1.5c0.12,0,0.18-0.06,0.18-0.17v-1.33
            c0-0.12-0.06-0.18-0.18-0.18c-0.84-0.04-1.57-0.38-2.17-1.02s-0.91-1.37-0.91-2.22c0-0.84,0.28-1.57,0.85-2.19
            c0.57-0.62,1.26-0.97,2.1-1.04l0.53-0.07c0.12,0,0.19-0.06,0.19-0.18l0.07-0.5c0.1-1.09,0.55-2.01,1.36-2.75s1.76-1.11,2.86-1.11
            c1.08,0,2.03,0.37,2.84,1.1c0.81,0.73,1.28,1.63,1.4,2.71l0.07,0.58c0,0.12,0.06,0.18,0.19,0.18h1.6c0.9,0,1.67,0.32,2.32,0.97
            c0.64,0.64,0.97,1.41,0.97,2.3c0,0.84-0.3,1.58-0.9,2.22c-0.6,0.63-1.33,0.97-2.18,1.02c-0.13,0-0.2,0.06-0.2,0.18v1.33
            c0,0.11,0.07,0.17,0.2,0.17c1.33-0.04,2.46-0.54,3.38-1.5s1.38-2.09,1.38-3.42c0-0.89-0.22-1.72-0.67-2.48
            c-0.44-0.76-1.05-1.36-1.81-1.8c-0.76-0.44-1.59-0.66-2.48-0.66h-0.31c-0.33-1.34-1.03-2.43-2.11-3.29
            c-1.07-0.85-2.3-1.28-3.68-1.28c-1.41,0-2.66,0.44-3.75,1.31s-1.79,1.99-2.1,3.35c-1.13,0.29-2.04,0.88-2.75,1.77
            S4.65,15.8,4.65,16.96z M10.05,23.98c0,0.17,0.05,0.34,0.16,0.51c0.11,0.17,0.27,0.28,0.47,0.35c0.23,0.07,0.44,0.06,0.64-0.04
            c0.19-0.09,0.33-0.28,0.39-0.56l0.14-0.61c0.05-0.23,0.02-0.44-0.09-0.63s-0.28-0.33-0.52-0.4c-0.22-0.07-0.44-0.04-0.64,0.08
            s-0.34,0.3-0.4,0.53l-0.14,0.59C10.06,23.83,10.05,23.89,10.05,23.98z M10.81,21.08c0,0.21,0.08,0.4,0.25,0.57
            c0.16,0.17,0.34,0.25,0.56,0.25c0.24,0,0.44-0.08,0.6-0.24c0.16-0.16,0.24-0.35,0.24-0.59c0-0.23-0.08-0.43-0.24-0.59
            c-0.16-0.16-0.36-0.24-0.6-0.24c-0.23,0-0.42,0.08-0.58,0.23C10.89,20.65,10.81,20.85,10.81,21.08z M11.42,18.81
            c-0.01,0.16,0.03,0.31,0.14,0.45c0.1,0.15,0.26,0.25,0.48,0.32c0.21,0.06,0.41,0.04,0.62-0.07S13,19.23,13.07,19l0.28-0.9
            c0.07-0.24,0.05-0.46-0.07-0.65c-0.12-0.19-0.3-0.32-0.54-0.39c-0.22-0.07-0.43-0.05-0.63,0.07c-0.2,0.11-0.34,0.28-0.41,0.5
            l-0.24,0.92c0,0.02-0.01,0.06-0.02,0.12C11.43,18.72,11.42,18.77,11.42,18.81z M12.59,27.1c0,0.18,0.05,0.34,0.15,0.5
            c0.1,0.16,0.26,0.27,0.48,0.33c0.08,0.02,0.17,0.03,0.25,0.03c0.43,0,0.69-0.2,0.79-0.61l0.14-0.59c0.06-0.26,0.03-0.48-0.08-0.68
            c-0.12-0.2-0.29-0.32-0.52-0.37c-0.21-0.07-0.42-0.05-0.63,0.07c-0.21,0.12-0.34,0.29-0.41,0.51l-0.14,0.59
            C12.6,26.97,12.59,27.04,12.59,27.1z M13.36,24.2c0,0.22,0.08,0.41,0.25,0.58c0.16,0.16,0.35,0.24,0.57,0.24
            c0.24,0,0.43-0.08,0.59-0.23c0.16-0.16,0.23-0.35,0.23-0.59c0-0.23-0.08-0.42-0.23-0.58c-0.16-0.16-0.35-0.23-0.59-0.23
            c-0.24,0-0.43,0.08-0.59,0.23S13.36,23.97,13.36,24.2z M13.99,21.93c-0.01,0.15,0.03,0.31,0.13,0.47c0.1,0.16,0.25,0.26,0.45,0.3
            c0.23,0.06,0.44,0.04,0.64-0.06s0.33-0.29,0.41-0.56l0.27-0.9c0.07-0.22,0.05-0.43-0.07-0.63c-0.12-0.2-0.29-0.33-0.53-0.4
            c-0.22-0.07-0.43-0.04-0.64,0.08c-0.21,0.12-0.34,0.3-0.41,0.53l-0.23,0.9C14,21.74,13.99,21.83,13.99,21.93z M16.75,24.08
            c0,0.16,0.05,0.32,0.15,0.48c0.1,0.16,0.26,0.27,0.46,0.33c0.03,0,0.08,0.01,0.14,0.02c0.06,0.01,0.1,0.02,0.14,0.02
            c0.41,0,0.66-0.22,0.76-0.66l0.14-0.6c0.07-0.21,0.05-0.42-0.07-0.63c-0.11-0.21-0.28-0.34-0.51-0.41
            c-0.25-0.06-0.48-0.04-0.68,0.08s-0.34,0.29-0.41,0.53l-0.09,0.59c0,0.02-0.01,0.07-0.02,0.12S16.75,24.04,16.75,24.08z
            M17.49,21.12c0,0.22,0.08,0.42,0.25,0.57c0.15,0.16,0.34,0.24,0.57,0.24c0.24,0,0.43-0.08,0.59-0.23s0.23-0.35,0.23-0.58
            c0-0.24-0.08-0.43-0.23-0.59s-0.35-0.23-0.59-0.23c-0.24,0-0.43,0.08-0.59,0.23C17.57,20.69,17.49,20.88,17.49,21.12z M18.1,18.81
            c0,0.17,0.05,0.33,0.16,0.48c0.11,0.15,0.27,0.26,0.49,0.32c0.02,0,0.06,0.01,0.12,0.02s0.11,0.02,0.14,0.02
            c0.1,0,0.22-0.03,0.36-0.09c0.21-0.11,0.35-0.29,0.41-0.52l0.24-0.9c0.06-0.23,0.04-0.44-0.08-0.63c-0.11-0.2-0.28-0.33-0.51-0.4
            c-0.23-0.07-0.44-0.05-0.64,0.06c-0.19,0.11-0.33,0.27-0.39,0.51l-0.28,0.91c0,0.02-0.01,0.06-0.02,0.12
            C18.1,18.74,18.1,18.78,18.1,18.81z"/>
        </svg>

    )
}

export default ModerateRain;