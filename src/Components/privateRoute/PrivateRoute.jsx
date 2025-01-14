import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const [loggedUser] = useContext(UserContext);
    const location = useLocation();
    return loggedUser?.email ? 
    (children)
    :
    (<Navigate to='/login' replace state={{from: location}} />)
};

export default PrivateRoute;