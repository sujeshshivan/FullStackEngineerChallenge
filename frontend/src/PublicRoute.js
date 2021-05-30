import { useEffect, useState } from "react";
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
    const [loggedUser, setLoggedUser] = useState(localStorage.getItem('user'));
    return (
        <>
            <Route {...rest} render={props => (
                loggedUser ? <Redirect to="/admin-landing" /> : <Component {...props} />
            )} />
        </>
    );
}

export default PublicRoute;
