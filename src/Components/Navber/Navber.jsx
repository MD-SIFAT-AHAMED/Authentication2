import React, { useContext } from 'react';
import { Link } from 'react-router';
import "./Navber.css";
import { UserContext } from '../../App';
import { loggedOut } from '../LoginManager/LoginManager';
const Navber = () => {
    const [loggedUser,setLoggedUser] = useContext(UserContext);
    
    return (
        <div>
            <p>Name: {loggedUser.name}</p>
            <p>Email: {loggedUser.email}</p>
            <nav>
                <Link to='/home'>Home</Link>
                <Link to='/service'>Service</Link>
                <Link to='/contact'>Contact</Link>
                {loggedUser.email ? <button onClick={()=>setLoggedUser({})}>Sign Out</button> :<Link to='/login'>Log In</Link>  }
            </nav>
        </div>
    );
};

export default Navber;
