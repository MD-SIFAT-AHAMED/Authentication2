import React from 'react';
import { Link } from 'react-router';
import "./Navber.css";
const Navber = () => {

    return (
        <div>
            <nav>
                <Link to='/home'>Home</Link>
                <Link to='/service'>Service</Link>
                <Link to='/contact'>Contact</Link>
                <Link to='/login'>Log In</Link>
            </nav>
        </div>
    );
};

export default Navber;
