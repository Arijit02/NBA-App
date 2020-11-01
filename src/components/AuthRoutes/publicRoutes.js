import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoutes = ({ user, component: Comp, ...rest }) => {
    return (
        <Route {...rest} component={(props) => (
            rest.restricted ? 
                user ? <Redirect to="/dashboard" /> : <Comp {...props} user={user} />
            : <Comp {...props} user={user} />
        )} />
    );
};

export default PrivateRoutes;