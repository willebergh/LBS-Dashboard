import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

function ButtonProgress({ loading, handleClick, text, ...rest }) {
    const classes = useStyles();
    const onClick = typeof handleClick === "function" ? handleClick : null
    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Button
                    onClick={onClick}
                    disabled={loading}
                    {...rest}
                >
                    {text}
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </div>
    );
}

export default ButtonProgress;