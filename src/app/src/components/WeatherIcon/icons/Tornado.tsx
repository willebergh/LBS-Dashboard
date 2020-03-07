import React from "react";

interface IProps {
    theme: string;
}

const Tornado: React.FC<IProps> = ({ theme }) => {
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 30 30">
        <path d="M4.13,15.19c0,0.69,0.36,1.28,1.08,1.77c1.32,0.93,3.31,1.39,5.98,1.39c1.2,0,2.31-0.1,3.34-0.31
            c1.08-0.23,1.97-0.6,2.65-1.1s1.03-1.08,1.03-1.76c0-0.21-0.04-0.41-0.12-0.62c1.39-0.34,2.48-0.8,3.27-1.38s1.19-1.25,1.19-2
            c0-0.19-0.03-0.39-0.09-0.6c2.29-0.81,3.43-1.9,3.43-3.28c0-0.88-0.5-1.66-1.49-2.34c-1.95-1.3-4.81-1.95-8.58-1.95
            c-1.78,0-3.39,0.16-4.83,0.47C9.42,3.8,8.16,4.3,7.2,4.98S5.76,6.44,5.76,7.31c0,0.52,0.16,0.99,0.48,1.42
            c-1.18,0.67-1.77,1.49-1.77,2.46c0,0.75,0.37,1.41,1.1,1.98C4.61,13.73,4.13,14.4,4.13,15.19z M4.73,19.69
            c0,0.73,0.45,1.31,1.35,1.72s2.04,0.62,3.41,0.62c1.39,0,2.53-0.21,3.44-0.62s1.36-0.99,1.36-1.72c0-0.27-0.09-0.5-0.26-0.69
            s-0.4-0.28-0.67-0.28c-0.22,0-0.42,0.08-0.6,0.23s-0.29,0.35-0.34,0.57c-0.2,0.16-0.56,0.3-1.1,0.43s-1.15,0.2-1.83,0.2
            c-1.1,0-2-0.16-2.68-0.47c0.16-0.16,0.24-0.36,0.26-0.6s-0.04-0.45-0.15-0.62c-0.16-0.21-0.36-0.35-0.61-0.4s-0.48,0-0.7,0.13
            C5.02,18.6,4.73,19.09,4.73,19.69z M6.01,15.19c0-0.01,0.06-0.07,0.19-0.18c0.09-0.09,0.28-0.2,0.56-0.34s0.61-0.25,0.96-0.35
            l0.12-0.06c1.62,0.54,3.51,0.81,5.67,0.81c0.95,0,1.81-0.05,2.58-0.16l0.26,0.23c-0.09,0.16-0.3,0.32-0.63,0.5
            c-0.4,0.21-1.02,0.41-1.86,0.57s-1.73,0.25-2.67,0.25s-1.83-0.08-2.67-0.25s-1.47-0.36-1.88-0.57C6.3,15.5,6.09,15.35,6.01,15.19z
            M6.12,23.61c0,0.63,0.36,1.12,1.08,1.46s1.61,0.51,2.67,0.51c1.08,0,1.99-0.17,2.72-0.51s1.1-0.83,1.1-1.46
            c0-0.25-0.09-0.48-0.28-0.67s-0.41-0.29-0.66-0.29c-0.47,0-0.78,0.24-0.92,0.72c-0.39,0.24-1.04,0.37-1.96,0.37
            c-0.8,0-1.44-0.12-1.92-0.37c-0.15-0.48-0.45-0.72-0.92-0.72c-0.25,0-0.47,0.09-0.64,0.28S6.12,23.34,6.12,23.61z M6.33,11.19
            c0-0.08,0.05-0.17,0.15-0.28c0.24-0.3,0.72-0.6,1.42-0.88c1.92,1.03,4.56,1.54,7.91,1.54c1.71,0,3.32-0.16,4.82-0.47v0.09
            c0,0.15-0.09,0.3-0.28,0.45c-0.41,0.36-1.17,0.7-2.29,1.03c-1.21,0.36-2.73,0.54-4.56,0.54c-1.84,0-3.36-0.18-4.57-0.54
            C7.77,12.35,7,12.01,6.61,11.65C6.42,11.5,6.33,11.35,6.33,11.19z M7.63,7.31c0-0.18,0.12-0.37,0.35-0.59
            C8.43,6.3,9.33,5.9,10.66,5.51c1.43-0.42,3.14-0.63,5.14-0.63c2.01,0,3.74,0.21,5.19,0.63c1.35,0.39,2.24,0.8,2.68,1.22
            c0.22,0.22,0.34,0.42,0.34,0.59s-0.11,0.35-0.34,0.56c-0.44,0.42-1.33,0.83-2.68,1.23c-1.45,0.42-3.17,0.63-5.19,0.63
            c-2,0-3.72-0.21-5.14-0.63C9.32,8.71,8.42,8.3,7.98,7.87C7.75,7.66,7.63,7.48,7.63,7.31z" fill={theme === "dark" ? "white" : "black" } />
        </svg>
    )
}

export default Tornado;