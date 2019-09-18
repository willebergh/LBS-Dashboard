import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, compProps, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem("user") ? (
                    <Component {...props} {...compProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}