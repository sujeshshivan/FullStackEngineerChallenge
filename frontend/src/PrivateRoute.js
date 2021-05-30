import { useEffect, useState } from "react";
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [loggedUser, setLoggedUser] = useState(localStorage.getItem('user'));
    return (
        <>
            <Route {...rest} render={props => (
                loggedUser ? <Component {...props} /> : <Redirect to="/login" />
            )} />
        </>
    );
}

export default PrivateRoute;
