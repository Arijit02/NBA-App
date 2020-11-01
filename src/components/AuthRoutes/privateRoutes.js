import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoutes = ({ user, component: Comp, ...rest }) => {
    return (
        <Route {...rest} component={(props) => (
            user ? 
                <Comp {...props} user={user} />
            : <Redirect to="/sign-in" />
        )} />
    );
};

export default PrivateRoutes;